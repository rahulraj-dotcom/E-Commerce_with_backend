# E-Commerce Product Management Application

A full-stack e-commerce product management application built using React.js, Node.js, Express.js and MongoDB.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Access token and refresh token system
- Protected product operations
- Logout functionality

### Product Management

Implemented complete Product CRUD functionality:

- Create a new product
- Get all products
- Get a single product by ID
- Update product details
- Update product image
- Delete a product

### Product Fields

Each product contains:

- Title
- Description
- Price
- Product Image

### Image Upload

- Multer is used for handling image uploads.
- ImageKit is used for storing product images.
- Product image URL is stored in MongoDB.

### Validation

`express-validator` is used for validating:

- Product title
- Product description
- Product price
- Product ID

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Express Validator
- ImageKit
- Bcrypt

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Generate new access token |
| GET | `/api/auth/me` | Get logged-in user |
| POST | `/api/auth/logout` | Logout user |

### Products

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| POST | `/api/products` | Required | Create product |
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get product by ID |
| PUT | `/api/products/:id` | Required | Update product |
| DELETE | `/api/products/:id` | Required | Delete product |

## Product CRUD

### Create
Users can create a product by providing:
- Title
- Description
- Price
- Product image

### Read
Users can:
- View all products
- Get a single product by ID

### Update
Users can update:
- Title
- Description
- Price
- Product image

The image is optional during update. If no new image is selected, the existing image remains unchanged.

### Delete
Authenticated users can delete a product by its ID.

## Project Structure

```text
E-Commerce-Project/
│
├── server/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validator/
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── apis/
│   │   └── router/
│   └── ...
│
└── README.md