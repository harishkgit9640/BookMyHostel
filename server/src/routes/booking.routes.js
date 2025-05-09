import express from 'express';
import { body } from 'express-validator';
import { auth, adminAuth } from '../middleware/auth.middleware.js';
import Booking from '../models/booking.model.js';
import Hostel from '../models/hostel.model.js';

const router = express.Router();

// Get all bookings for a user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hostel', 'name address images')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Get all bookings (admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('hostel', 'name')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('hostel', 'name address images');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// Create new booking
router.post('/', [
  auth,
  body('hostel').notEmpty().withMessage('Hostel ID is required'),
  body('room').notEmpty().withMessage('Room ID is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests.adults').isInt({ min: 1 }).withMessage('At least one adult guest is required'),
  body('guests.children').optional().isInt({ min: 0 }).withMessage('Children count must be a non-negative number'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer']).withMessage('Valid payment method is required')
], async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.body.hostel);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    const room = hostel.rooms.id(req.body.room);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (!room.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available'
      });
    }

    const booking = new Booking({
      ...req.body,
      user: req.user._id
    });

    await booking.calculateTotalPrice();
    await booking.save();

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', [
  auth,
  adminAuth,
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Valid status is required')
], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

// Cancel booking
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (!booking.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled (must be at least 24 hours before check-in)'
      });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = req.body.reason;
    await booking.save();

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
});

export default router; 