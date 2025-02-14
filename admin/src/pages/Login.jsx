import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAToken,backendUrl}=useContext(AdminContext)
  const {setDToken}=useContext(DoctorContext)


    const onSubmitHandler = async (event) =>{
        event.preventDefault()

        try {
            
            if(state ==='Admin'){

                const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
              const {data} = await axios.post(backendUrl + '/api/doctor/login', {email,password})
              if(data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                console.log(data.token)
              }else{
                toast.error(data.message)
              }

            }

        } catch (error) {
            
        }

    }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          <span className="capitalize">{state}</span> Login
        </h2>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
        <div className="mt-4 text-sm text-center">
          {state === 'Admin' ? (
            <p>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
