import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink for active link detection
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);  // Fetch aToken from context
  const { dToken } = useContext(DoctorContext);  // Fetch aToken from context

  return (
    <div className=" h-screen w-64 shadow-lg flex flex-col">
      {aToken && (
        <ul className="space-y-4 my-4 md:space-y-2,my-2">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-600'
              }
            >
              <img src={assets.home_icon} alt="Home Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-600'
              }
            >
              <img src={assets.appointment_icon} alt="Appointment Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-600'
              }
            >
              <img src={assets.add_icon} alt="Add Doctor Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-300'
              }
            >
              <img src={assets.people_icon} alt="Doctor List Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Doctor List</p>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4 my-4 md:spacey-2,my-2">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-600'
              }
            >
              <img src={assets.home_icon} alt="Home Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-600'
              }
            >
              <img src={assets.appointment_icon} alt="Appointment Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>
          </li>

          
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 bg-indigo-200 text-white border-r-4 border-indigo-600'
                  : 'flex items-center px-4 py-2 hover:bg-indigo-200 hover:text-white transition hover:border-r-4 group-hover:border-indigo-300'
              }
            >
              <img src={assets.people_icon} alt="Doctor List Icon" className="w-5 h-5 mr-2" />
              <p className='hidden md:block'>Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
