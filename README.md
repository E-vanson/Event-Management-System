  # Event Management System 
  A modern event registration platform built with React and node js, featuring real time event registration, authorization and authentication.

  # Features

  User Features

    Authentication & Authorization
        Secure user authentication with jsonwebtoken
        Role-based access control (Admin/User)
        Protected routes and API endpoints

Event Management

    Admin Features
        Create, edit, and delete events
        Manage event details (title, description, startDate, endDate, venue)
        View event registration history

    User Features
        Browse upcoming events
        View event details


Technical Features

    Real-time Updates
        Real-time event updates
        
    
    Security
        Environment variable protection
        API route protection
        Data validation
        Role Based Access to endpoints  


  Technology Stack
Frontend

    React framework 
    Vanilla CSS - for styling
    react-icons - for icons

Backend

    Sequlize -  database ORM
    MySQL - Primary database
    jsonwebtoken - Authentication and user management
    node - runtime enviroment
    express - routing routes

Development & Deployment

    Java Script 
    React
    

# Setting up the enviroment
Prerequisites

    Node.js 18+ and npm
    MySQL database

  Installation

  Clone the repository:
  
                          ** The complete code can be found in the main branch **
  
          git clone https://github.com/E-vanson/Event-Management-System.git
          
          cd Event-Management-System

Environment Variables    
> Create a .env file in the /Backend directory

> Add the following variables:

                       PORT = "localhost"
                       DB_USERNAME = "username"
                       DB_PASSWORD = "password
                       DB_HOST = "localhost"
                       DB_NAME = ""db name


Install dependencies:

    cd Backend || cd Fronend
    npm install

# Start Development Server
    npm run dev


  API Documentation
Event Endpoints

    GET /event/getEvents - Get all events
    POST /event/createEvent - Create new event (Admin only)
    GET /event/[id] - Get specific event
    PUT /event/updateEvent/:id - Update event (Admin only)
    DELETE /event/deleteEvent/:id - Delete event (Admin only)
    POST /event/register - Register For An event

  Auth Endpoints

    POST /auth/register - Create and Register User
    POST /auth/login - Login User

  User Endpoints

    GET /user/getUsers - Get all users (Admin only)
    POST /user/createUser - Create new user (Admin only)
    GET /user/[id] - Get specific user
    PUT /user/updateUser/:id - Update user (Admin only)
    DELETE /user/deleteUser/:id - Delete user (Admin only)


  # Challenges Faced:
  Authentication:
  > Encounted a challenge using cookies for token storage and handling sessions
  > At times the cookie would be set in the request object and user can not be authenticated

  

