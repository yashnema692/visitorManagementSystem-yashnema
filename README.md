# Visitor Management System

This is a small Visitor Management System built as part of a frontend assignment.

The main purpose of this project is to manage visitor requests. An admin can log in, see all visitors, add a new visitor, approve or reject visitor requests, and delete visitors.

There is no real backend in this project. I created a small mock API using JSON Server so that the frontend works with APIs in a real-project-like way.

## Features

- Admin login
- Visitor list
- Add new visitor
- Approve visitor
- Reject visitor
- Delete visitor
- Form validation
- Loading states
- Error messages
- Success/error notifications
- Delete confirmation dialog
- Responsive UI
- Redux Toolkit for state management
- Axios for API calls
- TypeScript
- Material UI

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Axios
- Material UI
- React Router
- JSON Server
- Vitest
- React Testing Library
- Vite

## Project Structure

```text
visitor-management-system/
│
└── frontend/
    │
    ├── mock/
    │   ├── db.json
    │   └── server.cjs
    │
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   ├── routes/
    │   ├── types/
    │   ├── utils/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    │
    ├── tests/
    │   └── Login.test.tsx
    │
    ├── package.json
    └── vite.config.ts

    How to Run the Project

First, open the project folder in VS Code.

Then install all dependencies:

npm install
1. Start the Mock API

Open one terminal and run:

npm run server

The mock API will start on:

http://localhost:5000
2. Start the Frontend

Open another terminal and run:

npm run dev

The frontend will normally start on:

http://localhost:5173

Open the URL in your browser.

Login Details

For testing, I have added a dummy admin user.

Email:

admin@example.com

Password:

admin123
Mock API

The project uses a local JSON file as the database.

The file is:

mock/db.json

The mock server is:

mock/server.cjs

The frontend communicates with this server using Axios.

API Endpoints
Login
POST /auth/login
Get Visitors
GET /visitors
Get Single Visitor
GET /visitors/:id
Add Visitor
POST /visitors
Update Visitor
PUT /visitors/:id
Delete Visitor
DELETE /visitors/:id
Approve Visitor
PATCH /visitors/:id/approve
Reject Visitor
PATCH /visitors/:id/reject
How the Application Works

After login, the user is taken to the Visitor List page.

From there, the admin can see visitor information such as:

Name
Phone
Unit
Visit Date
Status

There are also actions for each visitor.

The admin can:

Approve a pending visitor
Reject a pending visitor
Delete a visitor

There is also an Add Visitor page where a new visitor can be created.

State Management

I used Redux Toolkit to manage application state.

There are separate slices for:

Authentication
Visitors

This keeps the application state organized and makes it easier to update the UI when visitor data changes.

API Handling

Axios is used for communication between the React frontend and the mock API.

I kept the API calls separate from the UI components so that the components mainly handle the UI and user interaction.

Validation

The visitor form validates the required fields before submitting.

For example:

Name cannot be empty
Phone number should be valid
Unit number is required
Visit date is required

If there is a validation error, the user gets an appropriate message.

Error Handling

The application handles common errors such as:

Invalid login
API errors
Visitor not found
Failed visitor operations

Error messages are displayed to the user instead of silently failing.

Loading State

Loading indicators are shown while API operations are running.

This helps the user understand that the application is processing the request.

Testing

I added automated testing using Vitest and React Testing Library.

Currently, the project includes a test for the Login page to check that:

Email field is displayed
Password field is displayed
Login button is displayed

Run the tests using:

npm test -- --run
Production Build

To create a production build, run:

npm run build

The production files will be generated in the dist folder.
