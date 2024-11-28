# Kanban Task Management System

This is the server-side implementation of a Kanban-style task management system, developed using Node.js, Express, WebSocket (socket.io), and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration, login)
- Project management (creation, listing, user invitation)
- Task management (creation, updating, deletion)
- Real-time updates via WebSocket
- Task change history
- Kanban board with customizable columns

## Tech Stack

- Node.js (v14+)
- Express.js (v4.17+)
- TypeScript (v4.4+)
- MongoDB (v4.4+) with Mongoose ORM
- Socket.io (v4.3+) for WebSocket
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or higher) installed
- MongoDB (version 4.4 or higher) installed locally or access to a MongoDB cloud service
- npm (usually comes with Node.js) or yarn package manager
- Git for version control

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/bellzar7/test-task-api-kanban.git
   cd test-task-api-kanban. \`\`\`
2. Install dependencies:  \`\`\`npm install. \`\`\`
3. Configure environment variables (see [Configuration](#configuration)).
4. Start the server:  \`\`\`npm start \`\`\`
  


## Configuration
To configure the application, create a .env file in the root directory with the following variables
PORT=3000
MONGO_URI=mongodb://localhost:27017/kanban
JWT_SECRET=your_jwt_secret
## Database

This project uses MongoDB as its database. To get started, ensure that MongoDB is installed and running locally or accessible via a cloud service.

1. Create a new database named `kanban_db`.
2. Update the `MONGO_URI` in the `.env` file with the connection string for your MongoDB instance. Example:

   ```env
   MONGO_URI=mongodb://localhost:27017/kanban_db


## Running the Server
- Start the server in development mode:
  \`\`\`npm run dev\`\`\`
- For production:
  \`\`\`npm start\`\`\`

## API Endpoints
1. User Management 
   - Register a New User:
     - Method: POST
     - URL: /api/users/register
     - Body (JSON):
       - {
       "login": "user@example.com",
       "password": "password123",
       "name": "John Doe"
       }
       
   - User Login:
     - Method: POST
     - URL: /api/users/login
     - Body (JSON):
      - {
        "login": "user@example.com",
        "password": "password123"
        }
2. Project Management
   - Create a Project
     - Method: POST
     - URL: /api/projects
     - Headers:
       - {
         "Authorization": "Bearer <token>"
         }
     - Body (JSON):
         - {
           "name": "My Kanban Project"
           }
3. Task Management
   - Create a Task
      - Method: POST
      -  URL: /api/projects/<project_id>/tasks
      -  Headers:
         - {
           "Authorization": "Bearer <token>"
           }
      - Body (JSON):
         - {
           "name": "Implement login feature",
           "description": "Create a login form and integrate with backend API"
           }
   - Update a Task
     - Method: PUT
      -  URL: /api/projects/<project_id>/tasks/<task_id>
      -  Headers:
         - {
           "Authorization": "Bearer <token>"
           }
      - Body (JSON):
         - {
           "status": "In Progress"
           }


## WebSocket Events
This application uses WebSocket (via Socket.io) for real-time updates. Some key events include:

- taskCreated: Emitted when a new task is created.
- taskUpdated: Emitted when a task is updated.
- taskDeleted: Emitted when a task is deleted.
- projectCreated: Emitted when a new project is created.
- userJoinedProject: Emitted when a user is added to a project.
## Project Structure
test-task-api-kanban/<br/>
├── src/ # Main application code <br/>
│ ├── config/ # Configuration files (e.g., database connection) <br/>
│ │ └── database.ts <br/>
│ ├── controllers/ # Controllers for handling API requests <br/>
│ │ ├── projectController.ts <br/>
│ │ ├── taskController.ts <br/>
│ │ └── userController.ts <br/>
│ ├── middleware/ # Middleware (e.g., authentication) <br/>
│ │ └── auth.ts <br/>
│ ├── models/ # Mongoose models <br/>
│ │ ├── Project.ts <br/>
│ │ ├── Task.ts <br/>
│ │ └── User.ts <br/>
│ ├── routes/ # API routes <br/>
│ │ ├── projectRoutes.ts <br/>
│ │ ├── taskRoutes.ts <br/>
│ │ └── userRoutes.ts <br/>
│ ├── services/ # Services with application logic <br/>
│ │ ├── projectService.ts <br/>
│ │ ├── taskService.ts <br/>
│ │ ├── userService.ts <br/>
│ │ └── websocket.ts <br/>
│ └── server.ts # Entry point of the server
## Testing
You can use tools like Postman or Insomnia for testing the API. The Postman collection is available in the project:
./testTaskCanban.postman_collection.json

## Deployment
To deploy the application, you can use platforms like Heroku, DigitalOcean, or AWS. Make sure to configure environment variables (e.g., MONGO_URI, JWT_SECRET) in your hosting provider.

## Contributing
We welcome contributions to this project. To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit them (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-name).
- Open a pull request.
## License

Project Link: [https://github.com/bellzar7/test-task-api-kanban](https://github.com/bellzar7/test-task-api-kanban)

