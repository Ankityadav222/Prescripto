import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);

  const { calculateAge, slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-700">
        Doctor Appointments
      </h1>

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-7 gap-4 font-semibold text-gray-700 border-b pb-3 mb-3">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.reverse().map((appointment, index) => (
            <div
              key={appointment._id}
              className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center text-gray-600 border-b py-3"
            >
              {/* Index */}
              <p className="text-center md:text-left">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center justify-center md:justify-start">
                <img
                  src={appointment.userData.image}
                  alt={appointment.userData.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-1"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base text-center md:text-left">
                    {appointment.userData.name}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <p
                className={`${
                  appointment.payment ? 'text-green-600' : 'text-red-600'
                } text-center `}
              >
                {appointment.payment ? 'Online' : 'cash'}
              </p>

              {/* Age */}
              <p className="text-center md:text-left">
                {calculateAge(appointment.userData.dob)}
              </p>

              {/* Date & Time */}
              <p className="text-center md:text-left">
                {slotdateFormate(appointment.slotDate)} & {appointment.slotTime}
              </p>

              {/* Fees */}
              <p className="text-center md:text-left">${appointment.amount}</p>

              {/* Action */}
              <div className="flex justify-center md:justify-start space-x-2">
                {appointment.cancelled ? (
                  <p className="text-red-600 font-medium">Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-600 font-medium">Completed</p>
                ) : (
                  <>
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel Icon"
                      className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                      onClick={() => cancelAppointment(appointment._id)}
                    />
                    <img
                      src={assets.tick_icon}
                      alt="Tick Icon"
                      className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                      onClick={() => completeAppointment(appointment._id)}
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
