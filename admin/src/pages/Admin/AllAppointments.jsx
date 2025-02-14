import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <p className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">All Appointments</p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">#</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Patient</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Age</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Date & Time</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Doctor</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Fees</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-3 sm:px-6">{index + 1}</td>
                  <td className="px-4 py-3 sm:px-6 flex items-center gap-4">
                    <img
                      src={item.userData.image}
                      alt={`${item.userData?.name || "Patient"}'s image`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <p className="truncate">{item.userData?.name || "No Name"}</p>
                  </td>
                  <td className="px-4 py-3 sm:px-6">{calculateAge(item.userData.dob)}</td>
                  <td className="px-4 py-3 sm:px-6">
                    {slotdateFormate(item.slotDate)} {item.slotTime}
                  </td>
                  <td className="px-4 py-3 sm:px-6 flex items-center gap-4">
                    <img
                      src={item.docData.image}
                      alt={`${item.docData?.name || "Doctor"}'s image`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <p className="truncate">{item.docData.name}</p>
                  </td>
                  <td className="px-4 py-3 sm:px-6">{item.docData.fees}</td>
                  <td className="px-4 py-3 sm:px-6">
                    {item.cancelled ? (
                      <span className="text-red-600">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-3 sm:px-6 text-center text-gray-500">
                  No appointments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
