import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { backendUrl,dToken, profileData, setProfileData, getProfileData, updateProfileData } = useContext(DoctorContext);


  const [isEdit, setIsEdit] = useState(false);  // Correct usage of useState

  const updateProfile=async()=>{

    try {
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  

  return (
    profileData && (
      <div className="max-w-4xl m-5 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          {/* Doctor's Image */}
          <img
            src={profileData.image}
            alt="Doctor Profile"
            className="w-32 h-32 rounded-full object-cover mr-6"
          />

          <div>
            {/* Doctor's Name and Speciality */}
            <p className="text-3xl font-semibold text-gray-800">{profileData.name}</p>
            <p className="text-xl text-gray-600">{profileData.degree} - {profileData.speciality}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">{profileData.experience}</button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-800">About:</p>
          <p className="text-gray-700">{profileData.about}</p>
        </div>

        {/* Appointment Fee */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-800">Appointment Fee: 
            <span className="font-semibold">
              {isEdit ? 
                <input 
                  type="number" 
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                  value={profileData.fees} 
                /> 
                : profileData.fees}
            </span>
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-800">Address:</p>
          <p className="text-gray-700">{isEdit ?<input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/> :profileData.address.line1}</p>
          <p className="text-gray-700">{isEdit ?<input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> :profileData.address.line2}</p>
        </div>

        {/* Availability */}
        <div className="flex items-center mb-6">
          <input type="checkbox" onChange={()=> isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available}  className="mr-2" />
          <label className="text-gray-700">Available</label>
        </div>

        {/* Edit and Save Button */}
        {isEdit ? (
          <button onClick={() => updateProfile()} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Save</button>
        ) : (
          <button onClick={() => setIsEdit(true)} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Edit</button>
        )}
      </div>
    )
  );
};

export default DoctorProfile;
