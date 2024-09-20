# Meeting Room Booking System

## Introduction

The Meeting Room Booking System is a web application that allows users to book available meeting rooms for specific time slots. The system is designed for two types of users: **Admins** and **Users**. Admins can manage rooms, create slots, and handle bookings, while regular users can explore rooms, view room details, and book available time slots for meetings.

## Project Description

This project provides an efficient way for organizations to manage meeting room bookings. Admins have the ability to create rooms, define available slots, and manage bookings. Users can log in, explore available meeting rooms, view details, check slot availability by selecting dates, and book rooms for their meetings. The system ensures that users only book rooms during available slots and receive feedback on their bookings.

## Features

- **Admin Features:**
  - Create and manage meeting rooms.
  - Define and manage time slots for meeting rooms.
  - Manage users and view all bookings.
- **User Features:**
  - Log in and explore meeting rooms.
  - View room details and availability.
  - Select available slots based on the chosen date.
  - Book available meeting room slots.
  - View and manage personal bookings.
- **General Features:**
  - Responsive design for mobile,tablet and desktop.
  - Smooth animations for UI interactions.
  - Role-based access control (Admin/User).
  - Higher security

## Technology Stack

- **Backend:**
  - Typescript
  - Node.js
  - Express.js
  - Mongoose
  - MongoDB (Database)
  - Eslint
  - prettier
  - jwt token

## Installation Guideline

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository:**
   ```bash
   https://github.com/MdAlim360/meeting-room-booking-server.git
   cd meeting-room-booking-system
   ```
1. **Install dependencies:**

   ```bash
   npm install

   ```

1. **Run the development server:**
   ```bash
   npm run dev
   ```

### Create a `.env` file:

Create a `.env` file in the root directory of the project and add the necessary environment variables. Example:

```env
NODE_ENV=development
PORT=5100
DATABASE_URL=mongodb+srv://<name>:<password>@cluster0.xxpprdw.mongodb.net/<collection>?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=836a932f77a5c53f9f646854ac6c622ec69ce043268ed3d390920d395ca96b0a
JWT_REFRESH_SECRET=c6f548c6bfd8d4a782117f3e458153478de0d1fd27df1713089d197da5ea7622f118603ff0b5cf432544078bb567b0e51c36853e5ca8f329647cb0afdee09e11
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
STORE_ID=aamarpaytest
SIGNATURE_KEY=dbb74894e82415a2f7ff0ec3a97e4183
VERIFY_PAYMENT_URL=https://sandbox.aamarpay.com/api/v1/trxcheck/request.php



## Usage

### Admin Workflow:
1. Log in to the system as an Admin.
2. Create and manage meeting rooms.
3. Define time slots for each room.
4. Monitor and manage user bookings.

### User Workflow:
1. Log in as a User.
2. Browse available meeting rooms on the home page.
3. View details of a selected room.
4. Select a date to check available time slots.
5. Book a meeting room by selecting a slot and confirming the booking.
6. View and manage your bookings.

```
