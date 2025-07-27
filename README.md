# 🚇 Lost & Found – Delhi Metro

A full-stack React + Vite web application to report and find lost items on the Delhi Metro. Users can securely report lost/found items, view others' reports, and admins can manage the platform via a dedicated dashboard.

> Built with ❤️ using React, Node.js, Express, MongoDB, and JWT.

---

## 📸 Demo

![App Screenshot](./screenshot.png) <!-- Replace with your own screenshot -->

Live Demo: [Coming Soon](#)  
Backend Repo (if separate): [Coming Soon](#)

---

## 🧩 Features

- 🔐 **User Authentication (JWT-based login/register)**
- 📥 Submit a report for lost or found items
- 🔍 Search and filter reports
- 📍 Metro line & station tagging
- 🖼️ Upload item images *(coming soon)*
- 🛠️ **Admin Dashboard** for managing reports and users
- 🗃️ MongoDB for persistent storage

---

## 🛠️ Tech Stack

### Frontend:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) *(if used)*

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/) for authentication

---

## 📁 Project Structure
```text
Lost-Found/
├── dmrc-backend/ # Express backend with MongoDB + JWT
│ ├── routes/ # Auth, user, item APIs
│ ├── middleware/ # Auth middleware
│ └── models/ # User & Item schemas
├── src/ # React frontend
│ ├── components/ # Reusable UI
│ ├── pages/ # Home, Login, Dashboard, Auth state management etc.
├── public/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/Ayush0115D/Lost-Found.git
cd Lost-

### 2. Start the Backend

cd dmrc-backend
npm install
npm run dev

3. Start the Frontend
cd ..
npm install
npm run dev

---

👥 User Roles

    Regular User:

        Register / login

        Report lost/found items

        View other users' reports

    Admin:

        Access protected Admin Dashboard

        View & manage all reports

        Remove spam/inappropriate entries

        Manage users (if implemented

---

🤝 Contributing

Pull requests are welcome! Open an issue first to suggest major changes.
