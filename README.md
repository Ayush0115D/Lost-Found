# 🚇 Delhi Metro Lost & Found Portal

<div align="center">
  <img src="https://img.shields.io/badge/React-18+-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Node.js-16+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg" alt="MongoDB">
</div>

A full-stack web application to report and find lost items on the Delhi Metro. Built with React, Node.js, Express, MongoDB, and JWT authentication.

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login/register
- 📝 **Report Items** - Submit lost or found item reports
- 🔍 **Smart Search** - Filter by name, category, and date
- 📍 **Metro Integration** - Tag items by specific metro lines and stations
- 👨‍💼 **Admin Dashboard** - Manage reports and users
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)  

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Ayush0115D/Lost-Found.git
cd Lost-Found
```

### 2. Setup Backend
```bash
cd dmrc-backend
npm install
# Create .env file with MongoDB URI and JWT_SECRET
npm run dev
```

### 3. Setup Frontend
```bash
cd ..
npm install
npm run dev
```

Open `http://localhost:3000` in your browser!

## 📁 Project Structure

```
Lost-Found/
├── 📂 dmrc-backend/              # Express.js Backend Server
│   ├── 📂 config/                # Configuration files
│   ├── 📂 middleware/            # Custom middleware functions
│   ├── 📂 models/                # Mongoose data models
│   ├── 📂 routes/                # API route handlers
│   ├── 📄 .env                   # Environment variables
│   ├── 📄 server.js              # Main server entry point
│   └── 📄 package.json           # Backend dependencies
│
├── 📂 src/                       # React Frontend Application
│   ├── 📂 components/            # Reusable UI components
│   ├── 📂 pages/                 # Main application pages
│   ├── 📂 context/               # React Context providers
│   ├── 📂 utils/                 # Utility functions and helpers
│   ├── 📄 App.jsx                # Main App component
│   ├── 📄 main.jsx               # React DOM root
│   └── 📄 index.css              # Global CSS styles
│
├── 📂 public/                    # Static assets
├── 📄 .env                       # Frontend environment variables
├── 📄 package.json               # Frontend dependencies
├── 📄 vite.config.js             # Vite configuration
└── 📄 README.md                  # Project documentation
```

## 👥 User Roles

**Regular Users:** Register, report items, search listings  
**Admins:** Access dashboard, manage all reports and users

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

**Made with ❤️ by [Ayush Kumar](https://github.com/Ayush0115D)**

⭐ **Star this repo if you found it helpful!**
