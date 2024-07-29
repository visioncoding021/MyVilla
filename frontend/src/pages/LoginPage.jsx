import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Components/UserContext";

export default function LoginPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  
  if(password==null){
    alert('Enter The password');
  }

  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
      const {data} = await axios.post('/login',{email,password});
      setUser(data);
      console.log(data);
      alert('login Successfully :)');
      setRedirect(true);
    }catch(e){
      alert(' Email ID and Given Password are Incorrect ');
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div data-aos='zoom-in' className="mt-4 grow flex items-center justify-around">
      <div className=" mb-32">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form action="" className="max-w-md mx-auto border-gray" onSubmit={handleLoginSubmit}>
        <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="example@gmail.com" />
        {
          !email && (
              <p className="text-red-600 mx-2 my-2">Enter Email ID first*</p>
          )
        }
        <input type="password" value={password} onChange={ev => setPassword(ev.target.value)}  placeholder="password" />
        {
          !password && (
              <p className="text-red-600 mx-2 my-2">Enter Password first*</p>
          )
        }
        <button className="primary w-full">Login here</button>
        <div className="text-center py-2 text-gray-500">Don't have an account yet ? 
        <Link to={'/register'} className="underline text-black" >Register Now </Link>
         </div>
      </form>
      </div>
    </div>
  )
}
