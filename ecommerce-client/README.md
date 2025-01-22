# Ecommerce Client

This is an ecommerce client application built with React and Vite. It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/hema-mv/ecommerce-client.git
cd ecommerce-client

2. Install dependencies:

Running the Application
    npm run dev

To start the development server:
    npm run dev
    
To build the application for production:
    npm run build

roject Features
Authentication: Users can sign up, log in, and log out.
Product Management: Users can view, create, update, and delete products.
Cart Management: Users can add products to the cart, update quantities, and remove items.
Checkout: Users can proceed to checkout and submit their orders.
File Descriptions
src/App.jsx: Main application component that sets up routes and handles user authentication state.
src/Components: Contains reusable components like NavBar, LoginForm, SignupForm, and Logout.
src/Pages: Contains page components like AuthPage, HomePage, CartPage, CheckoutPage, ProductPage, and ProductDetailsPage.
src/Styles: Contains CSS files for styling different parts of the application.
src/Utilities: Contains utility functions and services for API calls and user context management.
API Integration
The application integrates with a backend API for user authentication, product management, and cart management. The API base URL is configured in the utility files.

API Routes
Here are the main API routes used in the application:

Authentication:

POST /api/auth/signup: Create a new user account.
POST /api/auth/login: Log in an existing user.
POST /api/auth/logout: Log out the current user.
Product Management:

GET /api/products: Retrieve a list of all products.
GET /api/products/:id: Retrieve details of a specific product.
POST /api/products: Create a new product (admin only).
PUT /api/products/:id: Update an existing product (admin only).
DELETE /api/products/:id: Delete a product (admin only).
Cart Management:

GET /api/cart: Retrieve the current user's cart.
POST /api/cart: Add an item to the cart.
PUT /api/cart/:itemId: Update the quantity of an item in the cart.
DELETE /api/cart/:itemId: Remove an item from the cart.
Checkout:

POST /api/checkout: Process the checkout and create an order.
