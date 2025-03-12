## Project Overview

The To-Do App is a task management tool that allows users to create, update, categorise, and archive tasks efficiently. Built with a RESTful API and a responsive frontend, the app ensures a seamless user experience and robust backend operations.

### This project demonstrates:

- **Full stack development** (React + Spring Boot + MySQL)
- **State management** in react using the **Context API**
- **Database integration** using **Spring Data JPA**
- **Error handling and validations** in the backend and frontend
- **Secure API endpoints** with request validation
- **RESTful API design** with structured **DTOs and repositories**
- **Unit testing** for key functionalities

---

## Tech Stack

### Frontend

- **React (Typescript)** - For building a dynamic UI
- **React Hook Form** - For form validation
- **Context API** - For managing global state
- **SCSS (Modules)** - For component-based styling
- **Fetch API** - For making API requests

### Backend

- **Spring Boot (Java 21)** - For creating the API
- **Spring Data JPA** - For database interaction
- **Spring Validation** - For request validation
- **Exception Handling** - Customer error responses
- **Mockito & JUnit** - For unit testing

### Database

- **MySQL** - Stores user tasks and categories
- **Hibernate (JPA)** - Manages entity relationships

---

## Features

### Task management

- Create, update, and archive tasks
- Set tasks as completed
- Categorised tasks for better organisation

### Category-based filtering

- Filter tasks based on category
- Dropdown selector to view tasks by category
- Prevent deletion of categories linked to tasks

### Error handling and validations

- Frontend validation using React Hook Form
- Backend validation for empty fields and duplicates
- Custom error messages for failed operations

### Robust backend

- Spring Boot REST API
- DTOs and Service Layer for clean architecture
- Exception handling with structured error responses

---

## Project Setup

### 1. Clone the repository

```bash
git clone git@github.com:shirdheen/nology-todo-app.git
```

### 2. Create a .env file

```properties
DB_NAME=todos_db
MYSQL_USER=root
MYSQL_PASS=your_password
```

### 3. Build and run backend

```bash
mvn clean install
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

### 4. Install dependencies for frontend

```bash
cd todo-app-frontend
npm install
```

### 5. Start React App

```bash
npm run dev
```

Client runs at **http://localhost:5173**

---

## API Endpoints

### Tasks API

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | /todos                 | Fetch all todos              |
| POST   | /todos                 | Create a new task            |
| PUT    | /todos/{id}            | Update a task                |
| DELETE | /todos/{id}            | Archive a task (soft-delete) |
| GET    | /todos?categoryId={id} | Fetch todos by category      |

### Categories API

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | /categories      | Fetch all categories             |
| POST   | /categories      | Create a new category            |
| PUT    | /categories/{id} | Update category                  |
| DELETE | /categories/{id} | Delete category (only if unused) |
