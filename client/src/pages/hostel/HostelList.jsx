import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const HostelList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    amenities: [],
  });

  // Mock data - replace with actual API call
  const hostels = [
    {
      id: 1,
      name: 'Sunset Hostel',
      location: 'Mumbai, Maharashtra',
      price: 1200,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
      amenities: ['WiFi', 'AC', 'Food'],
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search hostels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Hostel List */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hostels.map((hostel) => (
            <Link
              key={hostel.id}
              to={`/hostels/${hostel.id}`}
              className="card group"
            >
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-t-lg">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{hostel.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{hostel.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">₹{hostel.price}</span>
                    <span className="text-sm text-gray-500">/night</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{hostel.rating}</span>
                    <svg className="ml-1 h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {hostel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelList; 