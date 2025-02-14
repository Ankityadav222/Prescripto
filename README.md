

🏥 Prescripto - Online Prescription Management System
✨ Overview
Prescripto is a web-based prescription management system built using the MERN stack (MongoDB, Express.js, React, and Node.js). The platform allows doctors to create, manage, and share digital prescriptions with patients, ensuring a seamless and efficient healthcare experience.

🚀 Features
✔ Doctor Dashboard – Manage patient prescriptions and appointments.
✔ Patient Portal – View and download prescriptions.
✔ Secure Authentication – Login/signup system for doctors and patients.
✔ Appointment Booking – Schedule and manage doctor appointments.
✔ Prescription History – Track past prescriptions for easy access.
✔ Search & Filter – Quickly find patient records and prescriptions.

🛠 Tech Stack
🔹 Frontend:
React.js ⚛️
Redux (if state management is needed)
Tailwind CSS / Material UI 🎨
🔹 Backend:
Node.js
Express.js
MongoDB (Mongoose for database modeling)
JWT Authentication 🔐
⚙️ Installation & Setup
🔹 Prerequisites:
📌 Install Node.js (v16+ recommended)
📌 Setup MongoDB (local or Atlas)
📌 Use npm or yarn for package management

🔹 Clone the Repository:
bash
Copy
Edit
git clone https://github.com/your-username/prescripto.git
cd prescripto
🔹 Install Dependencies:
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd ../frontend
npm install
🔹 Environment Variables:
Create a .env file in both backend and frontend directories.

📌 Backend .env
plaintext
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
📌 Frontend .env
plaintext
Copy
Edit
REACT_APP_API_BASE_URL=http://localhost:5000
🏃‍♂️ Running the Application
🔹 Start the Backend Server:
bash
Copy
Edit
cd backend
npm start
🔹 Start the Frontend:
bash
Copy
Edit
cd frontend
npm start
🔹 Accessing the App:
🌐 Open http://localhost:3000 in your browser.

📡 API Endpoints
🔹 Authentication
POST /api/auth/register – Register a new user
POST /api/auth/login – Login user
🔹 Doctors
GET /api/doctors – Fetch all doctors
POST /api/doctors – Add a new doctor
🔹 Patients
GET /api/patients – Fetch all patients
POST /api/patients – Add a new patient
🔹 Prescriptions
GET /api/prescriptions – Fetch all prescriptions
POST /api/prescriptions – Create a prescription
GET /api/prescriptions/:id – Get prescription by ID
🌍 Deployment
🔹 Frontend:
bash
Copy
Edit
npm run build
Deploy the build/ folder to Vercel or Netlify.

🔹 Backend:
Use Heroku, Render, or AWS to deploy the backend.

👥 Contributors
Ankit Yadav
📜 License
This project is licensed under the MIT License.

✨ Happy coding! 🚀
