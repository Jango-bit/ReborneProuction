# Reborne — Backend (Node + Express + MongoDB)

## Overview
This is the backend service for the **Reborne** ecommerce application.  
It is built using **Node.js**, **Express**, and **MongoDB Atlas**, and includes:

- Product CRUD APIs  
- Order creation APIs  
- User model with admin authentication (JWT-based)  
- Seed script that inserts sample products and creates an admin account  
- Ready for integration with any frontend (React, Next.js, etc.)

---

## 🚀 Quick Start (Local Setup)

### 1. Create `.env` file
Copy `.env.example` → `.env` and fill in real values:

```
PORT=5000
MONGO_URI=your_mongo_connection_string_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

---

### 2. Install dependencies
```bash
cd backend
npm install
```

---

### 3. Seed database (creates sample products + admin user)
```bash
npm run seed
```

You should see:
```
Data Imported
```

---

### 4. Start dev server
```bash
npm run dev
```

Server output should show:
```
MongoDB Connected: <your-host>
Server running in development mode on port 5000
```

---

## 👤 Seeded Admin Account
Use this account to test admin endpoints:

```
email: admin@reborne.local
password: admin123
```

(Admin is created by the seed script.)

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with nodemon |
| `npm run start` | Start server in production mode |
| `npm run seed` | Seed DB with sample products + admin |

---

## 🧩 API Endpoints

### 🔐 Authentication
**POST /api/users/login**  
Body:
```json
{
  "email": "admin@reborne.local",
  "password": "admin123"
}
```

Response:
```json
{
  "_id": "...",
  "name": "Admin",
  "email": "admin@reborne.local",
  "isAdmin": true,
  "token": "<jwt_token_here>"
}
```

---

### 🛒 Products

#### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |

#### Admin Endpoints (require Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

Authorization header:
```
Authorization: Bearer <token>
```

---

### 📦 Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Get order details |

---

## 📝 Example CURL Commands

### Login (get token)
```bash
curl -X POST http://localhost:5000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@reborne.local","password":"admin123"}'
```

### Get all products
```bash
curl http://localhost:5000/api/products
```

### Create product (admin)
```bash
curl -X POST http://localhost:5000/api/products \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"name":"Example","slug":"example","price":100,"countInStock":5}'
```

---

## 🧑‍💻 Notes for Frontend Developer

### API Base URL (Local)
```
http://localhost:5000
```

### Vite Frontend Setup
Add to frontend `.env`:
```
VITE_API_URL=http://localhost:5000
```

### Admin Requests Require Token
Example request:
```js
fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({...})
});
```

---

## 🔒 Security (Important for Production)

- Replace `JWT_SECRET` with a long random string.
- Do **NOT** commit `.env` to Git.
- Commit `.env.example` instead.
- Restrict CORS origin in production.
- Use Cloudinary/AWS S3 for image uploads.
- Add rate limiting to login endpoint.
- Validate inputs using express-validator or Joi.

---

## 📌 What This Backend Includes
- MongoDB models: **Product**, **User**, **Order**  
- Controllers & Routes for products, orders, users  
- JWT authentication  
- Admin/Protect middleware  
- Seed script (`npm run seed`)  
- Clean folder structure  

---
