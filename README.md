# User Management System REST API

![Node.js](https://img.shields.io/badge/Node.js-v14.0%2B-green)
![Express.js](https://img.shields.io/badge/Express.js-v4.0%2B-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.0%2B-brightgreen)

A RESTful API for managing user accounts, built using Node.js, Express.js, MongoDB, and JWT authentication.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed (version 14.0 or higher)
- [MongoDB](https://www.mongodb.com/) installed and running
- [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/docs/install/) package manager installed

### Installation

1. **Clone the repository:**
   ```shell
   git clone https://github.com/yourusername/user-rest-api
2. **Navigate to the project directory:**
    ```shell
    cd user-rest-api
  
3. **install dependencies:**

    ```shell
    npm install

4. **Create a .env file in the root directory and configure your environment variables:**

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost/your-database
    JWT_SECRET=your-secret-key


5. **Start the server:**

    ```shell
    npm start

The API should now be running on http://localhost:3000 (or your configured port).
API Endpoints

    POST /api/register: Register a new user.
    POST /api/login: Authenticate and receive a JWT token.
    GET /api/users: Get a list of all users.
    GET /api/users/:id: Get user details by ID.
    PUT /api/users/:id: Update user details by ID.
    DELETE /api/users/:id: Delete a user by ID.

For detailed documentation on each endpoint, see the API documentation or Swagger documentation if available.
Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the Authorization header of your HTTP requests.

Example:

        Authorization: Bearer your-jwt-token
Usage

  Register a new user using the /api/register endpoint.
  Authenticate using the /api/login endpoint to receive a JWT token.
  Use the JWT token to access protected routes.
  Manage user data with the provided CRUD operations.

Contributing

Contributions are welcome! Feel free to submit issues, pull requests, or suggestions to improve this API.
License

This project is licensed under the MIT License. See the LICENSE.md file for details.

