# 🛒 E-commerce Backend API

This repository houses the backend implementation of a scalable and modular **E-commerce Platform** built using **Node.js**, **Express.js**, and **MongoDB**. Designed with **RESTful** principles, this API can easily be integrated with frontend technologies such as React, Angular, or even mobile applications.

The backend is divided into well-structured modules to ensure **scalability** and **maintainability**, supporting the essential functionalities of a typical online shopping experience—user management, product listings, order processing, coupon-based discounts, and customer reviews.

Built with **production-readiness** in mind, this project also incorporates:

* Secure JWT-based authentication
* Robust error handling
* File upload support for product images
* A configurable environment setup to easily deploy on any platform.

---

### 🧠 Why This Project?

This backend API is perfect for:

* ✅ **Full-Stack Developers** building e-commerce applications.
* ✅ **Startups** or **Personal Projects** requiring a plug-and-play backend for online stores.
* ✅ **Students & Interns** looking to learn the **MERN stack** or **Backend Development**.
* ✅ **Scalable Solutions** for user, product, and order management.

---

### 🔧 Core Functionalities

* **Authentication & Authorization**: Secure registration, login, and protected routes using JWT.
* **Product Management**: Full CRUD operations with image support and stock tracking.
* **User Management**: Profile updates, account deletion, and role-based access control.
* **Coupon System**: Create and apply discount codes with flexible validation rules.
* **Order Processing**: Track and update orders, shipping details, and statuses.
* **Review System**: Allow customers to leave feedback and product ratings.
* **Error Handling**: Centralized error middleware for clean code and consistent API responses.
* **File Upload**: Secure handling of product images via `multer` middleware.
* **Pagination & Filtering**: Optimized for performance with support for page limits and query filters.
* **Testable Endpoints**: Full Postman collection included for testing all API endpoints.

---

### 📦 Use Case Examples

* A **React-based E-commerce Store** fetching product listings, managing user accounts, applying discount coupons, and processing orders.
* A **Mobile E-commerce Application** leveraging the backend APIs to handle user management and product catalogs.
* **Admin Dashboards** for monitoring product stock, user activity, and order status.

---

## 🚀 Features

This project offers a range of features essential for managing an online retail system. These functionalities are modular and can be easily extended or integrated into any full-stack project.

---

### 🔐 Authentication & Authorization

* **JWT-based Security**: Token-based login and access control.
* **Role-Based Access**: Admin, seller, and customer roles supported.
* **Session Management**: Secure logout and token invalidation.

---

### 👤 User Account Management

* **User Registration/Login/Logout**: Secure user authentication using JWT tokens.
* **Profile Management**: Update user details like name, email, and password.
* **Account Deletion**: Option for soft or hard deletion.

---

### 📦 Product Management

* **CRUD Operations**: Create, read, update, and delete products.
* **Image Upload**: Supports image uploads for each product using `multipart/form-data`.
* **Category & Stock Tracking**: Track product categories and stock levels.
* **Pagination & Filtering**: Support for pagination and filtering queries.

---

### 🎫 Coupon Management System

* **Discount Coupons**: Create fixed or percentage-based discount codes.
* **Validation Rules**: Supports expiry dates, usage limits, and minimum order values.
* **Conditional Application**: Validates coupons based on order criteria.

---

### ⭐ Product Reviews

* **Customer Feedback**: Allows customers to leave reviews and ratings for products.
* **Review Management**: Admins can update or delete reviews.
* **Get Reviews**: Fetch all reviews or reviews for specific products.

---

### 📦 Order Management

* **Order Placement**: Customers can place orders with product quantity and shipping details.
* **Order Updates**: Admins can update order status and track shipping.
* **Order Retrieval**: Retrieve single or all orders.

---

### 📤 File Upload Capability

* **Multer Integration**: Supports secure uploading of product images.
* **Form Data Handling**: Accepts `multipart/form-data` for file uploads.

---

### 🧪 Postman Collection for Testing

* **Pre-configured Postman Collection**: Includes testable API requests grouped by feature (Auth, Product, Order, Review, Coupon).
* **Easy Endpoint Testing**: Import the provided collection and start testing immediately.

---

## 🧰 Tech Stack & Project Structure

### 🚀 Tech Stack

This project utilizes modern JavaScript technologies for a robust backend solution:

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| **Node.js**    | Server-side runtime environment          |
| **Express.js** | Web framework for building REST APIs     |
| **MongoDB**    | NoSQL database for scalable data storage |
| **Mongoose**   | ODM (Object Data Modeling) for MongoDB   |
| **JWT**        | JSON Web Tokens for user authentication  |
| **Multer**     | Middleware for file uploads              |
| **Dotenv**     | Manage environment variables             |
| **Cors**       | Cross-Origin Resource Sharing            |
| **Nodemon**    | Auto-reloading during development        |
| **Swagger UI** | API documentation tool                   | 
| **Cloudinary** | Cloudinary service for image hosting     |
| **BcryptJs**   | Password hashing library                 |
| **NodeMailer** | Email sending library                    |
| **Helmet**     | Helmet for security headers              |

---

### 📁 Project Structure

