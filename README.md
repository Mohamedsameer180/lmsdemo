### README.md  

---

# Learning Management System (LMS) - Organization & Settings Management  

A modern Learning Management System focused on **Organization Profile**, **Branding**, and **Learning Policies** management.  

---

## Features  

1.  **Organization Profile Setup**  
    - Name, Mission Statement, Contact Details (Email, Phone, Address)  
    - Timezone & Locale preferences  

2.  **Branding**  
    - Upload Organization Logo  
    - Customize Theme Colors (Primary, Secondary, Background)  
    - Select Font Family  
    *Theme is applied globally & persisted across sessions.*  

3.  **Learning Policies**  
    - Course Access Rules (`open`, `restricted`, `role-based`)  
    - Assessment Settings (Pass %, Max Attempts)  
    - Certification Validity & Renewal  
    - Learning Deadlines & Compliance  

4.  **Admin Dashboard**  
    - Centralized settings panel  
    - Real-time theme preview  
    - Version-controlled settings (auto-increment on save)  

---

## Tech Stack  

* **Frontend**: React 18, React Router v6, Axios, React Hook Form, React Hot Toast  
* **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer (file uploads)  

---

## Prerequisites  

- Node.js (≥ v16)  
- npm (≥ v8)  
- MongoDB (Local or Atlas)  

---

## Installation  

### 1. Backend  

1.  Navigate to the backend folder:  

    ```bash
    cd lms-backend
    ```

2.  Install dependencies  

    ```bash
    npm install
    ```

3.  Create a **`.env`** file in `lms-backend` with the following content:

    ```env
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/lms_organizations
    JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
    JWT_EXPIRE=7d
    UPLOAD_PATH=./uploads/logos
    MAX_LOGO_SIZE=2097152   # 2MB
    FRONTEND_URL=http://localhost:3000
    ```

### 2. Frontend  

1.  Navigate to the frontend folder:  

    ```bash
    cd ../lms-frontend
    ```

2.  Install dependencies  

    ```bash
    npm install
    ```

3.  Create a **`.env`** file in `lms-frontend` with:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

---

## Running the Application  

1.  **Start MongoDB** (make sure it’s running).

2.  **Start Backend** (in `lms-backend` directory):  

    ```bash
    npm run dev
    ```
    Backend runs on `http://localhost:5000`

3.  **Start Frontend** (in a **new terminal**, `lms-frontend` directory):  

    ```bash
    npm start
    ```
    Frontend runs on `http://localhost:3000`

---

## Default Login (for Development)

> *Credentials are mocked in `src/pages/Login.js`*

- **Admin**  
  Email: `admin@lms.com`  
  Password: `admin123`  
  *(After login you’ll be redirected to `/admin/settings`)*  

- **User**  
  Email: `user@lms.com`  
  Password: `user123`  
  *(Redirected to dashboard)*  

---

## Folder Structure  

```
lms/
├── lms-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── organizationController.js
│   ├── models/
│   │   └── Organization.js
│   ├── routes/
│   │   └── organization.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── fileUpload.js
│   ├── uploads/
│   │   └── logos/      # Auto-created when you upload a logo
│   ├── .env
│   └── package.json
│
└── lms-frontend/
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── components/
    │   │   ├── Admin/
    │   │   │   ├── OrganizationSettings.js
    │   │   │   ├── ProfileSection.js
    │   │   │   ├── BrandingSection.js
    │   │   │   └── PoliciesSection.js
    │   │   ├── Layout/
    │   │   │   ├── Header.js
    │   │   │   └── Footer.js
    │   │   └── Common/
    │   │       ├── LoadingSpinner.js
    │   │       └── ErrorAlert.js
    │   ├── context/
    │   │   └── SettingsContext.js
    │   ├── hooks/
    │   │   └── useSettings.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   └── Login.js
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── theme.js
    │   ├── App.js
    │   ├── index.js
    │   └── App.css
    ├── .env
    └── package.json
```

---

## Scripts  

### Backend  

| Script      | Description                         |
|-------------|-------------------------------------|
| `npm run dev` / `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

### Frontend  

| Script      | Description                         |
|-------------|-------------------------------------|
| `npm start` | Start development server           |
| `npm run build` | Build for production             |
| `npm test` | Run tests                          |

---

## Contributing  

1.  Fork the repository  
2.  Create your feature branch (`git checkout -b feature/new-feature`)  
3.  Commit your changes (`git commit -am 'Add feature'`)  
4.  Push to the branch (`git push origin feature/new-feature`)  
5.  Open a Pull Request  

---

## License  

This project is licensed under the **MIT License**.  

--- 

Enjoy building your LMS! 🎓
