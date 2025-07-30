
# 🚀 Portfolio Frontend (React + Vite)

This is the **frontend** for the **Portfolio Project Platform**, built using **React**, **Vite**, **Redux Toolkit**, and **Tailwind CSS**. It connects with the backend API to provide a seamless experience for authentication, project management, and user profile management.

🌐 **Live Frontend**: [https://your-live-frontend-link](https://your-live-frontend-link)
🔗 **Backend API**: [https://dev-backend-zvor.onrender.com/api](https://dev-backend-zvor.onrender.com/api)
📂 **Repository**: [https://github.com/Ashutosh5333/Dev-frontend](https://github.com/Ashutosh5333/Dev-frontend)

---

## 📸 Screenshots

* <img width="1460" height="817" alt="Screenshot 2025-07-30 at 10 09 14 PM" src="https://github.com/user-attachments/assets/c48e8236-c08d-437a-90cb-1fd6705c1ee7" />
* <img width="1466" height="784" alt="Screenshot 2025-07-30 at 10 11 21 PM" src="https://github.com/user-attachments/assets/08e226fb-2462-416e-a237-2c1278a94cb6" />
<img width="1425" height="825" alt="Screenshot 2025-07-30 at 10 11 44 PM" src="https://github.com/user-attachments/assets/bf63acff-03a4-4989-9080-7ba2d29eba2d" />
<img width="1428" height="818" alt="Screenshot 2025-07-30 at 10 12 11 PM" src="https://github.com/user-attachments/assets/371d4a98-ee99-485f-8482-a4136b06771e" />
<img width="1461" height="839" alt="Screenshot 2025-07-30 at 10 12 02 PM" src="https://github.com/user-attachments/assets/7119d134-fcc8-423b-84fa-f1b6339755a8" />


---
## User Flow
flowchart TD
    A[User Visits Platform] --> B{Has an account?}
    B -- No --> C[Signup with Name, Email, Password]
    C --> D[Login]
    B -- Yes --> D[Login]
    D --> E[View Projects Feed]
    E --> F[View Other User's Projects]
    F --> G[Comment on Projects]
    E --> H[Create New Project]
    D --> I[Update Profile]
    
   If the user has no account → Signup → Login.
   After login, the user can:
   Browse all projects posted by others.
   Comment on projects.
   Create their own projects.
   Update their profile at any time.

## ✨ Features

* **User Authentication**: Signup & Login with validation.
* **Profile Management**: View and update user profile in a modal.
* **Projects Management**:

  * View all projects in a blog-like UI.
  * Create new projects with a modal form.
  * Like, comment, and interact with projects (future scope).
* **Redux Toolkit Integration** for state management.
* **Tailwind CSS** for responsive UI design.
* **Framer Motion** animations for smooth transitions.
* **React Router v7** for navigation.
* **Environment-based API Configuration** for dev & prod.
* **Axios** for API calls with proper error handling.

---

## 🛠️ Tech Stack

* **React 18** (Frontend library)
* **Vite 7** (Bundler for fast development)
* **Redux Toolkit** (State management)
* **Tailwind CSS** (Styling)
* **Axios** (HTTP client)
* **React Router v7** (Routing)
* **Framer Motion** (Animations)
* **Lucide React & React Icons** (Icons)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ashutosh5333/Dev-frontend.git
cd Dev-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file in the root directory and add:

```env
VITE_API_BASE=https://dev-backend-zvor.onrender.com/api
```

### 4️⃣ Run the app

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 📌 Project Structure

```
src/
├── assets/            # Static assets
├── components/        # Reusable components (Navbar, Modals, etc.)
├── pages/             # Page-level components
├── redux/             # Redux slices and store
├── App.jsx            # Main App component
├── main.jsx           # Entry point
└── index.css          # Global styles (Tailwind)
```

---

## 🔗 API Integration

This frontend consumes the backend API:
[https://dev-backend-zvor.onrender.com/api](https://dev-backend-zvor.onrender.com/api)



## 🚀 Deployment

T**Vercel** .

---

## 🧑‍💻 Author

* **Ashutosh Lakshakar** – [GitHub](https://github.com/Ashutosh5333)

