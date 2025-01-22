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

Install dependencies:
Running the Application
To start the development server:

To build the application
npm run dev

Project Features
Authentication: Users can sign up, log in, and log out.
Product Management: Users can view, create, update, and delete products.
Cart Management: Users can add products to the cart,  quantities, and remove items.
Checkout: Users can proceed to checkout and submit their orders.


File Descriptions
src/App.jsx: Main application component that sets up routes and handles user authentication state.
src/Components: Contains reusable components like NavBar, LoginForm, SignupForm, and Logout.
src/Pages: Contains page components like AuthPage, HomePage, CartPage, CheckoutPage, ProductPage, and ProductDetailsPage.
src/Styles: Contains CSS files for styling different parts of the application.
src/Utilities: Contains utility functions and services for API calls and user context management.
API Integration
The application integrates with a backend API for user authentication, product management, and cart management. The API base URL is configured in the utility files.
