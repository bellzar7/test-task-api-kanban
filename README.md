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

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (with Mongoose ORM)
- Socket.io for WebSocket
- JSON Web Tokens (JWT) for authentication

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (locally installed or access to a cloud service)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
