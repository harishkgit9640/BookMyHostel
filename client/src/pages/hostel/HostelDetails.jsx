import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon, MapPinIcon, WifiIcon, SunIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const HostelDetails = () => {
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: '',
  });

  // Mock data - replace with actual API call
  const hostel = {
    id: 1,
    name: 'Sunset Hostel',
    location: 'Mumbai, Maharashtra',
    description: 'A comfortable and affordable hostel located in the heart of Mumbai. Perfect for travelers looking for a clean and friendly environment.',
    price: 1200,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
      // Add more images
    ],
    amenities: [
      { name: 'Free WiFi', icon: WifiIcon },
      { name: 'Air Conditioning', icon: SunIcon },
      { name: 'Common Room', icon: UserGroupIcon },
    ],
    rooms: [
      {
        id: 1,
        type: 'Dormitory',
        capacity: 6,
        price: 1200,
        available: 3,
      },
      {
        id: 2,
        type: 'Private Room',
        capacity: 2,
        price: 2500,
        available: 1,
      },
    ],
  };

  const handleBooking = () => {
    // Implement booking logic
    console.log('Booking:', { hostelId: id, ...selectedDates });
  };

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="aspect-h-4 aspect-w-6 overflow-hidden rounded-lg">
        <img
          src={hostel.images[0]}
          alt={hostel.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Hostel Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{hostel.name}</h1>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              {hostel.location}
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-900">{hostel.rating}</span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">About this hostel</h2>
              <p className="mt-2 text-gray-600">{hostel.description}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Amenities</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {hostel.amenities.map((amenity) => (
                  <div key={amenity.name} className="flex items-center">
                    <amenity.icon className="h-5 w-5 text-primary-600" />
                    <span className="ml-2 text-sm text-gray-600">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-lg font-medium text-gray-900">Book your stay</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="check-in" className="label">
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="check-in"
                    className="input mt-1"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="check-out" className="label">
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="check-out"
                    className="input mt-1"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="room-type" className="label">
                    Room Type
                  </label>
                  <select id="room-type" className="input mt-1">
                    {hostel.rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.type} - ₹{room.price}/night
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails; 