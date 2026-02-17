# Job Listing Portal - MongoDB Integration

This is a user signup system with MongoDB database integration.

## 📋 Features

- User registration with form validation
- Store user data in MongoDB database
- View all registered users
- Delete users from database
- Real-time data retrieval

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## 📦 Installation

### Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Option A**: Install MongoDB locally - [Download](https://www.mongodb.com/try/download/community)
   - **Option B**: Use MongoDB Atlas (cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas)

### Setup Steps

1. **Install MongoDB locally** (if not using Atlas):
   ```bash
   # Download and install MongoDB Community Edition
   # Start MongoDB service
   # Windows: MongoDB should start automatically as a service
   # Or manually: mongod --dbpath "C:\data\db"
   ```

2. **Dependencies are already installed!**
   All npm packages have been installed successfully.

3. **Configure MongoDB Connection** (Optional):
   - Default connection: `mongodb://localhost:27017/jobListingPortal`
   - To use MongoDB Atlas or a different URI, edit `server.js`:
     ```javascript
     const MONGO_URI = 'your-mongodb-connection-string';
     ```

## 🚀 Running the Application

1. **Start the server**:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   - Sign Up Page: http://localhost:3000
   - View Users: http://localhost:3000/users.html

3. **The server will**:
   - Connect to MongoDB automatically
   - Create the `jobListingPortal` database
   - Create the `users` collection when you register the first user

## 📁 Project Structure

```
job_listing_portal/
├── index.html          # Sign up form page
├── users.html          # View all registered users
├── index.js            # Frontend JavaScript (signup logic)
├── style.css           # Styling
├── server.js           # Express server + MongoDB connection
├── package.json        # Dependencies
└── README.md           # This file
```

## 🔌 API Endpoints

### Create User (Sign Up)
- **POST** `/api/users`
- Body: `{ "username": "john", "email": "john@example.com", "password": "password123" }`

### Get All Users
- **GET** `/api/users`

### Get Single User
- **GET** `/api/users/:id`

### Delete User
- **DELETE** `/api/users/:id`

## 🧪 Testing the Application

1. Fill out the signup form with:
   - Username (required)
   - Valid email
   - Password (min 8 characters)

2. Click "Sign Up"
   - Data is validated
   - Sent to MongoDB via backend API
   - User is redirected to the users list page

3. View all users on the users.html page
4. Delete users if needed

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running
- Windows: Check if MongoDB service is running in Services
- Or start manually: `mongod --dbpath "C:\data\db"`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Change port in `server.js`: `const PORT = 3001;`
- Or kill the process using port 3000

### Cannot Connect to Server
**Solution**: Make sure the server is running (`npm start`)

## 🔒 Security Notes

⚠️ **Important**: This is a basic implementation for learning purposes.

For production use, you should:
- Hash passwords using bcrypt before storing
- Add authentication (JWT tokens)
- Implement input sanitization
- Add rate limiting
- Use environment variables for sensitive data
- Enable HTTPS

## 📝 Next Steps

Consider adding:
- User login functionality
- Password hashing (bcrypt)
- Email verification
- Session management
- Job listing CRUD operations
- Search and filter features

## 📄 License

This project is open source and available for educational purposes.
