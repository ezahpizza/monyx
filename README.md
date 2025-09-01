# Monyx - AI-Powered Personal Finance Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0.0-blue)](https://www.typescriptlang.org/)

A modern, intelligent personal finance tracking application that combines AI-powered transaction parsing with beautiful data visualizations to help users understand and optimize their spending habits.

##  Features

###  AI-Powered Intelligence
- **Natural Language Processing**: Parse transactions from plain English (e.g., "Bought coffee for $5")
- **Smart Categorization**: Automatic expense categorization with confidence scoring
- **Receipt OCR**: Upload receipt images for automatic transaction extraction
- **Spending Habits Analysis**: AI-generated insights into spending patterns and personalized recommendations

###  Real-Time Analytics
- **Interactive Dashboard**: Beautiful charts and financial summaries
- **Category Breakdown**: Pie charts showing spending distribution
- **Trend Analysis**: Line charts displaying spending patterns over time
- **Financial Summary**: Income, expenses, and savings tracking

##  Secure & Modern
- **Google OAuth**: Secure authentication with Google accounts via Clerk
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Theme switching with system preference detection

### Transaction Management
- **Full CRUD Operations**: Create, read, update, and delete transactions
- **Advanced Filtering**: Filter by category, date range, and search terms
- **Bulk Operations**: Efficient management of multiple transactions
- **Real-Time Updates**: Instant dashboard synchronization

## Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB** database
- **Google Cloud Platform** project with OAuth and Gemini API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ezahpizza/monyx.git
   cd monyx
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm start
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000

## Project Structure

```
monyx/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic & AI integration
│   │   ├── middlewares/    # Custom middleware
│   │   └── utils/          # Helper functions
│   ├── Dockerfile          # Container configuration
│   └── package.json
├── frontend/               # React/TypeScript client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client functions
│   │   └── types/          # TypeScript definitions
│   ├── public/             # Static assets
│   └── package.json
├── docs/                   # Comprehensive documentation
│   ├── README.md          # Project overview
│   ├── API.md             # API documentation
│   ├── FEATURES.md        # Feature documentation
│   └── SCHEMAS.md         # Data schemas
└── localDocs/             # Development documentation
```

## Configuration

### Backend Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/monyx

# Google Services
GEMINI_API_KEY=your_gemini_api_key

# CORS
CLIENT_URL=http://localhost:8080
```

### Frontend Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini 2.5 Flash
- **Validation**: Joi
- **File Upload**: Multer
- **Security**: CORS, Helmet, Rate Limiting

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI + Hover.dev
- **Charts**: Recharts
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router v6
- **API Client**: Axios
- **Form Handling**: React Hook Form + Zod

### DevOps
- **Containerization**: Docker
- **Deployment**: Vercel (frontend), Render (backend)
- **Version Control**: Git
- **Package Management**: npm/pnpm

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Project Overview](docs/README.md)**: Detailed project description and architecture
- **[API Documentation](docs/API.md)**: Complete API reference with examples
- **[Features Guide](docs/FEATURES.md)**: In-depth feature documentation
- **[Data Schemas](docs/SCHEMAS.md)**: Database and API schema definitions

##  AI Integration

### Transaction Parsing
The application uses Google Gemini AI to parse natural language inputs:

```javascript
// Example API call
POST /api/transactions/parse
{
  "text": "Bought coffee for $5 at Starbucks yesterday"
}

// Response
{
  "amount": 5,
  "category": "Food",
  "description": "Coffee at Starbucks",
  "type": "expense",
  "date": "2024-01-14T00:00:00.000Z",
  "confidence": 0.95
}
```

### Receipt Processing
Upload receipt images for automatic OCR and parsing:

```javascript
// Multipart form data
POST /api/transactions/ocr
Content-Type: multipart/form-data
Body: file=<receipt_image>

// Response
{
  "rawText": "PANDA EXPRESS $25.50 01/15/24",
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

##  Analytics Features

### Financial Summary
Real-time calculation of key financial metrics:
- Total income and expenses
- Net savings calculation
- Period-based filtering (weekly/monthly)

### Category Analysis
Visual breakdown of spending patterns:
- Pie chart visualization
- Category-wise totals
- Interactive hover details

### Trend Analysis
Time-series spending analysis:
- Daily spending trends
- Line chart visualization
- Historical pattern identification

### Spending Habits
AI-powered insights:
- Pattern recognition
- Recurring expense identification
- Spending spike detection
- Personalized recommendations

##  Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Backend (Docker)
```bash
# Build Docker image
docker build -t monyx-backend .

# Run container
docker run -p 3000:3000 monyx-backend
```

### Environment Setup
1. Set up MongoDB database
2. Configure Google OAuth credentials
3. Set up Gemini API key
4. Configure environment variables
5. Deploy backend and frontend

##  Acknowledgments

- **Google Gemini AI** for powering the intelligent transaction parsing
- **[@TomIsLoading](https://x.com/tomisloading)** for the beautiful component library [Hover.dev](https://www.hover.dev)
- **Recharts** for the data visualization components


