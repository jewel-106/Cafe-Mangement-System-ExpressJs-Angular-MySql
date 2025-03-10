# Cafe Management System

A full-stack Cafe Management System built with Angular, Express.js, and MySQL.

## Features

- User authentication (Signup, Login, Reset Password)
- Manage categories, orders, and bills
- Generate PDF reports for bills
- Role-based access control (Admin, Staff, Customer)
- Responsive UI with Angular 12
- RESTful API with Express.js
- Database management with MySQL

## Technologies Used

- **Frontend:** Angular 12, TypeScript, Bootstrap
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MySQL
- **PDF Generation:** Puppeteer, EJS

## Installation

### Prerequisites
- Node.js (16.20.2 recommended)
- MySQL
- Angular CLI (if working on frontend)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/jewel-106/Cafe-Mangement-System-ExpressJs-Angular-MySql.git
   cd cafe-management-system/Backend-Cafe-NodeJs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure `.env` file:
   ```env
   PORT=8080
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=cafe_db
   JWT_SECRET=your_secret_key
   ```
4. Run the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../Frontend-Cafe-Angular
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the Angular app:
   ```sh
   ng serve
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/reset-password` - Reset password

### Orders & Bills
- `POST /api/bill/generateReport` - Generate PDF report
- `POST /api/bill/getPdf` - Fetch a bill PDF
- `GET /api/bill/getBills` - Get all bills
- `DELETE /api/bill/delete/:id` - Delete a bill

## Usage
1. Admin can manage users, categories, and orders.
2. Staff can take orders and generate bills.
3. Customers can view their order history and bills.

## Contributing
Feel free to contribute by submitting a pull request.

## License
This project is licensed under the MIT License.

---
### Developer
**Md. Jewel Rana**

[LinkedIn](https://www.linkedin.com/in/jewel-rana-cse19duet/)  |  [GitHub](https://github.com/jewel-106)

