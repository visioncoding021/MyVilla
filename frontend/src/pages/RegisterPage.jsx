import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {await axios.post('/register',{
      name,
      email,
      password
    });
    alert('Registration Successfully Now you can Login');
  } catch(e){
    alert('Registration Failed. Please Try Again ')
  }
  }
  return (
    <div data-aos='zoom-in' className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form action="" className="max-w-md mx-auto border-gray" onSubmit={registerUser}>
        <input value={name} onChange={ev => setName(ev.target.value)} type="text"  placeholder='Himanshi Sharma' />
        {
          
        }
        <input value={email} onChange={ev => setEmail(ev.target.value)} type="email" placeholder="example@gmail.com" />
        <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="password" />
        <button className="primary w-full">Register here</button>
        <div className="text-center py-2 text-gray-500">Already a memeber? 
        <Link to={'/login'} className="underline text-black" > Sign In</Link>
         </div>
      </form> 
      </div>
    </div>
  )
}
