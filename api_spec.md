# Cortex API Specification

**Version:** 1.0.0  
**Base URL:** `/api`  
**Description:** Engineering Thinking Training Platform API

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Tasks](#tasks)
4. [Responses](#responses)
5. [Progress](#progress)
6. [Thinking Drills](#thinking-drills)
7. [Admin](#admin)
8. [Data Models](#data-models)

---

## Authentication

Base Path: `/api/auth`

### 1. POST `/auth/signup`
**Description:** Register a new user account and receive JWT access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "selected_role": "Backend Engineer"
}
```

**Response:** `201 CREATED`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors:**
- `400 BAD REQUEST` - Email already registered

---

### 2. POST `/auth/login`
**Description:** Authenticate user with email and password, returns JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors:**
- `401 UNAUTHORIZED` - Incorrect email or password

---

### 3. GET `/auth/me`
**Description:** Get current authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "full_name": "John Doe",
  "selected_role": "Backend Engineer",
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2024-01-15T10:30:00Z"
}
```

---

## Users

Base Path: `/api/users`

### 1. GET `/users/profile`
**Description:** Get authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "full_name": "John Doe",
  "selected_role": "Backend Engineer",
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2024-01-15T10:30:00Z"
}
```

---

### 2. PUT `/users/profile`
**Description:** Update user profile (full name and/or selected role).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "John Smith",
  "selected_role": "Frontend Engineer"
}
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "full_name": "John Smith",
  "selected_role": "Frontend Engineer",
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `400 BAD REQUEST` - No fields to update

---

## Tasks

Base Path: `/api/tasks`

### 1. POST `/tasks`
**Description:** Create a new engineering task (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service like bit.ly...",
  "prompts": [
    "What assumptions are you making?",
    "How would you design the architecture?",
    "What are the key trade-offs?",
    "What could go wrong?"
  ]
}
```

**Response:** `201 CREATED`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service like bit.ly...",
  "prompts": [
    "What assumptions are you making?",
    "How would you design the architecture?",
    "What are the key trade-offs?",
    "What could go wrong?"
  ],
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 2. GET `/tasks`
**Description:** Get all tasks with optional filtering by role and difficulty.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `role` (optional): `Backend Engineer`, `Frontend Engineer`, `Systems Engineer`, `Data Engineer`
- `difficulty` (optional): `beginner`, `intermediate`, `advanced`

**Response:** `200 OK`
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Design a URL Shortener",
    "description": "Design a scalable URL shortening service",
    "role": "Backend Engineer",
    "difficulty": "intermediate",
    "estimated_time_minutes": 30,
    "scenario": "You are tasked with designing a URL shortening service...",
    "prompts": ["What assumptions are you making?", "..."],
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### 3. GET `/tasks/{task_id}`
**Description:** Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `task_id`: Task MongoDB ObjectId

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service...",
  "prompts": ["What assumptions are you making?", "..."],
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Errors:**
- `400 BAD REQUEST` - Invalid task ID
- `404 NOT FOUND` - Task not found

---

### 4. GET `/tasks/random/pick`
**Description:** Get a random task matching optional filters.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `role` (optional): Filter by engineering role
- `difficulty` (optional): Filter by difficulty level

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service...",
  "prompts": ["What assumptions are you making?", "..."],
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Errors:**
- `404 NOT FOUND` - No tasks found matching criteria

---

## Responses

Base Path: `/api/responses`

### 1. POST `/responses`
**Description:** Submit a response to an engineering task. Automatically calculates AI-powered scores across 5 dimensions.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "task_id": "507f1f77bcf86cd799439011",
  "assumptions": "I assume the system needs to handle 1M requests/day...",
  "architecture": "I would use a microservices architecture with...",
  "trade_offs": "The main trade-off is between consistency and availability...",
  "failure_scenarios": "Potential failures include database overload, network partitions..."
}
```

**Response:** `201 CREATED`
```json
{
  "id": "507f1f77bcf86cd799439012",
  "user_id": "507f1f77bcf86cd799439010",
  "task_id": "507f1f77bcf86cd799439011",
  "assumptions": "I assume the system needs to handle 1M requests/day...",
  "architecture": "I would use a microservices architecture with...",
  "trade_offs": "The main trade-off is between consistency and availability...",
  "failure_scenarios": "Potential failures include database overload...",
  "submitted_at": "2024-01-15T10:30:00Z",
  "score": 8.2,
  "score_breakdown": {
    "clarity": 8.5,
    "constraints_awareness": 7.8,
    "trade_off_reasoning": 8.0,
    "failure_anticipation": 8.5,
    "simplicity": 8.2
  },
  "ai_feedback": null,
  "ai_unlocked_at": null
}
```

**Errors:**
- `400 BAD REQUEST` - Invalid task ID
- `404 NOT FOUND` - Task not found

---

### 2. POST `/responses/{response_id}/feedback`
**Description:** Request AI feedback for a submitted response. Time-gated: must wait 5 minutes after submission.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `response_id`: Response MongoDB ObjectId

**Response:** `200 OK`
```json
{
  "message": "AI feedback generated successfully",
  "feedback": "Your response demonstrates strong architectural thinking. Here's detailed feedback:\n\n**Strengths:**\n- Clear assumptions about scale\n- Well-structured architecture\n\n**Areas for improvement:**\n- Consider additional failure modes like...",
  "unlocked_at": "2024-01-15T10:35:00Z"
}
```

**Errors:**
- `400 BAD REQUEST` - Invalid response ID
- `403 FORBIDDEN` - Not authorized to access this response
- `404 NOT FOUND` - Response not found
- `425 TOO EARLY` - AI feedback unlocks in X minutes

---

### 3. GET `/responses/user/history`
**Description:** Get all responses submitted by the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "user_id": "507f1f77bcf86cd799439010",
    "task_id": "507f1f77bcf86cd799439011",
    "assumptions": "I assume the system needs to handle 1M requests/day...",
    "architecture": "I would use a microservices architecture with...",
    "trade_offs": "The main trade-off is between consistency and availability...",
    "failure_scenarios": "Potential failures include database overload...",
    "submitted_at": "2024-01-15T10:30:00Z",
    "score": 8.2,
    "score_breakdown": {
      "clarity": 8.5,
      "constraints_awareness": 7.8,
      "trade_off_reasoning": 8.0,
      "failure_anticipation": 8.5,
      "simplicity": 8.2
    },
    "ai_feedback": "Your response demonstrates strong architectural thinking...",
    "ai_unlocked_at": "2024-01-15T10:35:00Z"
  }
]
```

---

### 4. GET `/responses/{response_id}`
**Description:** Get a specific response by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `response_id`: Response MongoDB ObjectId

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439012",
  "user_id": "507f1f77bcf86cd799439010",
  "task_id": "507f1f77bcf86cd799439011",
  "assumptions": "I assume the system needs to handle 1M requests/day...",
  "architecture": "I would use a microservices architecture with...",
  "trade_offs": "The main trade-off is between consistency and availability...",
  "failure_scenarios": "Potential failures include database overload...",
  "submitted_at": "2024-01-15T10:30:00Z",
  "score": 8.2,
  "score_breakdown": {
    "clarity": 8.5,
    "constraints_awareness": 7.8,
    "trade_off_reasoning": 8.0,
    "failure_anticipation": 8.5,
    "simplicity": 8.2
  },
  "ai_feedback": "Your response demonstrates strong architectural thinking...",
  "ai_unlocked_at": "2024-01-15T10:35:00Z"
}
```

**Errors:**
- `400 BAD REQUEST` - Invalid response ID
- `403 FORBIDDEN` - Not authorized to access this response
- `404 NOT FOUND` - Response not found

---

## Progress

Base Path: `/api/progress`

### 1. GET `/progress/stats`
**Description:** Get user's progress statistics including tasks completed, streaks, and scores.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "user_id": "507f1f77bcf86cd799439010",
  "total_tasks_completed": 15,
  "current_streak": 5,
  "longest_streak": 12,
  "last_activity_date": "2024-01-15",
  "total_score": 123.5,
  "average_score": 8.23
}
```

**Notes:**
- Creates initial progress record if user has none
- Automatically recalculates streaks to ensure accuracy
- Streak counts consecutive days with at least one task completed

---

## Thinking Drills

Base Path: `/api/drills`

### 1. POST `/drills`
**Description:** Create a new thinking drill (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": [
    "The database can handle 1000 QPS",
    "Users prefer fast responses",
    "The network is reliable",
    "All of the above"
  ],
  "correct_answer": "All of the above",
  "explanation": "All three statements are assumptions because they are unverified beliefs..."
}
```

**Response:** `201 CREATED`
```json
{
  "id": "507f1f77bcf86cd799439013",
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": [
    "The database can handle 1000 QPS",
    "Users prefer fast responses",
    "The network is reliable",
    "All of the above"
  ],
  "correct_answer": "All of the above",
  "explanation": "All three statements are assumptions...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 2. GET `/drills/random`
**Description:** Get a random thinking drill that the user hasn't answered yet.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `drill_type` (optional): `spot_assumptions`, `rank_failures`, `predict_scaling`, `choose_tradeoffs`

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439013",
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": [
    "The database can handle 1000 QPS",
    "Users prefer fast responses",
    "The network is reliable",
    "All of the above"
  ],
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Notes:**
- Does NOT include the correct answer in response
- Excludes drills the user has already answered
- Uses MongoDB aggregation for random selection

