# 🗂️ Employee Leave Management System 🚀

![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express.js-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJavaScript-yellow)
![UI](https://img.shields.io/badge/UI-Modern%20Design-pink)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

A modern, clean, and professional **Employee Leave Management System** built with:

- **Node.js + Express.js** (Backend API)  
- **HTML, CSS, JavaScript** (Frontend)  
- **JSON File** as Mock Database  
- **LocalStorage** for session handling  
- **Dribbble-inspired UI/UX dashboards**

This system allows **Employees** to apply for leaves and **Managers** to approve/reject requests, with dedicated dashboards for both roles.

---

## 🚀 Features

### 👨‍💼 Manager Features
- View all **pending leave requests**
- View all **approved/rejected** requests
- **Approve / Reject** leave applications
- Add **manager comments**
- View complete employee leave data

### 👩‍💻 Employee Features
- Apply for leave (Sick, Casual, Vacation)
- View available **leave balance**
- Track all past leave applications
- Cancel pending leave requests

### 🔐 Authentication
- Role-based login (Employee/Manager)
- Session stored using LocalStorage
- Auto-redirection based on user role

### 🎨 UI/UX Highlights
- Dribbble-inspired card layouts
- Glassmorphism login page
- Gradient backgrounds  
- Aesthetic dark sidebar
- Clean tables + colored status badges
- Fully responsive layout

---

## 🛠️ Tech Stack

### **Frontend**
- HTML5
- CSS3 (glassmorphism, gradients, responsive)
- JavaScript (ES6)
- DOM Manipulation
- Fetch API

### **Backend**
- Node.js
- Express.js
- CORS
- Body-parser
- File System (fs)

### **Database**
- `data.json` — mock DB for:
  - Users  
  - Leave applications  
  - Status + manager comments  

### **Session Management**
- LocalStorage (client-side session)

---

## 📂 Project Structure

```
leave-management/
│
├── public/
│   ├── index.html            # Login Page
│   ├── employee.html         # Employee Dashboard
│   ├── manager.html          # Manager Dashboard
│   ├── css/
│   │   └── style.css         # UI/UX Styles
│   ├── js/
│   │   └── app.js            # Frontend Logic
│   ├── images/
│   │   └── work-animation.gif
│   └── data.json             # Mock Database
│
├── server.js                 # Backend Server
└── README.md
```

---

## 🚀 How to Run the Project

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start server
```bash
node server.js
```

### 3️⃣ Open in browser
```
http://localhost:5000
```

---

## 🔑 Default Login Credentials

### **Manager**
```
username: manager
password: 1234
```

### **Employee**
```
username: emp
password: 1234
```

---

## 📡 API Endpoints

### **Auth**
```
POST /api/auth/login
```

### **Employee**
```
GET  /api/leaves/my-requests?userId=
POST /api/leaves
DELETE /api/leaves/:id
GET  /api/leaves/balance?userId=
```

### **Manager**
```
GET /api/leaves/pending
GET /api/leaves/all
PUT /api/leaves/:id/approve
PUT /api/leaves/:id/reject
```

---

## 🎯 What This Project Demonstrates

- Complete **full-stack** web development  
- **Authentication system** with role-based routes  
- REST API development  
- CRUD operations  
- Frontend ↔ Backend integration  
- JSON-based database handling  
- UI/UX design principles  
- Clean code architecture  

---

## 📝 Viva / Interview Explanation (Use This!)

### **index.html**
- Contains Login UI (glassmorphism)
- Hero animation + branding
- Captures username, password, role

### **app.js**
- Performs login  
- Stores user session in LocalStorage  
- Handles all **fetch API** calls  
- Renders tables dynamically for dashboards  

### **server.js**
- Express backend  
- Handles authentication  
- Full CRUD for leave system  
- Loads and updates `data.json`  

### **data.json**
- Stores:
  - User credentials  
  - Leave applications  
  - Leave status + comments  

### **style.css**
- Modern layout styling  
- Dribbble-like card design  
- Sidebars, tables, badges  
- Gradient backgrounds  

---

## 👩‍💻 Author

**Keerthana A**  
Full-Stack Developer | AI/ML Enthusiast  
📍 Bengaluru, India  
🔗 GitHub: https://github.com/keerthana-ki

---

## 📝 Resume-Friendly Description

**Employee Leave Management System** — Full-stack project simulating real HR workflows with authentication, leave lifecycle management, modular backend, and modern UI. Built using Node.js, Express, HTML, CSS, JS, and JSON DB.

