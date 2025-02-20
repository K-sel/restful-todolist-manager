# Multi-User Todo Application
## Demo login
**mail** : ksel@demo.com

**pwd** : 12345

## Intro
This front-end Todo application allows multiple users to manage their tasks online via a REST API. The project was designed to deepen web programming skills, emphasizing asynchronous programming, secure client-server exchanges, and development best practices.

## Key Features

- **Secure registration and authentication via JWT**
- **Add, view, and delete tasks**
- **Handle HTTP requests with `async/await`**
- **Adherence to RESTful principles for network communication**

## Learning Objectives

- Understand and apply asynchronous programming concepts in JavaScript
- Interact with REST APIs using HTTP requests (GET, POST, DELETE)
- Manage secure operations with JSON Web Tokens (JWT)
- Create responsive user interfaces for interactive web applications
- Strengthen skills in error handling and code optimization

## Technologies Used

- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Fetch API**
- **JSON for data exchange**
- **Postman for API request testing**

## API Used

The application interacts with a REST API available at:

https://progweb-todo-api.onrender.com


### Main Endpoints

- **POST** `/auth/register`: Register users
- **POST** `/auth/login`: Log in users
- **GET** `/todos`: Retrieve the task list
- **POST** `/todos`: Create a new task
- **DELETE** `/todos/:id`: Delete a task

## User Guide

1. **Registration and Login:**
   - Create an account with an email and password.
   - Log in to access your tasks.

2. **Task Management:**
   - Add new tasks using the dedicated form.
   - View tasks already created.
   - Delete outdated tasks.

## Technical Highlights

- **Simplified Asynchronous Operations with `async/await`:** Ensures smooth handling of network requests.
- **JWT for Security:** Provides secure authentication and maintains user data confidentiality.
- **REST Standards Compliance:** Ensures structured and consistent exchanges between client and server.

## Additional Resources

- [API Documentation (Swagger)](https://progweb-todo-api.onrender.com/swagger)
- [REST Architecture Principles](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [JSON Web Tokens (JWT) Guide](https://jwt.io/)

---

## Contributions

Contributions are welcome! Feel free to open issues or propose pull requests to improve this project.
