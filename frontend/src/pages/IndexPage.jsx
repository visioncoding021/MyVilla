import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  },[])
  return (
    <div  className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 mt-6 ">
       {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} className="m-2">
          <div className="bg-gray-300 mb-2 rounded-2xl flex  ">
          {place.photos?.[0] && (
          <img className=" rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Photos" />
          )}
          </div>
          <h4 className="font-bold truncate leading-6">{place.address}</h4>
          <h1 className="font-semibold underline truncate leading-4 text-md">
            {place.title}
          </h1>
          {place.price && (
          <h4 className=" mt-1 truncate font-semibold leading-6 underline-offset-3">
            <span className="font-bold">
            &nbsp;${place.price}
            </span>&nbsp;per night
            </h4>
          )}
          {!place.price && (
          <h4 className=" mt-2 truncate font-semibold leading-6 underline-offset-3"> - Price check on given place</h4>
          )}
          </Link>
       ))}
       {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} className="m-2">
          <div className="bg-gray-300 mb-2 rounded-2xl flex  ">
          {place.photos?.[0] && (
          <img className=" rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Photos" />
          )}
          </div>
          <h4 className="font-bold truncate leading-6">{place.address}</h4>
          <h1 className="font-semibold underline truncate leading-4 text-md">
            {place.title}
          </h1>
          {place.price && (
          <h4 className=" mt-1 truncate font-semibold leading-6 underline-offset-3">
            <span className="font-bold">
            &nbsp;${place.price}
            </span>&nbsp;per night
            </h4>
          )}
          {!place.price && (
          <h4 className=" mt-2 truncate font-semibold leading-6 underline-offset-3"> - Price check on given place</h4>
          )}
          </Link>
       ))}
    </div>
  );
}
