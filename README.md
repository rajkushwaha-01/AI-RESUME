# AI Resume

AI Resume is a Node.js and Express backend for generating interview preparation reports from a candidate resume, self description, and job description. It also supports generating a tailored resume PDF from an existing interview report.

## Features

- User registration, login, logout, and profile lookup
- Cookie-based JWT authentication
- PDF resume upload and parsing
- AI-generated interview report using Google GenAI
- Technical and behavioral interview questions
- Skill gap analysis and preparation plan
- Tailored resume PDF generation with Puppeteer
- MongoDB persistence with Mongoose

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- Google GenAI
- JWT authentication
- Multer
- pdf-parse
- Puppeteer
- Zod

## Project Structure

```text
.
|-- server.js
|-- package.json
`-- src
    |-- app.js
    |-- DB
    |   `-- db.js
    |-- controllers
    |   |-- auth.controller.js
    |   `-- interview.controller.js
    |-- middleware
    |   |-- auth.middleware.js
    |   `-- file.middleware.js
    |-- models
    |   |-- blacklist.model.js
    |   |-- interviewReport.model.js
    |   `-- user.model.js
    |-- routes
    |   |-- auth.route.js
    |   `-- interview.routes.js
    `-- services
        `-- ai.service.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Google GenAI API key

### Installation

```bash
npm install
```

The postinstall script installs the Chrome browser required by Puppeteer.

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
NODE_ENV=development
```

### Run the Server

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

## API Routes

### Auth

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login a user | Public |
| POST | `/api/auth/logout` | Logout the current user | Public |
| GET | `/api/auth/get-me` | Get logged-in user details | Private |

### Interview

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/interview` | Generate an interview report | Private |
| GET | `/api/interview` | Get all reports for the logged-in user | Private |
| GET | `/api/interview/report/:interviewId` | Get a report by ID | Private |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate a tailored resume PDF | Private |

## Generate Interview Report Request

Send a `multipart/form-data` request to:

```text
POST /api/interview
```

Fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resume` | File | Yes | PDF resume file, maximum 3 MB |
| `selfDescription` | Text | Yes | Candidate self description |
| `jobDescription` | Text | Yes | Job description to compare against |

The request requires an authenticated cookie named `token`.

## CORS

The backend currently allows requests from:

- `http://localhost:5173`
- `https://frontend-ai-resume.vercel.app`

## Notes

- Authentication uses an HTTP-only cookie named `token`.
- The JWT expires after 7 days.
- Resume files are stored in memory during upload and parsed immediately.
- Generated PDF resumes are returned as downloadable PDF responses.
