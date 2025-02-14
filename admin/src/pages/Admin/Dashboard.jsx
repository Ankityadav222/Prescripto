import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Doctors Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
          <img
            src={assets.doctor_icon}
            alt="Doctors Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-2xl font-bold">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
          <img
            src={assets.appointments_icon}
            alt="Appointments Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-2xl font-bold">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
          <img
            src={assets.patients_icon}
            alt="Patients Icon"
            className="w-12 h-12 mr-4"
          />
          <div>
            <p className="text-2xl font-bold">{dashData.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img
              src={assets.list_icon}
              alt="Latest Appointments"
              className="w-8 h-8 mr-2"
            />
            <p className="text-lg font-semibold">Latest Bookings</p>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg p-3"
              >
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <p className="font-bold">{item.docData.name}</p>
                  <p className="text-gray-500 text-sm">{slotdateFormate(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-semibold">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel Icon"
                    className="w-8 h-8 mx-4 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
