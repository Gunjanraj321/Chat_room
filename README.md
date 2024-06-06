# Chat Application Backend

## Overview

This is the backend for a chat application built with Node.js, Express, Sequelize, and MySQL. It supports user authentication, friend requests, chat room management, and real-time messaging using WebSockets.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (>=14.x)
- npm (>=6.x)
- MySQL database

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login a user

### User Profile

- **GET /api/profile**: Get user profile (requires authentication)
- **PUT /api/profile**: Update user profile (requires authentication)

### Friend Requests

- **POST /api/friend-requests**: Send a friend request (requires authentication)
- **GET /api/friend-requests**: Get incoming friend requests (requires authentication)
- **PATCH /api/friend-requests/:id/accept**: Accept a friend request (requires authentication)
- **DELETE /api/friend-requests/:id/deny**: Deny a friend request (requires authentication)


### Real-Time Messaging

The real-time messaging is handled via WebSockets. Connect to the WebSocket server at `ws://localhost:3001`.

### WebSocket Events

- **joinRoom**: Join a chat room
  - Payload: `{ roomId }`
- **sendMessage**: Send a message to a chat room
  - Payload: `{ userId, roomId, message }`
- **receiveMessage**: Receive a message from a chat room
  - Payload: `{ userId, message, timestamp }`

