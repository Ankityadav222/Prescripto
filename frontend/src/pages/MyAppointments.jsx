import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const slotdateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId, userId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(error.message || "Failed to cancel appointment.");
    }
  };

  const initiatePayment = (appointment) => {
    setSelectedAppointment(appointment);
    setPaymentModal(true);
  };

  const handlePayment = async () => {
    const { cardholderName, cardNumber, expiryDate, cvv } = paymentData;

    // Validate Cardholder Name
    if (!cardholderName) {
      toast.error("Please enter your cardholder name.");
      return;
    }

    // Validate Card Number (12 digits)
    const cardNumberRegex = /^[0-9]{12}$/;
    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
      toast.error("Card number must be exactly 12 digits.");
      return;
    }

    // Validate Expiry Date (MM/YY format)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      toast.error("Please enter a valid expiry date in MM/YY format.");
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const expiryYear = parseInt(expiryDate.split("/")[1]);
    const expiryMonth = parseInt(expiryDate.split("/")[0]);

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < new Date().getMonth() + 1)
    ) {
      toast.error("Card has expired.");
      return;
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvv || !cvvRegex.test(cvv)) {
      toast.error("CVV must be exactly 3 digits.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/complete-payment`,
        { appointmentId: selectedAppointment._id, paymentData },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Payment successful!");
        setPaymentModal(false);
        getUserAppointments();
      } else {
        toast.error(data.message || "Payment failed.");
      }
    } catch (error) {
      console.error("Error completing payment:", error);
      toast.error(error.response?.data?.message || "Payment failed.");
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="min-h-screen py-10">
      <h4 className="text-2xl font-bold px-10 text-gray-800 mb-6">My Appointments</h4>
      <hr className="mx-6" />
      <div className="max-w-5xl mx-auto rounded-lg p-6">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-600">No appointments found.</div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 border-b border-gray-300 pb-6 mb-6 last:border-b-0 last:pb-0"
            >
              <div className="w-full lg:w-1/4 flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={`Image of Dr. ${item.docData.name}`}
                  className="w-48 h-48 bg-indigo-100 lg:h-auto rounded-lg m-auto border-2 border-gray-200"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.docData.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Speciality: {item.docData.speciality}
                </p>
                <div className="text-gray-600">
                  <p>Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <p className="text-gray-800 mt-2 font-medium">
                  <span className="text-gray-600">Date & Time:</span> {slotdateFormate(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full lg:w-auto">
                {item.payment && !item.cancelled && !item.isCompleted ? (
                  <button className="w-full lg:w-auto px-4 py-2 text-green-800 border border-green-800 font-medium rounded-md hover:shadow-md transition duration-200">
                    Paid
                  </button>
                ) : item.cancelled && !item.payment && !item.isCompleted  ? (
                  <button className="w-full lg:w-auto px-4 py-2 text-red-800 border border-red-800 font-medium rounded-md hover:shadow-md transition duration-200">
                    Appointment Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button className="w-full lg:w-auto px-4 py-2 text-green-800 border border-green-800 font-medium rounded-md hover:shadow-md transition duration-200">
                    Complete Appointment
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => initiatePayment(item)}
                      className="w-full lg:w-auto px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 hover:shadow-md transition duration-200"
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-full lg:w-auto px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 hover:shadow-md transition duration-200"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {paymentModal && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedAppointment.docData.image}
                alt={`Dr. ${selectedAppointment.docData.name}`}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold">{selectedAppointment.docData.name}</h3>
              <p className="text-gray-600">{selectedAppointment.docData.speciality}</p>
            </div>
            <p className="text-gray-800 mb-4">₹{selectedAppointment.docData.fees}</p>
            <form>
              <input
                type="text"
                name="cardholderName"
                placeholder="Cardholder Name"
                value={paymentData.cardholderName}
                onChange={handlePaymentInputChange}
                className="w-full mb-4 px-3 py-2 border rounded focus:outline-none"
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={handlePaymentInputChange}
                className="w-full mb-4 px-3 py-2 border rounded focus:outline-none"
              />
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={handlePaymentInputChange}
                  className="w-1/2 px-3 py-2 border rounded focus:outline-none"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentData.cvv}
                  onChange={handlePaymentInputChange}
                  className="w-1/2 px-3 py-2 border rounded focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPaymentModal(false)}
                  className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
