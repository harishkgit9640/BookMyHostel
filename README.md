# BookMyHostel

A hostel booking platform built with the MERN stack.

## Project Structure

```
bookmyhostel/
├── client/             # React frontend
├── server/             # Node.js backend
├── .env               # Environment variables (create from .env.example)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/bookmyhostel
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. Initialize the database with admin user:
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Default Admin Credentials

- Email: admin@bookmyhostel.com
- Password: admin123

## Features

- User authentication (register, login, logout)
- Hostel management (CRUD operations)
- Booking management
- User profile management
- Admin dashboard
- Responsive design

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when running the server.

## Logging

Logs are stored in the `server/logs` directory:
- `error.log`: Contains error logs
- `combined.log`: Contains all logs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 