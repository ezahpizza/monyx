# Monyx API Documentation

## Overview

The Monyx API provides a comprehensive set of endpoints for managing personal finance data, including transaction processing, analytics, and user authentication. The API is built with RESTful principles and uses JSON for data exchange.

## Base URL
```
https://api.monyx.com
```

## Authentication

All protected endpoints require JWT authentication via the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### POST /auth/google
Authenticate user with Google OAuth token.

**Request Body:**
```json
{
  "token": "google_id_token"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "googleId": "google_user_id",
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://profile.picture.url"
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200):**
```json
{
  "accessToken": "new_access_token"
}
```

#### GET /auth/profile
Get authenticated user profile.

**Response (200):**
```json
{
  "_id": "user_id",
  "googleId": "google_user_id",
  "email": "user@example.com",
  "name": "User Name",
  "picture": "https://profile.picture.url",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Transaction Endpoints

### POST /api/transactions/parse
Parse natural language transaction input using AI.

**Request Body:**
```json
{
  "text": "Bought coffee for $5 at Starbucks"
}
```

**Response (200):**
```json
{
  "amount": 5,
  "category": "Food",
  "description": "Coffee at Starbucks",
  "type": "expense",
  "date": "2024-01-15T10:30:00.000Z",
  "confidence": 0.95
}
```

**Error Response (400):**
```json
{
  "error": "Unable to parse transaction"
}
```

### POST /api/transactions
Create a new transaction.

**Request Body:**
```json
{
  "amount": 25.50,
  "category": "Food",
  "description": "Lunch at restaurant",
  "type": "expense",
  "date": "2024-01-15T12:00:00.000Z"
}
```

**Response (201):**
```json
{
  "_id": "transaction_id",
  "userId": "user_id",
  "amount": 25.50,
  "category": "Food",
  "description": "Lunch at restaurant",
  "type": "expense",
  "date": "2024-01-15T12:00:00.000Z",
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

### GET /api/transactions
Get user's transactions with optional filtering.

**Query Parameters:**
- `category` (string): Filter by category
- `startDate` (string): ISO 8601 start date
- `endDate` (string): ISO 8601 end date
- `search` (string): Search in description
- `period` (string): 'weekly' or 'monthly' (alternative to startDate/endDate)

**Response (200):**
```json
[
  {
    "_id": "transaction_id",
    "userId": "user_id",
    "amount": 25.50,
    "category": "Food",
    "description": "Lunch at restaurant",
    "type": "expense",
    "date": "2024-01-15T12:00:00.000Z",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
]
```

### PUT /api/transactions/:id
Update an existing transaction.

**Request Body:**
```json
{
  "amount": 30.00,
  "description": "Updated lunch description"
}
```

**Response (200):**
```json
{
  "_id": "transaction_id",
  "userId": "user_id",
  "amount": 30.00,
  "category": "Food",
  "description": "Updated lunch description",
  "type": "expense",
  "date": "2024-01-15T12:00:00.000Z",
  "createdAt": "2024-01-15T12:00:00.000Z",
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

### DELETE /api/transactions/:id
Delete a transaction.

**Response (200):**
```json
{
  "message": "Transaction removed"
}
```

### POST /api/transactions/ocr
Process receipt image and extract transaction data.

**Content-Type:** `multipart/form-data`

**Request Body:**
```
file: <receipt_image>
```

**Response (200):**
```json
{
  "rawText": "Panda Express $25.50 Jan 15, 2024",
  "parsed": {
    "amount": 25.50,
    "category": "Food",
    "description": "Panda Express",
    "type": "expense",
    "date": "2024-01-15T00:00:00.000Z",
    "confidence": 0.93
  }
}
```

## Analytics Endpoints

### GET /api/analytics/summary
Get financial summary for a period.

**Query Parameters:**
- `startDate` (string): ISO 8601 start date
- `endDate` (string): ISO 8601 end date
- `period` (string): 'weekly' or 'monthly'

**Response (200):**
```json
{
  "income": 5000.00,
  "expenses": 2500.00,
  "savings": 2500.00
}
```

### GET /api/analytics/categories
Get spending breakdown by category.

**Query Parameters:**
- `startDate` (string): ISO 8601 start date
- `endDate` (string): ISO 8601 end date
- `period` (string): 'weekly' or 'monthly'

**Response (200):**
```json
[
  {
    "name": "Food",
    "total": 800.00
  },
  {
    "name": "Transport",
    "total": 450.00
  },
  {
    "name": "Shopping",
    "total": 1250.00
  }
]
```

### GET /api/analytics/trends
Get daily spending trends over time.

**Query Parameters:**
- `startDate` (string): ISO 8601 start date
- `endDate` (string): ISO 8601 end date
- `period` (string): 'weekly' or 'monthly'

**Response (200):**
```json
[
  {
    "date": "2024-01-01",
    "total": 150.00
  },
  {
    "date": "2024-01-02",
    "total": 75.00
  },
  {
    "date": "2024-01-03",
    "total": 220.00
  }
]
```

### GET /api/analytics/habits
Get AI-powered spending habits analysis.

**Response (200):**
```json
{
  "analysis": {
    "patterns": "You spend the most on Food and Entertainment, averaging $450/month on dining out.",
    "recurringExpenses": "Netflix $15 monthly, Gym $40 monthly, Spotify $10 monthly",
    "spikes": "High one-time purchase: MacBook $1200 in July, Vacation expenses $800 in August",
    "suggestions": "Consider limiting dining out to save $150/month. Review subscription services for potential savings."
  }
}
```

## Error Handling

All endpoints follow consistent error response format:

**400 Bad Request:**
```json
{
  "error": "Error message description"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Access denied"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```


## Data Validation

### Transaction Validation Rules
- `amount`: Required, positive number, max 2 decimal places
- `category`: Required, one of: Food, Transport, Shopping, Bills, Entertainment, Health, Groceries, Gas, Other
- `description`: Required, string, max 200 characters
- `type`: Required, either 'income' or 'expense'
- `date`: Optional, valid ISO 8601 date string


## Changelog

### Version 1.0.0
- Initial release with core transaction and analytics features
- AI-powered transaction parsing
- Receipt OCR processing
- Real-time analytics dashboard

### Version 1.1.0 (Upcoming)
- Budget planning and tracking
- Multi-currency support
- Advanced filtering options
- Export functionality
- Mobile app SDK

## Support

For API support and questions:
- **Documentation**: https://docs.monyx.com
- **API Status**: https://status.monyx.com
- **Support Email**: api-support@monyx.com
- **Community Forum**: https://community.monyx.com

## Terms of Service

By using the Monyx API, you agree to our [Terms of Service](https://monyx.com/terms) and [Privacy Policy](https://monyx.com/privacy).