**Errors:**
- `404 NOT FOUND` - No unanswered drills found

---

### 3. POST `/drills/submit`
**Description:** Submit an answer to a thinking drill.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "drill_id": "507f1f77bcf86cd799439013",
  "user_answer": "All of the above"
}
```

**Response:** `200 OK`
```json
{
  "is_correct": true,
  "explanation": "All three statements are assumptions because they are unverified beliefs about the system...",
  "user_answer": "All of the above",
  "correct_answer": "All of the above"
}
```

**Errors:**
- `400 BAD REQUEST` - Invalid drill ID
- `404 NOT FOUND` - Drill not found

---

### 4. GET `/drills/history`
**Description:** Get user's drill submission history (last 50 submissions).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": "507f1f77bcf86cd799439014",
    "drill_title": "Spot the Assumption",
    "drill_type": "spot_assumptions",
    "user_answer": "All of the above",
    "is_correct": true,
    "submitted_at": "2024-01-15T10:30:00Z"
  }
]
```

---

### 5. GET `/drills/stats`
**Description:** Get user's drill statistics by type.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "total_attempted": 25,
  "total_correct": 20,
  "accuracy": 80.0,
  "by_type": {
    "spot_assumptions": {
      "attempted": 10,
      "correct": 8,
      "accuracy": 80.0
    },
    "rank_failures": {
      "attempted": 8,
      "correct": 7,
      "accuracy": 87.5
    },
    "predict_scaling": {
      "attempted": 7,
      "correct": 5,
      "accuracy": 71.43
    }
  }
}
```

---

## Admin

Base Path: `/api/admin`

**Note:** All admin endpoints require admin privileges.

### 1. POST `/admin/tasks/generate`
**Description:** Generate a task using AI and save to database.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `role`: `Backend Engineer`, `Frontend Engineer`, `Systems Engineer`, `Data Engineer`
- `difficulty`: `beginner`, `intermediate`, `advanced`

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service...",
  "prompts": ["What assumptions are you making?", "..."],
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 2. POST `/admin/drills/generate`
**Description:** Generate a drill using AI and save to database.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `drill_type`: `spot_assumptions`, `rank_failures`, `predict_scaling`, `choose_tradeoffs`

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439013",
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": ["...", "..."],
  "correct_answer": "All of the above",
  "explanation": "All three statements are assumptions...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 3. POST `/admin/tasks/generate-daily`
**Description:** Generate daily tasks for all roles using AI.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "message": "Successfully generated 4 daily tasks",
  "task_ids": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013",
    "507f1f77bcf86cd799439014"
  ],
  "roles": [
    "Backend Engineer",
    "Frontend Engineer",
    "Systems Engineer",
    "Data Engineer"
  ]
}
```

