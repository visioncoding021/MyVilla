import axios from "axios";
import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import { UserContext } from "../Components/UserContext"
import PlacePage from "./PlacesPage";


export default function ProfilePage() {
    const [redirect,setRedirect]=useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    let {fpage} = useParams();
    if(fpage===undefined){
        fpage='profile'
    }

    //Logout Function
    async function logout(){
       await axios.post('/logout');
       setUser(null);
       setRedirect('/');
    }

    if(!ready){
        return 'loading.... ';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
   

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
    <>
        <AccountNav/>
        {
            fpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br /> 
                    <button onClick={logout} className="primary w-full max-w-sm mt-2">Logout</button>
                </div>
            )
        }
        {
            fpage === 'places' && (
                <PlacePage/>
            )
        }
    </>
  )
}
