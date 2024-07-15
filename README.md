# ecommerce_project_mvp
 

## Project Overview

This project is a minimal viable product (MVP) for a basic e-commerce platform. It focuses on essential features such as product listing, shopping cart functionality, and a simplified checkout process. The frontend is developed using React, with data stored locally for simplicity.

## Core Features

- **Product Listing and Detail Pages:** Display a list of products and detailed views of each product.
- **Shopping Cart Functionality:** Manage cart state, allowing users to add, update, and remove items.
- **Simplified Checkout Process:** Capture user details and display a confirmation message (no actual payment processing).
- **Local Storage for Data Persistence:** Persist cart data and user details using local storage.

## Project Structure

- **Setup and Environment:** Initializing the project with Create React App, organizing the project directory.
- **Product Listing:** Creating a JSON file for product data, implementing ProductList and ProductDetail components.
- **Shopping Cart:** Implementing a ShoppingCart component, managing cart state, and persisting data.
- **Checkout Process:** Creating a Checkout component with form validation and confirmation message.

## Installation

### Step 1: Setup and Environment

1. **Initialize React Project**
   - Use Create React App to bootstrap a new React project:
     ```bash
     npx create-react-app e-commerce-platform
     cd e-commerce-platform
     ```

2. **Install Dependencies**
   - Install React Router for navigation:
     ```bash
     npm install react-router-dom
     ```

### Step 2: Running the App

1. **Navigate to the project directory:**
   ```bash
   cd e-commerce-platform

## Usage

Open your browser and navigate to `http://localhost:3000` to ` to view the application. Browse products, add items to the cart, and proceed to checkout.

## License

This project is licensed under the MIT License.