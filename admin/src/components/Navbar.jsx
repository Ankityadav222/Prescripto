import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from './../assets/assets_admin/assets';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate()

  const handleLogout = () => {

    navigate('/')
    aToken && setAToken('')
    dToken && setDToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && localStorage.removeItem('dToken')
    // console.log('Logged out');
  };

  return (
    <nav className="flex justify-between items-center  p-4 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3 ">
        <img src={assets.admin_logo} alt="Logo" className="w-sm h-10" />
        <span className="text-sm font-extralight border-4 px-3 py- rounded-2xl ">{aToken ? 'Admin' : 'Doctor'} </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
