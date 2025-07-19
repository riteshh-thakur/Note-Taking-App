# 📝 Note-Taking App (MERN + TypeScript)

**A full-stack, type-safe note-taking application built with MongoDB, Express.js, React, and Node.js, all powered by TypeScript.**

This project provides a robust and scalable platform for creating, managing, and organizing your notes. It features a secure backend API, a dynamic responsive frontend, and speech-to-text capabilities, demonstrating a modern full-stack development workflow.



## 🌟 Key Features

* **Full CRUD Functionality:** Create, read, update, and delete notes with ease.
* **🎤 Speech-to-Text:** Dictate your notes directly into the editor using your microphone, powered by the Web Speech API.
* **Type-Safe Codebase:** TypeScript is used across the entire stack (frontend and backend) for enhanced reliability and developer experience.
* **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
* **Rich Text Editing:** (Optional: if you have a rich text editor) A modern text editor to format notes with headings, lists, bolding, and more.
* **Responsive Design:** A clean and intuitive user interface that works seamlessly on all devices.
* **RESTful API:** A well-structured backend API built with Express and Node.js.

---

## 🛠️ Tech Stack

This project is built with the MERN stack and fully typed with TypeScript.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Web Speech API](https://img.shields.io/badge/Web_Speech_API-F8991D?style=for-the-badge&logo=google-chrome&logoColor=white)

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or later) & npm
* [TypeScript](https://www.typescriptlang.org/download) (`npm install -g typescript`)
* [MongoDB](https://www.mongodb.com/try/download/community) installed and running.

---

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/riteshh-thakur/Note-Taking-App.git](https://github.com/riteshh-thakur/Note-Taking-App.git)
    cd Note-Taking-App
    ```

2.  **Set up the Backend Server:**
    Navigate to the `server` directory and install dependencies.
    ```sh
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and add the necessary environment variables.
    ```env
    # .env.example
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/note-taking-app
    JWT_SECRET=a-very-strong-and-secret-key
    ```
    Start the backend server. This command will typically compile the TypeScript code and run the resulting JavaScript.
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

3.  **Set up the Frontend Client:**
    Open a new terminal window, navigate to the `client` directory, and install dependencies.
    ```sh
    cd client
    npm install
    ```
    Start the React development server.
    ```sh
    npm start
    ```
    Your application should now be running on `http://localhost:3000`.

---

## 📁 Project Structure

This repository follows a standard MERN stack project structure.


.
├── client/         # React Frontend (TypeScript)
│   ├── public/
│   └── src/
│
└── server/         # Node.js Backend (TypeScript)
├── src/
│   ├── models/
│   ├── routes/
│   └── server.ts
└── tsconfig.json


---

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AddNoteTagging`)
3.  Commit your Changes (`git commit -m 'feat: Add note tagging feature'`)
4.  Push to the Branch (`git push origin feature/AddNoteTagging`)
5.  Open a Pull Request


<p align="center">
  Built with ❤️ by Ritesh Thakur
</p>
