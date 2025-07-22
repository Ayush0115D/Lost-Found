# 🧳 DMRC Lost & Found Portal

A modern and user-friendly Lost & Found web application for the **Delhi Metro Rail Corporation (DMRC)**. Built with the **MERN stack**, this portal helps users report, find, and claim lost items easily.

---

## 🚀 Features

- 🎫 **Lost & Found Reporting Forms**
  - Metro line and station selection via searchable dropdowns
  - Image upload with drag & drop
  - Clean, step-wise UI for better UX

- 🔍 **Verification & Claim Page**
  - OTP-based (simulated) verification
  - Upload ID proof and notes for item recovery

- 🛡️ **Authentication**
  - Secure login & signup
  - Role-based access for users and admins

- 🗺️ **Metro Network Map + UI Highlights**
  - Custom Metro Cards & Feature Cards
  - Smooth animations using AOS/Framer Motion

---

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS
- React Router
- Lucide-react (icons)
- React-select (dropdowns)

**Backend:**
- Express.js
- SQL (MySQL/PostgreSQL)
- JWT-based Authentication

---

## 📁 Project Structure
src/
├── components/
│ ├── LostForm.jsx, FoundForm.jsx
│ ├── VerificationCard.jsx, FeatureCard.jsx
│ ├── MetroNetworkCard.jsx, Header.jsx, Footer.jsx
├── pages/
│ ├── Home.jsx, Report.jsx, Verify.jsx
├── backend/
│ ├── routes/, controllers/, models/
│ └── auth/, db/

---

## ⚙️ Setup Instructions

1. **Clone the repo**  
   `git clone https://github.com/yourusername/dmrc-lost-found.git`

2. **Install dependencies**
3.  cd client # React frontend
npm install

cd ../server # Express backend
npm install

4. **Run the app**
