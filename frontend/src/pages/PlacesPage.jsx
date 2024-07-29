import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import PlaceImg from "../Components/PlaceImg";

export default function PlacesPage() {
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/user-places').then(({data})=> {
      setPlaces(data);
    });
  },[]);
  return (
    <>
        <AccountNav/>
          <div className="text-center">
          <Link className="primary inline-flex gap-1" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
              Add New Place
          </Link>
      </div>
      
      <div className="mt-4">
        {/* List of all added Places */}
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/'+place._id} className=" cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl mt-3 border border-black ">
            <div className=" flex w-32 h-22 bg-gray-300 grow shrink-0 gap-4">
              <PlaceImg place={place} />
            </div>
            <div className="grow-0 shrink ">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2 text-justify">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
