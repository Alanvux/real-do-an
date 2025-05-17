# E-Learning Platform

A comprehensive e-learning platform with AI-powered learning assistance.

## Features

- User authentication and authorization (Student, Teacher, Admin roles)
- Course management system
- Lecture content delivery
- Assignment submission and grading
- AI-powered learning assistant
- Quiz generation
- Key concept extraction
- Automated assignment feedback
- Messaging between users
- Responsive UI for all devices

## Technology Stack

### Backend
- Node.js with TypeScript
- Express.js for RESTful API
- PostgreSQL for database
- Redis for caching and session management
- JSON Web Tokens (JWT) for authentication
- OpenAI API for AI features
- Winston for logging

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- TailwindCSS for styling
- Axios for API communication
- React Hook Form for form handling

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/e-learning-platform.git
cd e-learning-platform
```

2. Set up environment variables
```bash
# Copy the example .env file for backend
cp backend/.env.example backend/.env
# Update the OpenAI API key and other variables as needed
```

3. Start the application with Docker Compose
```bash
docker-compose up -d
```

4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Project Structure

```
├── backend/               # Backend code
│   ├── src/               # Source code
│   │   ├── config/        # Application configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── db/            # Database connection
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── uploads/           # File uploads
│   └── logs/              # Application logs
├── database/              # Database initialization scripts
│   ├── 01-init.sql        # Schema creation
│   └── 02-init.sql        # Seed data
├── frontend/              # Frontend code
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # Reusable components
│       ├── layouts/       # Page layouts
│       ├── pages/         # Application pages
│       ├── redux/         # State management
│       ├── services/      # API services
│       └── utils/         # Utility functions
└── docker-compose.yml     # Docker configuration
```

## API Documentation

The API documentation is available at `/api/docs` endpoint when the application is running.

## AI Features

This platform integrates OpenAI to provide intelligent learning assistance:

- **AI Chat**: Students can ask questions about course content
- **Quiz Generation**: Teachers can generate quizzes from lecture content
- **Concept Extraction**: Automatically identify key concepts from lectures
- **Assignment Feedback**: AI-assisted feedback on student submissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.