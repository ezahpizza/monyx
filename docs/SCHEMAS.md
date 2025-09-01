# Monyx Data Schemas

## Overview

This document outlines the data models and schemas used in the Monyx application, including database schemas, API request/response formats, and validation rules.

## Database Schemas

### User Schema

**Collection:** `users`

```javascript
const userSchema = new mongoose.Schema({
    userid: string,
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
```

**Validation Rules:**
- `userid`: Required, unique, string
- `email`: Required, unique, valid email format
- `name`: Required, string, 2-100 characters
- `picture`: Optional, valid URL format

### Transaction Schema

**Collection:** `transactions`

```javascript
const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
    max: 999999.99
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Groceries', 'Gas', 'Other']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
```

**Indexes:**
- `{ userId: 1, date: -1 }` (compound index for user queries)
- `{ userId: 1, category: 1 }` (compound index for category filtering)
- `{ userId: 1, type: 1 }` (compound index for income/expense filtering)

**Validation Rules:**
- `userId`: Required, string, references user ID
- `amount`: Required, positive number, max 2 decimal places
- `category`: Required, one of predefined categories
- `description`: Required, string, 1-200 characters
- `type`: Required, either 'income' or 'expense'
- `date`: Required, valid date

## API Schemas

### Transaction Schemas

#### Transaction Base Interface
```typescript
interface TransactionBase {
  amount: number;
  category: TransactionCategory;
  description: string;
  type: TransactionType;
  date: string; // ISO 8601 date string
}

type TransactionCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Health'
  | 'Groceries'
  | 'Gas'
  | 'Other';

type TransactionType = 'income' | 'expense';
```

#### Full Transaction Interface
```typescript
interface Transaction extends TransactionBase {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
```

#### Create Transaction Request
```typescript
interface CreateTransactionRequest extends TransactionBase {
  // Inherits all fields from TransactionBase
}
```

#### Update Transaction Request
```typescript
interface UpdateTransactionRequest extends Partial<TransactionBase> {
  // All fields optional for partial updates
}
```

#### Transaction Query Parameters
```typescript
interface TransactionQueryParams {
  category?: TransactionCategory;
  startDate?: string; // ISO 8601
  endDate?: string;   // ISO 8601
  search?: string;    // Search in description
  period?: 'weekly' | 'monthly';
}
```

#### Parsed Transaction Response
```typescript
interface ParsedTransaction extends TransactionBase {
  confidence: number; // 0.0 to 1.0
}
```

#### Parse Transaction Request
```typescript
interface ParseTransactionRequest {
  text: string; // Natural language input
}
```

### Analytics Schemas

#### Financial Summary Response
```typescript
interface FinancialSummary {
  income: number;
  expenses: number;
  savings: number;
}
```

#### Category Data Response
```typescript
interface CategoryData {
  name: TransactionCategory;
  total: number;
}
```

#### Trend Data Response
```typescript
interface TrendData {
  date: string; // YYYY-MM-DD format
  total: number;
}
```

#### Spending Habits Analysis Response
```typescript
interface SpendingHabitsAnalysis {
  analysis: {
    patterns: string;
    recurringExpenses: string;
    spikes: string;
    suggestions: string;
  };
}
```

#### Analytics Query Parameters
```typescript
interface AnalyticsQueryParams {
  startDate?: string; // ISO 8601
  endDate?: string;   // ISO 8601
  period?: 'weekly' | 'monthly';
}
```

### OCR Schemas

#### OCR Processing Response
```typescript
interface OCRResponse {
  rawText: string;
  parsed: ParsedTransaction;
}
```

#### OCR Error Response
```typescript
interface OCRErrorResponse {
  error: string;
}
```

## Validation Schemas

### Joi Validation Schemas (Backend)

