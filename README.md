# AI-Powered E-Commerce Platform (Myntra Clone)

A full-stack MERN e-commerce application with AI-powered product recommendations.

## Features

- User authentication (signup, signin, profile management)
- Product browsing with filters and sorting
- Shopping cart functionality
- Wishlist management
- AI-powered product recommendations using Gemini API
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js with functional components
- React Router for navigation
- Context API for state management (auth and cart)
- Tailwind CSS for styling
- React Icons for icons
- React Toastify for notifications

### Backend
- Node.js + Express.js (ES Modules)
- MongoDB with Mongoose for database
- JWT for authentication
- Bcrypt for password hashing

### AI Integration
- Gemini API for product recommendations

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gemini API key

### Backend Setup

1. Navigate to the server directory:
\`\`\`
cd server
\`\`\`

2. Install dependencies:
\`\`\`
npm install
\`\`\`

3. Create a .env file in the server directory with the following variables:
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

4. Start the server:
\`\`\`
npm start
\`\`\`

### Frontend Setup

1. Navigate to the client directory:
\`\`\`
cd client
\`\`\`

2. Install dependencies:
\`\`\`
npm install
\`\`\`

3. Create a .env file in the client directory:
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`

4. Start the React app:
\`\`\`
npm start
\`\`\`

## Project Structure

\`\`\`
ecommerce-myntra-clone/
├── client/ (React App)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── routes/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── pages/
│   │   │   └── admin/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
\`\`\`

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/signin - Login a user
- GET /api/auth/profile - Get user profile
- PUT /api/auth/profile - Update user profile

### Products
- GET /api/products - Get all products with filters
- GET /api/products/:id - Get a single product
- POST /api/products - Create a product (admin)
- PUT /api/products/:id - Update a product (admin)
- DELETE /api/products/:id - Delete a product (admin)
- GET /api/products/search - Search products

### Cart
- GET /api/cart - Get user cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item
- DELETE /api/cart/:id - Remove item from cart

### Orders
- POST /api/orders - Create an order
- GET /api/orders/myorders - Get user orders
- GET /api/orders/:id - Get order by ID
- PUT /api/orders/:id/pay - Update order to paid
- PUT /api/orders/:id/deliver - Update order to delivered (admin)
- GET /api/orders - Get all orders (admin)

### AI Recommendations
- GET /api/recommend - Get AI-powered product recommendations

## License
MIT
"# shopinity_ecommerce_website" 
