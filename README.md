
# Node Js Authentication using JWT and passport.js 
  This project is a complete authentication system built with Node.js, designed to handle user authentication securely and efficiently. It integrates a backend API with the frontend, providing a seamless login and registration experience.
# Tech Stack
* Frontend
   - React Js
   - Tailwind css
* Backend
   - Express Js
   - Mongo Db
   - JWT
   - Passport Js
 
# Key Features
* JWT-Based Authentication:
Uses JSON Web Tokens (JWT) for stateless and secure user authentication. The JWT is issued on successful login and sent back to the client, allowing protected routes and API endpoints to verify user identity.

* Google OAuth Integration:
Allows users to authenticate using their Google accounts via OAuth. This feature simplifies user registration and login by leveraging Google's secure authentication system.

* Passport.js Integration:
Leverages Passport.js, a flexible and modular authentication middleware, for robust handling of authentication strategies.

* Password Encryption:
 User passwords are securely hashed and stored in the database using bcrypt, ensuring high-level security.

* Error Handling:
Comprehensive error handling for invalid inputs, authentication failures, and expired tokens.


# Setup and Installation
* Clone the repository.
* Install dependencies with npm install in both client and server.
* Configure the .env file with the following in the server:
    - SECRET_KEY (jwt secret key)
    - GOOGLE_CLIENT_ID
    - GOOGLE_CLIENT_SECRET
    - Database connection URI (DB_URI)
    - SESSION_SECRET (a random string)
    - PORT (your PORT number)
    - EMAIL (your email address)
    - EMAIL_PASSWORD (add an app password here for your google account)
* Start the backend server with node server.js or nodemon server.js.
* Run the frontend development server using npm run dev

# Potential Use Cases
* Personal Projects: Build authentication for your apps.
* Multi-Strategy Authentication: Combine standard login with third-party providers.
* Learning Resource: Understand how to integrate Google OAuth with JWT-based systems.
