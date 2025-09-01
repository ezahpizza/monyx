# Monyx - Intelligent Finance Tracker

A beautiful, modern finance tracking application with AI-powered transaction parsing, real-time analytics, and Google OAuth authentication.

## 🚀 Features

- **Google OAuth Authentication** - Secure sign-in with your Google account
- **AI-Powered Transaction Entry** - Just type "Bought coffee $5" and let AI categorize it
- **Real-time Dashboard** - Beautiful charts and summary cards showing your financial health
- **Smart Analytics** - Pie charts for spending by category, line charts for trends over time
- **Transaction Management** - Full CRUD operations with search and filtering
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router
- **API Communication**: Axios with interceptors
- **Form Validation**: Zod
- **Authentication**: Google OAuth 2.0

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── SummaryCards.tsx
│   ├── TransactionEntry.tsx
│   ├── TransactionList.tsx
│   └── Charts.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── TransactionContext.tsx
├── hooks/              # Custom hooks
├── pages/              # Page-level components
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── services/           # API service functions
│   └── api.ts
├── assets/             # Images and static assets
└── styles/             # CSS and design system
    ├── index.css       # Design system tokens
    └── tailwind.config.ts
```

## 🎨 Design System

Monyx uses a comprehensive design system built with Tailwind CSS:

### Colors
- **Primary**: Modern teal/blue for brand and CTAs
- **Success**: Green for income and positive values
- **Warning**: Orange for savings and neutral actions
- **Expense**: Red for expenses and negative values

### Components
- Consistent spacing and typography
- Rounded corners and subtle shadows
- Smooth animations and hover effects
- Responsive breakpoints for all screen sizes

### Custom Utilities
- Financial color classes (`.text-success`, `.text-expense`)
- Gradient backgrounds (`.bg-gradient-primary`, `.bg-gradient-hero`)
- Animation classes (`.hover-lift`, `.hover-glow`)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running (see backend documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd monyx-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔌 API Integration

The app integrates with the Monyx backend API for:

- **Authentication**: Google OAuth token exchange, profile management
- **Transactions**: CRUD operations, AI parsing from natural language
- **Analytics**: Financial summaries, category breakdowns, spending trends

See `src/services/api.ts` for all API endpoints and TypeScript interfaces.

## 📱 Key Components

### Landing Page (`/`)
- Hero section with Google Sign-in
- Feature highlights
- Responsive design with call-to-action

### Dashboard (`/dashboard`)
- Summary cards (Income, Expenses, Savings, Balance)
- AI-powered transaction entry
- Interactive charts (Pie chart for categories, Line chart for trends)
- Recent transactions list
- User profile and navigation

### Transaction Management
- Natural language parsing with confidence scores
- Confirmation dialog for parsed transactions
- Full transaction list with search and filtering
- Edit and delete functionality

## 🔐 Authentication Flow

1. User clicks "Continue with Google" on landing page
2. Google OAuth integration exchanges token for JWT
3. JWT stored in localStorage with refresh token
4. Automatic token refresh on API calls
5. Protected routes redirect to landing if not authenticated

## 📊 Analytics Features

- **Summary Cards**: Real-time financial overview
- **Category Pie Chart**: Visual spending breakdown
- **Trend Line Chart**: Daily spending patterns over time
- **Transaction History**: Searchable and filterable list

## 🎯 Production Ready

The application is built with production best practices:

- TypeScript for type safety
- Error handling and loading states
- Responsive design for all devices
- Optimized API calls with request/response interceptors
- Clean component architecture with separation of concerns

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

- Components are functional with hooks
- Context providers for global state management
- Custom hooks for API operations
- TypeScript interfaces for all data models
- Consistent error handling and user feedback

## 🚀 Deployment

Built for deployment on Vercel with:

- Optimized production build
- Environment variable support
- Static asset optimization
- Automatic HTTPS and CDN

Deploy by connecting your GitHub repository to Vercel and setting environment variables in the dashboard.

---

Made with ❤️ using React, TypeScript, and Tailwind CSS