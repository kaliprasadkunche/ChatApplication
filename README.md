# ChatApplication

Login Page
![Screenshot 2024-06-27 171414](https://github.com/kaliprasadkunche/ChatApplication/assets/113325469/dac7ed26-8ce2-442c-b7c9-01e310a4cb1b)

Register Page
![Screenshot 2024-06-27 171424](https://github.com/kaliprasadkunche/ChatApplication/assets/113325469/474b51e9-c8c4-464b-b530-ab5d6930bebf)

Chat Page
![Screenshot 2024-06-27 171615](https://github.com/kaliprasadkunche/ChatApplication/assets/113325469/29d42d11-3c72-4505-ab18-72fab0202f45)


ChatApplication is a real-time chat application built using a React frontend with Material-UI and a Node.js/Express backend. It supports user authentication, real-time messaging with WebSockets, and features a user-friendly interface.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- User authentication (registration and login)
- Real-time messaging with WebSocket
- User list with avatars
- Responsive and intuitive UI



## Technologies Used
- **Frontend**: React, Material-UI, TypeScript
- **Backend**: Node.js, Express, MongoDB, Mongoose, WebSocket
- **Others**: Axios for API requests, bcrypt for password hashing, JSON Web Token (JWT) for authentication

## Installation
To set up the project locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running

### Clone the Repository
```bash
git clone https://github.com/yourusername/ChatApplication.git
cd ChatApplication


Backend Setup
Navigate to the backend directory:
bash
Copy code
cd Backend
Install backend dependencies:
bash
Copy code
npm install
Create a .env file in the Backend directory and add the following environment variables:
env
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret
Start the backend server:
bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install frontend dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
npm start
The application should now be running at http://localhost:3000.

Usage
Open your browser and navigate to http://localhost:3000.
Register a new user or log in with an existing account.
Select a user from the user list to start chatting.
Send and receive messages in real-time.
Project Structure
java
Copy code
ChatApplication/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── package.json
API Endpoints
Here are the main API endpoints available in the backend:

Authentication
POST /api/register - Register a new user
POST /api/login - Log in an existing user
Users
GET /api/users - Get the list of users
Messages
GET /api/messages/:userId - Get messages for a specific user
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature/your-feature-name)
Make your changes and commit them (git commit -m 'Add new feature')
Push to the branch (git push origin feature/your-feature-name)
Create a new Pull Request
License
This project is licensed under the MIT License.

Acknowledgements
React
Material-UI
Node.js
Express
MongoDB
WebSocket
Axios