#### Transaction Validation Schema
```javascript
const transactionSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.positive': 'Amount must be positive',
      'number.precision': 'Amount can have at most 2 decimal places',
      'any.required': 'Amount is required'
    }),

  category: Joi.string()
    .valid('Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Groceries', 'Gas', 'Other')
    .required()
    .messages({
      'any.only': 'Category must be one of the predefined values',
      'any.required': 'Category is required'
    }),

  description: Joi.string()
    .trim()
    .min(1)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Description cannot be empty',
      'string.max': 'Description cannot exceed 200 characters',
      'any.required': 'Description is required'
    }),

  type: Joi.string()
    .valid('income', 'expense')
    .required()
    .messages({
      'any.only': 'Type must be either income or expense',
      'any.required': 'Type is required'
    }),

  date: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.format': 'Date must be in ISO 8601 format'
    })
});
```

#### Parse Transaction Validation Schema
```javascript
const parseTransactionSchema = Joi.object({
  text: Joi.string()
    .trim()
    .min(1)
    .max(500)
    .required()
    .messages({
      'string.empty': 'Transaction text cannot be empty',
      'string.max': 'Transaction text cannot exceed 500 characters',
      'any.required': 'Transaction text is required'
    })
});
```

#### OCR Transaction Validation Schema
```javascript
const ocrTransactionSchema = Joi.object({
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
    size: Joi.number().max(5 * 1024 * 1024).required(), // 5MB max
    buffer: Joi.binary().required()
  }).unknown(true)
}).unknown(true);
```

### Zod Validation Schemas (Frontend)

#### Transaction Form Schema
```typescript
import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .max(999999.99, 'Amount cannot exceed 999,999.99')
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: 'Amount can have at most 2 decimal places'
    }),

  category: z.enum([
    'Food', 'Transport', 'Shopping', 'Bills',
    'Entertainment', 'Health', 'Groceries', 'Gas', 'Other'
  ], {
    required_error: 'Please select a category'
  }),

  description: z.string()
    .min(1, 'Description is required')
    .max(200, 'Description cannot exceed 200 characters')
    .trim(),

  type: z.enum(['income', 'expense'], {
    required_error: 'Please select transaction type'
  }),

  date: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Please enter a valid date'
    })
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
```

#### Parse Transaction Schema
```typescript
export const parseTransactionSchema = z.object({
  text: z.string()
    .min(1, 'Please enter transaction details')
    .max(500, 'Transaction text cannot exceed 500 characters')
    .trim()
});

export type ParseTransactionData = z.infer<typeof parseTransactionSchema>;
```

## Error Schemas

### API Error Response
```typescript
interface APIError {
  error: string;
  code?: string;
  details?: Record<string, any>;
}
```

### Validation Error Response
```typescript
interface ValidationError extends APIError {
  errors: {
    field: string;
    message: string;
  }[];
}
```

## File Upload Schemas

### Multer Configuration
```javascript
const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and JPG images are allowed'));
    }
  }
};
```

## Environment Variables Schema

### Backend Environment Variables
```typescript
interface BackendEnv {
  PORT: number;
  MONGO_URI: string;
  GEMINI_API_KEY: string;
  CLIENT_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
}
```

### Frontend Environment Variables
```typescript
interface FrontendEnv {
  VITE_API_BASE_URL: string;
  VITE_CLERK_PUBLISHABLE_KEY: string;
}
```

## Migration Schemas

### Database Migration Structure
```typescript
interface Migration {
  version: string;
  description: string;
  up: (db: mongoose.Connection) => Promise<void>;
  down: (db: mongoose.Connection) => Promise<void>;
  createdAt: Date;
}
```

## Cache Schemas

### Redis Cache Structure (Future)
```typescript
interface CacheEntry {
  key: string;
  value: any;
  ttl: number; // Time to live in seconds
  createdAt: Date;
  updatedAt: Date;
}
```
---

This comprehensive schema documentation ensures consistency across the application and provides clear contracts for API interactions, database operations, and data validation.
