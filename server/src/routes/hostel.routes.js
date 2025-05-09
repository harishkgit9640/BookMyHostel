import express from 'express';
import { body } from 'express-validator';
import { auth, adminAuth, hostelOwnerAuth } from '../middleware/auth.middleware.js';
import Hostel from '../models/hostel.model.js';

const router = express.Router();

// Get all hostels with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      city, 
      state, 
      country, 
      minPrice, 
      maxPrice, 
      amenities,
      page = 1,
      limit = 10
    } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (city) query['address.city'] = city;
    if (state) query['address.state'] = state;
    if (country) query['address.country'] = country;

    if (minPrice || maxPrice) {
      query['rooms.price'] = {};
      if (minPrice) query['rooms.price'].$gte = Number(minPrice);
      if (maxPrice) query['rooms.price'].$lte = Number(maxPrice);
    }

    if (amenities) {
      query.amenities = { $all: amenities.split(',') };
    }

    const skip = (page - 1) * limit;
    const hostels = await Hostel.find(query)
      .populate('owner', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ rating: -1 });

    const total = await Hostel.countDocuments(query);

    res.json({
      success: true,
      data: hostels,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hostels',
      error: error.message
    });
  }
});

// Get single hostel by ID
router.get('/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('reviews.user', 'name');

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    res.json({
      success: true,
      data: hostel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hostel',
      error: error.message
    });
  }
});

// Create new hostel (admin only)
router.post('/', [
  auth,
  adminAuth,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('address.street').trim().notEmpty().withMessage('Street address is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('address.state').trim().notEmpty().withMessage('State is required'),
  body('address.country').trim().notEmpty().withMessage('Country is required'),
  body('address.zipCode').trim().notEmpty().withMessage('ZIP code is required'),
  body('contactInfo.phone').trim().notEmpty().withMessage('Phone number is required'),
  body('contactInfo.email').isEmail().withMessage('Valid email is required'),
  body('rooms').isArray().withMessage('At least one room is required')
], async (req, res) => {
  try {
    const hostel = new Hostel({
      ...req.body,
      owner: req.user._id
    });

    await hostel.save();

    res.status(201).json({
      success: true,
      data: hostel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating hostel',
      error: error.message
    });
  }
});

// Update hostel (admin or owner only)
router.put('/:id', [
  auth,
  hostelOwnerAuth,
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('contactInfo.email').optional().isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    Object.assign(hostel, req.body);
    await hostel.save();

    res.json({
      success: true,
      data: hostel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating hostel',
      error: error.message
    });
  }
});

// Delete hostel (admin or owner only)
router.delete('/:id', [auth, hostelOwnerAuth], async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    hostel.isActive = false;
    await hostel.save();

    res.json({
      success: true,
      message: 'Hostel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting hostel',
      error: error.message
    });
  }
});

export default router; 