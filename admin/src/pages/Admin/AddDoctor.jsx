import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  // console.log("Backend URL:", backendUrl);
// console.log("Authorization Token:", aToken);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console logform data
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });
      console.log("API Response:", data);

      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName("")
        setPassword("")
        setEmail("")
        setAddress1("")
        setAddress2("")
        setDegree("")
        setAbout("")
        setFees("")
      } else {
        toast.error(data.success);
      }
    } catch (error) {
     toast.error(error.message)
     console.log(error)
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-4">
      {/* Header */}
      <p className="text-2xl font-bold mb-4 px-3">Add Doctor</p>

      {/* Scrollable Form Container */}
      <div className="max-h-[550px] overflow-y-auto p-4">
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-6">
            {/* Upload Doctor Picture */}
            <div className="flex flex-row items-center gap-4">
              <label htmlFor="doc-img" className="cursor-pointer">
                <img
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt="Upload"
                  className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                />
              </label>
              <input
                type="file"
                id="doc-img"
                hidden
                onChange={(e)=> setDocImg(e.target.files[0])}
                
              />
              <p className="text-sm text-gray-500 ">
                Upload Doctor <br />
                Picture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Doctor Name</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Doctor Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Doctor Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Experience</p>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                  >
                    <option value="" disabled>
                      Select Experience
                    </option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`${i + 1} year`}>
                        {i + 1} year
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium">Fees</p>
                  <input
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    placeholder="Fees"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Speciality</p>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                  >
                    <option value="" disabled>
                      Select Speciality
                    </option>
                    {[
                      "General Physician",
                      "Gynecologist",
                      "Dermatologist",
                      "Pediatricians",
                      "Neurologist",
                      "Gastroenterologist",
                    ].map((speciality, index) => (
                      <option key={index} value={speciality}>
                        {speciality}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium">Education</p>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="degree"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <input
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Address 1"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500 mb-2"
                    required
                  />
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Address 2"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div>
              <p className="text-sm font-medium">About Doctor</p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write about doctor"
                rows={5}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-medium text-sm hover:bg-blue-600"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
