# Visitor Management Mini System

A responsive React Admin Dashboard for managing visitor requests.

This project was developed as a practical coding assignment using React, TypeScript, Axios, Redux Toolkit, Material UI, and a mock REST API.

---

## Features

- Admin Login
- Visitor List
- Add Visitor
- Approve Visitor
- Reject Visitor
- Delete Visitor
- Delete Confirmation Dialog
- Form Validation
- Loading States
- Error Handling
- Success Notifications
- Responsive UI
- Redux Toolkit State Management
- Axios API Integration
- Mock REST API
- Unit Testing

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Material UI
- Redux Toolkit
- Axios
- React Hook Form
- Zod

### Testing

- Vitest
- React Testing Library
- Jest DOM

### Mock API

- JSON Server
- Custom Node.js mock server

---

## Project Structure

```text
frontend/
│
├── mock/
│   ├── db.json
│   └── server.cjs
│
├── src/
│   ├── api/
│   │   ├── axios.ts
│   │   ├── authApi.ts
│   │   └── visitorApi.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── visitors/
│   │
│   ├── pages/
│   │   ├── Login/
│   │   └── Visitors/
│   │
│   ├── redux/
│   │   ├── store.ts
│   │   └── slices/
│   │
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── testSetup.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── tests/
│   └── Login.test.tsx
│
├── docs/
│   ├── TEST_CASES.md
│   ├── ARCHITECTURE.md
│   └── ASSUMPTIONS.md
│
└── screenshots/