**Notes:**
- Can be called manually or by cron job
- Generates one task per role

---

### 4. POST `/admin/tasks/manual`
**Description:** Create a task manually without AI.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service...",
  "prompts": [
    "What assumptions are you making?",
    "How would you design the architecture?",
    "What are the key trade-offs?",
    "What could go wrong?"
  ]
}
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Design a URL Shortener",
  "description": "Design a scalable URL shortening service",
  "role": "Backend Engineer",
  "difficulty": "intermediate",
  "estimated_time_minutes": 30,
  "scenario": "You are tasked with designing a URL shortening service...",
  "prompts": ["What assumptions are you making?", "..."],
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 5. POST `/admin/drills/manual`
**Description:** Create a drill manually without AI.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": ["Option 1", "Option 2", "Option 3", "All of the above"],
  "correct_answer": "All of the above",
  "explanation": "All three statements are assumptions..."
}
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439013",
  "title": "Spot the Assumption",
  "drill_type": "spot_assumptions",
  "question": "Which of the following is an assumption in this scenario?",
  "options": ["Option 1", "Option 2", "Option 3", "All of the above"],
  "correct_answer": "All of the above",
  "explanation": "All three statements are assumptions...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### 6. GET `/admin/stats`
**Description:** Get platform-wide statistics.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "total_users": 150,
  "total_tasks": 45,
  "total_drills": 60,
  "total_responses": 1250
}
```

---

## Data Models

### User
```typescript
{
  id: string;                      // MongoDB ObjectId
  email: string;                   // Email address
  full_name: string;               // Full name
  selected_role: string | null;   // Engineering role
  created_at: datetime;            // Account creation date
  last_login: datetime | null;    // Last login timestamp
}
```

### Task
```typescript
{
  id: string;                      // MongoDB ObjectId
  title: string;                   // Task title
  description: string;             // Short description
  role: Role;                      // Engineering role enum
  difficulty: Difficulty;          // Difficulty enum
  estimated_time_minutes: number;  // Estimated completion time
  scenario: string;                // Detailed scenario description
  prompts: string[];               // Guiding questions
  created_at: datetime;            // Task creation date
}
```

### Response
```typescript
{
  id: string;                      // MongoDB ObjectId
  user_id: string;                 // User who submitted
  task_id: string;                 // Task reference
  assumptions: string;             // User's assumptions
  architecture: string;            // Architectural design
  trade_offs: string;              // Trade-off analysis
  failure_scenarios: string;       // Failure scenarios
  submitted_at: datetime;          // Submission timestamp
  score: number | null;            // Total score (0-10)
  score_breakdown: {               // Scores by dimension
    clarity: number;               // 0-10
    constraints_awareness: number; // 0-10
    trade_off_reasoning: number;   // 0-10
    failure_anticipation: number;  // 0-10
    simplicity: number;            // 0-10
  } | null;
  ai_feedback: string | null;      // AI-generated feedback
  ai_unlocked_at: datetime | null; // When feedback was unlocked
}
```

### Drill
```typescript
{
  id: string;                      // MongoDB ObjectId
  title: string;                   // Drill title
  drill_type: DrillType;           // Type enum
  question: string;                // Question text
  options: string[];               // Answer options
  correct_answer: string;          // Correct option
  explanation: string;             // Explanation of answer
  created_at: datetime;            // Drill creation date
}
```

### Progress
```typescript
{
  user_id: string;                 // User reference
  total_tasks_completed: number;   // Total tasks finished
  current_streak: number;          // Current daily streak
  longest_streak: number;          // Longest ever streak
  last_activity_date: date | null; // Last activity date
  total_score: number;             // Sum of all scores
  average_score: number;           // Average score
}
```

### Enums

**Role:**
- `Backend Engineer`
- `Frontend Engineer`
- `Systems Engineer`
- `Data Engineer`

**Difficulty:**
- `beginner`
- `intermediate`
- `advanced`

**DrillType:**
- `spot_assumptions` - Identify assumptions
- `rank_failures` - Rank failure modes by likelihood
- `predict_scaling` - Predict scaling bottlenecks
- `choose_tradeoffs` - Choose best trade-offs

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "detail": "Invalid request parameters or data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

### 425 Too Early
```json
{
  "detail": "AI feedback unlocks in X minutes"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained through the `/auth/signup` or `/auth/login` endpoints and are valid for the duration specified in the server configuration (default: configurable via settings).

---

## Rate Limiting

Currently, no rate limiting is enforced, but it may be added in future versions.

---

## CORS

CORS is configured to allow all origins in development. This should be restricted in production environments.

---

## Cron Jobs

The application includes automated cron jobs:

### Daily Task Generation
- **Schedule:** Runs daily at midnight
- **Function:** Automatically generates new tasks for all roles
- **Endpoint:** Can be manually triggered via `/api/admin/tasks/generate-daily`

Cron management endpoints are available at `/api/crons` (requires appropriate permissions).
