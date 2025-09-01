# Monyx - AI-Powered Personal Finance Tracker

## Project Overview

Monyx is a modern, intelligent personal finance tracking application that leverages artificial intelligence to simplify expense management and provide insightful financial analytics. The application combines natural language processing with beautiful data visualizations to help users understand and optimize their spending habits.

## Core Features

###  AI-Powered Transaction Entry
- **Natural Language Parsing**: Users can input transactions in plain English (e.g., "Bought coffee for $5 at Starbucks")
- **Smart Categorization**: Automatic categorization using Google Gemini AI
- **Confidence Scoring**: Each parsed transaction includes a confidence score for user verification
- **Date-Aware Parsing**: Intelligent date resolution for relative terms like "yesterday" or "last week"

###  Real-Time Analytics Dashboard
- **Financial Summary**: Income, expenses, and savings overview
- **Category Breakdown**: Pie chart visualization of spending by category
- **Spending Trends**: Line chart showing spending patterns over time
- **Spending Habits Analysis**: AI-generated insights into spending patterns and personalized suggestions

###  Receipt Processing
- **OCR Integration**: Upload receipt images for automatic text extraction
- **Multi-Modal AI**: Google Gemini processes both images and text for accurate parsing
- **Smart Date Detection**: Extracts transaction dates from receipt images

###  Transaction Management
- **Full CRUD Operations**: Create, read, update, and delete transactions
- **Advanced Filtering**: Filter by category, date range, and search terms
- **Bulk Operations**: Efficient management of multiple transactions
- **Real-Time Updates**: Instant dashboard updates after transaction changes

## Technical Architecture

### Backend (Node.js/Express)
- **Framework**: Express.js with middleware architecture
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Google OAuth 2.0
- **AI Integration**: Google Gemini API for NLP and OCR
- **Validation**: Joi schema validation
- **File Upload**: Multer for receipt image processing

### Frontend (React/TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Context with custom hooks
- **Charts**: Recharts for data visualization
- **Routing**: React Router for SPA navigation

### Key Technologies
- **AI/ML**: Google Gemini 2.5 Flash for natural language processing and OCR
- **Database**: MongoDB for flexible document storage
- **Deployment**: Vercel (frontend) and traditional hosting (backend)
- **Development**: Modern JavaScript toolchain with hot reloading

## API Architecture

### RESTful Design
The API follows RESTful conventions with consistent resource naming and HTTP methods:

- `GET /api/transactions` - Retrieve user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update existing transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/parse` - Parse natural language input
- `POST /api/transactions/ocr` - Process receipt image

### Data Models

#### Transaction Schema
```javascript
{
  userId: String,      // Associated user ID
  amount: Number,      // Transaction amount
  category: String,    // Expense category
  description: String, // Transaction description
  type: 'income' | 'expense',  // Transaction type
  date: Date,          // Transaction date
  createdAt: Date,     // Creation timestamp
  updatedAt: Date      // Last update timestamp
}
```

## AI Integration Details

### Transaction Parsing
The system uses Google Gemini to parse natural language inputs into structured transaction data:

**Input Processing:**
- Extracts amount, category, description, and transaction type
- Handles various input formats and languages
- Provides confidence scores for user verification

**Example Parsing:**
```
Input: "Spent $25 on lunch at Panda Express yesterday"
Output: {
  amount: 25,
  category: "Food",
  description: "Panda Express Lunch",
  type: "expense",
  date: "2024-01-15T12:00:00.000Z",
  confidence: 0.95
}
```

### OCR Processing
Receipt images are processed using Gemini's multimodal capabilities:

**Image Analysis:**
- Extracts text from receipt images
- Identifies transaction amounts and descriptions
- Detects dates and merchant information
- Combines visual and textual analysis for accuracy

### Spending Habits Analysis
AI analyzes user transaction patterns to provide insights:

**Analysis Categories:**
- **Patterns**: Overall spending behavior summary
- **Recurring Expenses**: Monthly subscriptions and regular costs
- **Spikes**: Unusual spending patterns or one-time purchases
- **Suggestions**: Personalized budgeting recommendations

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Lazy loading of routes and components
- **Image Optimization**: Efficient asset loading and caching
- **Bundle Analysis**: Optimized build sizes with Vite
- **Caching Strategy**: Browser caching for static assets

### Backend Optimizations
- **Database Indexing**: Optimized MongoDB queries
- **Connection Pooling**: Efficient database connection management
- **Caching Layer**: Redis for frequently accessed data (future enhancement)
- **API Response Compression**: Gzip compression for network efficiency

## Deployment Strategy

### Frontend Deployment (Vercel)
- **CDN Integration**: Global content delivery
- **Automatic Scaling**: Serverless function scaling
- **Environment Management**: Secure environment variable handling
- **Preview Deployments**: Automated deployments for pull requests

### Backend Deployment
- **Containerization**: Docker for consistent deployment
- **Orchestration**: Kubernetes for scalability (future)
- **Monitoring**: Application performance monitoring
- **Backup Strategy**: Automated database backups

## Development Workflow

### Version Control
- **Git Flow**: Feature branches and pull request workflow
- **Code Reviews**: Mandatory review process for all changes
- **Documentation**: Comprehensive API and code documentation

### Quality Assurance
- **TypeScript**: Type safety throughout the application
- **ESLint**: Code quality and consistency enforcement
- **Performance Monitoring**: Real user monitoring and analytics

## Future Enhancements

### Planned Features
- **Budget Planning**: Set and track spending limits by category
- **Expense Forecasting**: AI-powered spending predictions
- **Multi-Currency Support**: International currency handling
- **Receipt Storage**: Cloud storage for receipt images
- **Export Functionality**: Data export in various formats
- **Mobile App**: Native mobile applications for iOS and Android

### Technical Improvements
- **GraphQL API**: More flexible data fetching
- **Real-Time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Machine learning for spending predictions
- **Multi-Tenant Architecture**: Support for organizations
- **API Versioning**: Backward-compatible API evolution

## Conclusion

Monyx represents a modern approach to personal finance management, combining the power of artificial intelligence with intuitive user experience design. The application demonstrates how AI can simplify complex tasks while maintaining security, performance, and scalability.

The modular architecture and comprehensive documentation ensure that the codebase remains maintainable and extensible for future development.
