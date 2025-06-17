# Shopping Cart App

This is a shopping cart web application built using **React**, **Redux Toolkit**, **Material-UI (MUI)**, and **Formik/Yup** for form handling. It supports features like user authentication, cart management, product rating, and order history. A Node.js + Express backend is used to handle API requests.

---

## Features

- User login & registration (with JWT)
- Add to cart, quantity update, remove items
- Checkout with order history tracking
- Product rating system
- Search functionality
- Styled using Material UI components
- Redux for global state management

---

## Technologies

- **Frontend:** React, Redux Toolkit, React Router, Material-UI, Formik + Yup
- **Backend:** Node.js, Express, MongoDB
- **Others:** Axios, JWT

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance running locally or on MongoDB Atlas

---

## Running the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/shehanck/shopping-cart-app.git
cd shopping-cart-app
```

---

### Install Backend Dependencies

```bash
cd server
npm install
```

#### Create `.env` file in `server/` with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

--- Sample env file content ---
```sample_env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret_key
```

#### Run Backend Server

```bash
node server.js
```

This will start the backend at: `http://localhost:5000`

---

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

#### Pointing to backend:

services/api.js should include the correct backend URL
(ex:- http://localhost:5000/api)

#### Build React App

```bash
npm run build
```

#### Start React App

```bash
npm run start
```

This will start the frontend at: `http://localhost:3000`

---

## Folder Structure

```
shopping-cart-app/
│
├── client/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   ├── App.jsx
│   └── index.jsx
│
├── server/            # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
```

---

## Notes

- Ensure MongoDB is running before starting the server. Add MongoDB connection string to .env file with correct database name.
- Frontend uses `baseURL` defined in /services/api.js to connect to backend.
- API Endpoints expected by frontend:
  - `POST /api/users/login`
  - `POST /api/users/register`
  - `GET /api/products`
  - `POST /api/products/:id/rate`
  - `POST /api/orders`
  - `GET /api/orders/my`