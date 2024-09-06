# MegaMart E-commerce Project

> Complete E-commerce site built with Node.js, React, Redux, Express, MongoDB

## Setup Instructions

### 1. Environment Variables

> Create a `.env` file in the `backend/config` folder with the following content:

```env
PORT=4000
NODE_ENV=DEVELOPMENT
FRONTEND_URL=http://localhost:3000

# MongoDB Local URI for Development
DB_LOCAL_URI=mongodb://localhost:27017/MegaMart

# MongoDB Atlas URI for Production
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=<appName>

# JWT Secret Key for Authentication
JWT_SECRET=<your_jwt_secret>

# JWT Expiry Time (e.g., 7d for 7 days)
JWT_EXPIRES_TIME=7d

# Cookie Expiry Time in Days
COOKIE_EXPIRES_TIME=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

# Stripe API Keys
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_API_KEY=<your_stripe_publishable_key>

# SMTP Configuration for Email Sending
SMTP_HOST=<smtp_host>
SMTP_PORT=<smtp_port>
SMTP_EMAIL=<smtp_email>
SMTP_PASSWORD=<smtp_password>
SMTP_FROM_EMAIL=<smtp_from_email>
SMTP_FROM_NAME=<smtp_from_name>
```

### 2 Install Dependencies (Backend)

```sh
npm i
```

### Install Dependencies (Frontend)

```sh
cd frontend
npm i
```

### Seed Database

> Use the follwing commands to put some dummy products into the database
> Run it in the root folder

```sh
npm run seeder
```
