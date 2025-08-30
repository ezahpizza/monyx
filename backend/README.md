
# Monyx - Intelligent Finance Tracker Backend

This is the backend server for Monyx, an intelligent finance tracker. It handles user authentication, transaction management (including AI-powered parsing), and financial analytics.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoint Documentation](#api-endpoint-documentation)
  - [Authentication](#authentication)
  - [Transactions](#transactions)
  - [Analytics](#analytics)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- A Google Cloud Platform project with OAuth 2.0 credentials enabled.
- A Google Gemini API Key.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd monyx
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and fill in the required values for your database, JWT secrets, Google OAuth credentials, and Gemini API key.

### Running the Server

Once the configuration is complete, you can start the server with:

```bash
npm start
```

The server will run on the port specified in your `.env` file (default: `3000`).

---

## API Endpoint Documentation

All API endpoints that require authentication expect a JWT in the `Authorization` header.

**Format:** `Authorization: Bearer <your_jwt_token>`

### Authentication

#### 1. Google Sign-In
- **Endpoint:** `POST /auth/google`
- **Description:** Authenticates a user using a Google ID token. If the user doesn't exist, a new account is created. It returns a JWT access token and a refresh token.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "token": "your_google_id_token"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "accessToken": "ey...",
    "refreshToken": "ey..."
  }
  ```
- **Error Response (401):**
  ```json
  {
    "error": "Invalid Google token"
  }
  ```

#### 2. Refresh Access Token
- **Endpoint:** `POST /auth/refresh`
- **Description:** Issues a new access token using a valid refresh token.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "token": "your_refresh_token"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "accessToken": "ey..."
  }
  ```
- **Error Response (403):**
  ```json
  {
    "error": "Invalid refresh token"
  }
  ```

#### 3. Get User Profile
- **Endpoint:** `GET /auth/profile`
- **Description:** Retrieves the profile of the currently authenticated user.
- **Access:** Private
- **Success Response (200):**
  ```json
  {
    "_id": "60d5f2c5c5b4f8b8c8b8c8b8",
    "googleId": "123456789012345678901",
    "email": "user@example.com",
    "name": "Test User",
    "avatar": "https://lh3.googleusercontent.com/a-/AOh14Gj...",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 4. Logout
- **Endpoint:** `POST /auth/logout`
- **Description:** Logs the user out. In this stateless setup, the client is responsible for deleting the tokens.
- **Access:** Private
- **Success Response (200):**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

### Transactions

#### 1. Parse Transaction from Text
- **Endpoint:** `POST /api/transactions/parse`
- **Description:** Uses the Gemini AI to parse a natural language string into a structured transaction object.
- **Access:** Private
- **Request Body:**
  ```json
  {
    "text": "Bought a coffee for $5"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "amount": 5,
    "category": "Food",
    "description": "Coffee",
    "type": "expense",
    "confidence": 0.95
  }
  ```
- **Error Response (400):**
  ```json
  {
    "error": "Unable to parse transaction"
  }
  ```

#### 2. Create a Transaction
- **Endpoint:** `POST /api/transactions`
- **Description:** Creates and saves a new transaction for the user.
- **Access:** Private
- **Request Body:**
  ```json
  {
    "amount": 250,
    "category": "Electronics",
    "description": "New headphones",
    "type": "expense",
    "date": "2023-10-27T10:00:00.000Z"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "_id": "60d5f2c5c5b4f8b8c8b8c8b9",
    "userId": "60d5f2c5c5b4f8b8c8b8c8b8",
    "amount": 250,
    "category": "Electronics",
    "description": "New headphones",
    "type": "expense",
    "date": "2023-10-27T10:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

#### 3. Get All Transactions
- **Endpoint:** `GET /api/transactions`
- **Description:** Retrieves a list of all transactions for the user, with optional filtering.
- **Access:** Private
- **Query Parameters (Optional):**
  - `category` (string): Filter by category.
  - `startDate` (string): ISO 8601 date.
  - `endDate` (string): ISO 8601 date.
  - `search` (string): Search by description text.
- **Success Response (200):**
  ```json
  [
    {
      "_id": "60d5f2c5c5b4f8b8c8b8c8b9",
      "userId": "60d5f2c5c5b4f8b8c8b8c8b8",
      "amount": 250,
      "category": "Electronics",
      "description": "New headphones",
      "type": "expense",
      "date": "2023-10-27T10:00:00.000Z",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```

#### 4. Update a Transaction
- **Endpoint:** `PUT /api/transactions/:id`
- **Description:** Updates an existing transaction.
- **Access:** Private
- **Request Body:**
  ```json
  {
    "amount": 260,
    "description": "New Sony headphones"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "_id": "60d5f2c5c5b4f8b8c8b8c8b9",
    "userId": "60d5f2c5c5b4f8b8c8b8c8b8",
    "amount": 260,
    "category": "Electronics",
    "description": "New Sony headphones",
    "type": "expense",
    "date": "2023-10-27T10:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```
- **Error Response (404):**
  ```json
  {
    "error": "Transaction not found"
  }
  ```

#### 5. Delete a Transaction
- **Endpoint:** `DELETE /api/transactions/:id`
- **Description:** Deletes a specific transaction.
- **Access:** Private
- **Success Response (200):**
  ```json
  {
    "message": "Transaction removed"
  }
  ```

---

### Analytics

#### 1. Get Financial Summary
- **Endpoint:** `GET /api/analytics/summary`
- **Description:** Returns a summary of total income, expenses, and savings for a given period.
- **Access:** Private
- **Query Parameters (Optional):**
  - `startDate` (string): ISO 8601 date.
  - `endDate` (string): ISO 8601 date.
- **Success Response (200):**
  ```json
  {
    "income": 5000,
    "expenses": 2500,
    "savings": 2500
  }
  ```

#### 2. Get Category-wise Spending
- **Endpoint:** `GET /api/analytics/categories`
- **Description:** Returns total spending grouped by category for a given period.
- **Access:** Private
- **Query Parameters (Optional):**
  - `startDate` (string): ISO 8601 date.
  - `endDate` (string): ISO 8601 date.
- **Success Response (200):**
  ```json
  [
    { "name": "Food", "total": 800 },
    { "name": "Transport", "total": 450 },
    { "name": "Shopping", "total": 1250 }
  ]
  ```

#### 3. Get Spending Trends
- **Endpoint:** `GET /api/analytics/trends`
- **Description:** Returns a time-series list of total daily spending for a given period.
- **Access:** Private
- **Query Parameters (Optional):**
  - `startDate` (string): ISO 8601 date.
  - `endDate` (string): ISO 8601 date.
- **Success Response (200):**
  ```json
  [
    { "date": "2023-10-01", "total": 150 },
    { "date": "2023-10-02", "total": 75 },
    { "date": "2023-10-03", "total": 220 }
  ]
  ```

---

## Environment Variables

The following environment variables are required for the application to run. See `.env.example` for a template.

- `PORT`: The port for the server to listen on.
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT access tokens.
- `JWT_REFRESH_SECRET`: Secret key for signing JWT refresh tokens.
- `JWT_ACCESS_TOKEN_EXPIRATION`: Expiration time for access tokens (e.g., "15m").
- `JWT_REFRESH_TOKEN_EXPIRATION`: Expiration time for refresh tokens (e.g., "7d").
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
- `GEMINI_API_KEY`: Your Google Gemini API Key.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** Google OAuth 2.0, JSON Web Tokens (JWT)
- **AI:** Google Gemini
- **Validation:** Joi
