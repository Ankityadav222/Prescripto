import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailablity } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-semibold py-3 px-6">All Doctors</h1>
      <div
        className="h-[600px] overflow-y-auto border rounded-lg p-4"
        style={{ maxHeight: '600px' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {doctors.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-48 h-48 m-auto rounded-md mb-4 bg-indigo-100 hover:bg-primary translate-x-1 transition-all"
              />
              <div className="text-center">
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-gray-600 mb-2">{item.speciality}</p>
                <div className="flex items-center justify-center space-x-2">
                  <input
                    onChange={()=>changeAvailablity(item._id)}
                    type="checkbox"
                    checked={item.available}
                  
                    className="w-4 h-4 text-blue-500"
                  />
                  <p className="text-sm">Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorList
