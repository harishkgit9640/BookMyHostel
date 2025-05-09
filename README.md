# HostelHub - Hostel Booking Platform

A full-featured hostel booking platform similar to OYO Rooms, built with React, Node.js, and MongoDB.

## Features

### User Features
- Browse and search hostels
- View detailed hostel information
- Book rooms
- Manage bookings
- Leave reviews and ratings
- User profile management

### Admin Features
- Hostel management (CRUD operations)
- Booking management
- User management
- Analytics dashboard
- Review moderation

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- React Query

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Project Structure

```
hostel-hub/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       ├── features/      # Feature-specific components
│       ├── hooks/         # Custom hooks
│       ├── services/      # API services
│       ├── store/         # Redux store
│       ├── utils/         # Utility functions
│       └── assets/        # Static assets
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Custom middleware
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── tests/            # Test files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hostel-hub.git
cd hostel-hub
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

4. Set up environment variables
- Create `.env` files in both client and server directories
- Add necessary environment variables (see .env.example files)

5. Start the development servers
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm start
```

## API Documentation

API documentation is available at `/api-docs` when running the server.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 