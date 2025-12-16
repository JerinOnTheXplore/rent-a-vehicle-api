# 🚗 RENT A VEHICLE API

A backend REST API for managing a Vehicle Rental System.  
This project supports vehicle management, user authentication, bookings, and role-based access control using JWT.

---

##  Project Overview

The Vehicle Rental System API handles:

- User authentication (Admin & Customer)
- Vehicle inventory management
- Booking creation, cancellation, and return
- Automatic price calculation
- Secure role-based authorization

---

##  Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcrypt (Password Hashing)
- jsonwebtoken (JWT Authentication)

---

##  Project Structure

src/
│── server.ts
│
├── config/
│ └── db.ts
│
├── middlewares/
│ ├── verifyToken.ts
│ ├── authorize.ts
│ └── logger.ts
│
├── modules/
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── auth.route.ts
│ │
│ ├── user/
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ │ └── user.route.ts
│ │
│ ├── vehicle/
│ │ ├── vehicle.controller.ts
│ │ ├── vehicle.service.ts
│ │ └── vehicle.route.ts
│ │
│ └── booking/
│ ├── booking.controller.ts
│ ├── booking.service.ts
│ └── booking.route.ts
│
└── utils/
└── response.ts


---

##  Database Schema

### Users Table
| Field | Description |
|------|------------|
| id | Auto generated |
| name | Required |
| email | Unique, lowercase |
| password | Hashed |
| phone | Required |
| role | `admin` or `customer` |

### Vehicles Table
| Field | Description |
|------|------------|
| id | Auto generated |
| vehicle_name | Required |
| type | car, bike, van, SUV |
| registration_number | Unique |
| daily_rent_price | Positive |
| availability_status | available / booked |

### Bookings Table
| Field | Description |
|------|------------|
| id | Auto generated |
| customer_id | FK → users |
| vehicle_id | FK → vehicles |
| rent_start_date | Required |
| rent_end_date | Must be after start |
| total_price | Calculated |
| status | active / cancelled / returned |

---

##  Authentication & Authorization

### Authentication
- Passwords are hashed using **bcrypt**
- Login returns a JWT token
- JWT is required for protected routes

### Authorization
- **Admin**
  - Manage vehicles
  - View & manage all bookings
  - Manage users
- **Customer**
  - View vehicles
  - Create and manage own bookings
  - Update own profile

---

##  API Endpoints

###  Auth
| Method | Endpoint | Access |
|------|--------|-------|
| POST | `/api/v1/auth/signup` | Public |
| POST | `/api/v1/auth/signin` | Public |

### 🚗 Vehicles
| Method | Endpoint | Access |
|------|--------|-------|
| POST | `/api/v1/vehicles` | Admin |
| GET | `/api/v1/vehicles` | Public |
| GET | `/api/v1/vehicles/:vehicleId` | Public |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin |

### 👥 Users
| Method | Endpoint | Access |
|------|--------|-------|
| GET | `/api/v1/users` | Admin |
| PUT | `/api/v1/users/:userId` | Admin / Own |
| DELETE | `/api/v1/users/:userId` | Admin |

### 📅 Bookings
| Method | Endpoint | Access |
|------|--------|-------|
| POST | `/api/v1/bookings` | Admin / Customer |
| GET | `/api/v1/bookings` | Role-based |
| PUT | `/api/v1/bookings/:bookingId` | Role-based |

---

##  Business Logic

- **Booking Price**
total_price = daily_rent_price × number_of_days


- **Vehicle Status**
- Booking created → `booked`
- Booking cancelled / returned → `available`

- **Deletion Rules**
- Users cannot be deleted if they have active bookings
- Vehicles cannot be deleted if they have active bookings

---

##  JWT Usage

**Header Format**
Authorization: Bearer <jwt_token>


---

##  Setup & Run

### 1️⃣ Clone the repository
```bash
git clone <repository-url>

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables (.env)
PORT=5000
DATABASE_URL=postgresql_connection_string
JWT_SECRET=secret_key

4️⃣ Run the server
npm run dev


Server will start at:

http://localhost:5000

