# HONESTECH ENTERPRISES

A full-stack web application for HonestTech Enterprises, built with React (frontend) and Node.js/Express (backend) with MongoDB.

## Features

- User authentication and authorization
- Product management (Cyber and General products)
- Inventory management
- Point of Sale (POS) system
- Transaction handling
- Document generation (PDF)
- Reporting

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional for development - app runs without it)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd HONESTECH-ENTERPRISES
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Set up environment variables:
   - The `.env` file is already configured with default values.
   - Backend runs on port 1010.

## Running the Project

### Development Mode

1. Start the backend server:
   ```bash
   npm run dev
   ```
   - The server will start on port 1010.
   - Console will log: "HonesTech API Server is running on http://localhost:1010" (clickable URL)
   - If MongoDB is not running, it will log a warning and continue without database functionality.

2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```
   - The React app will start on port 3000 (with proxy to backend).

3. Open your browser and navigate to `http://localhost:3000`.

### Production Mode

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Start the backend:
   ```bash
   npm start
   ```

## Database

- The application uses MongoDB.
- For development, the server starts even if MongoDB is not available, logging a warning.
- For full functionality, ensure MongoDB is running on `mongodb://localhost:27017/honestech_enterprises` or update `DB_URI` in `.env`.

## API Endpoints

- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/products/cyber` - Cyber products
- `/api/products/general` - General products
- `/api/inventory` - Inventory
- `/api/transactions` - Transactions
- `/api/pos` - Point of Sale
- `/api/documents` - Documents
- `/api/reports` - Reports

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **Other**: CORS, bcryptjs, express-validator

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