```
ecommerce-backend/
│   .env                            #Stores all the Env Variables
│   .gitignore
│   access.log
│   app.js                  
│   ecommerceApi.txt                #Description of the project
│   index.js                        #Main Application Entry Point
│   package-lock.json
│   package.json
│   README.md
│   swaggerUi.yaml                  #Swagger UI for API Documentation
│       
├───constants
│       baseUrls.constant.js        #Stores BaseUrls
│       cloudinary.constant.js      #Stores Cloudinary Configs
│       nodemailer.constant.js      #Stores Nodemailer Configs
│       
├───controllers                     #Controllers for API endpoints
│       auth.controller.js      
│       coupon.controller.js
│       order.controller.js
│       product.controller.js
│       review.controller.js
│       user.controller.js
│
├───database
│       db.js                       #Database Connection
│
├───middlewares
│       globalError.middleware.js   #Handles global Error
│       multer.middleware.js        #Handles file uploads
│       token.middleware.js         #Middleware for JWT verification
│
├───models                          #Models for database entities
│       coupon.model.js
│       order.model.js
│       product.model.js
│       review.model.js
│       user.model.js
│
├───routes                          #Routes for API endpoints
│       auth.route.js
│       coupon.route.js
│       order.route.js
│       product.route.js
│       review.route.js
│       user.route.js
│
├───templates
│       verifyEmail.template.js     #Template for verification email template
│
├───uploads
└───utils
        apiError.utils.js           #API Error Handling Utility
        asyncWrapper.utils.js       #Async Wrapper Utility
        badRequest.utils.js         #Bad Request Handling Utility
        cloudinary.utils.js         #Cloudinary Utility
        createAdmin.utils.js        #Create Admin User Utility
        files.utils.js              #File Upload Utility
        notFound.utils.js           #Not Found Utility
```

---

## 🛠️ Installation & Setup Instructions

### ⚙️ Prerequisites

Ensure the following are installed on your machine:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (local or Atlas)
* npm (comes with Node.js)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file from the provided `.env.example` file:

```bash
cp .env.example .env
```

Edit `.env` with your own values (e.g., MongoDB URI, JWT secret).

### 4️⃣ Run the Server

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

The server will start on the port defined in the `.env` file (default: `5000`).

### 5️⃣ Testing the API

Import the provided Postman collection and start testing the endpoints.

---

## 📡 API Documentation (Endpoints Overview)

All API endpoints are prefixed with `/api/v1/`.

### 🔐 **Authentication Routes**

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | Login and receive JWT token |
| POST   | `/auth/logout`   | Invalidate JWT token        |
| GET    | `/auth/test`     | Test the auth controller    |

---

### 👤 **User Routes**

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| PUT    | `/user/update`     | Update user profile |
| DELETE | `/user/deleteUser` | Delete user account |

---

### 📦 **Product Routes**

| Method | Endpoint                           | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| POST   | `/product/create`                  | Add a new product (with image) |
| GET    | `/product/products?page=1&limit=2` | Get paginated list of products |
| GET    | `/product/product/:id`             | Get single product by ID       |
| PUT    | `/product/update/:id`              | Update product by ID           |
| DELETE | `/product/delete/:id`              | Delete product by ID           |

---

### 🎫 **Coupon Routes**

| Method | Endpoint                    | Description                   |
| ------ | --------------------------- | ----------------------------- |
| POST   | `/coupon/createCoupon`      | Create a new discount coupon  |
| PUT    | `/coupon/updateCoupon/:id`  | Update coupon details         |
| DELETE | `/coupon/deleteCoupon/:id`  | Delete coupon                 |
| GET    | `/coupon/couponDetails/:id` | Get coupon details by ID      |
| GET    | `/coupon/coupons?limit=5`   | List all coupons (with limit) |

---

### ⭐ **Review Routes**

| Method | Endpoint                                      | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| POST   | `/review/product/:productId/postReview`       | Post a review for a product     |
| PUT    | `/review/product/:productId/review/:reviewId` | Update a review                 |
| GET    | `/review/product/:productId`                  | Get all reviews for a product   |
| GET    | `/review/productReview`                       | Get all product reviews (admin) |
| GET    | `/review/product/:productId/review/:reviewId` | Get specific review by ID       |

---

### 📦 **Order Routes**

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/order/createOrder`          | Create a new order       |
| GET    | `/order/viewOrder/:orderId`   | Get a specific order     |
| GET    | `/order/orders`               | Get all orders           |
| PUT    | `/order/updateOrder/:orderId` | Update an existing order |

---
### DB ER DIAGRAM
[![ErDiagram](https://github.com/MrImaginatory/ecommerceApi_udemy/blob/main/EcommerceAPI.png)]((https://github.com/MrImaginatory/ecommerceApi_udemy/blob/main/EcommerceAPI.png))
---

### 📝 **Notes**

* Most endpoints expect `Content-Type: application/json`, except for product creation/update which uses `multipart/form-data`.
* All secure routes should include a `Bearer` token in the `Authorization` header.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
## 📝 License

MIT © MrImaginatory

---

## 🙋‍♂️ Author

Made with ❤️ by Your MrImaginatory
