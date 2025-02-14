import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';  
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AdminContext } from './context/AdminContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      {aToken || dToken ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex-grow">
              <Routes>
                {/* Admin Routes */}
                {aToken && (
                  <>
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/all-appointments" element={<AllAppointments />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctor-list" element={<DoctorList />} />
                  </>
                )}
                {/* Doctor Routes */}
                {dToken && (
                  <>
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                    <Route path="/doctor-profile" element={<DoctorProfile />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
