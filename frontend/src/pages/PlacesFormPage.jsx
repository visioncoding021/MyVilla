import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import Perks from "../Components/Perks";
import PhotosUploader from "../Components/PhotosUploader";

export default function PlacesFormPage() {

    const{id} = useParams();
    // console.log({id});
    const[title,setTitle] = useState('');
    const[address,setAddress] = useState('');
    const[addedPhotos,setAddedPhotos] = useState([]);
    const[description,setDescription] = useState('');
    const[perks,setPerks] = useState([]);
    const[extraInfo,setExtraInfo] = useState('');
    const[checkIn,setCheckIn] = useState('');
    const[checkOut,setCheckOut] = useState('');
    const[maxGuests,setMaxGuests] = useState(1);
    const[price,setPrice] = useState(1000);
    const [redirect,setRedirect] = useState(false);
    useEffect(()=> {
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
        
      });
    },[id]);

    // Functions
    function inputHeader(text){
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        )
      }
      function inputDescription(text){
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        )
      }
      function preInput(header,description){
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
          )
      }
    
      async function savePlace(ev){
        ev.preventDefault(); 
        const placeData = {title,address,addedPhotos,
          description,perks,extraInfo,
          checkIn,checkOut,maxGuests,price};

        if(id){
          //Update 
          await axios.put('/places',{
            id, ...placeData  });
            setRedirect(true);
        }
        else{
          // New Place
          await axios.post('/places',placeData);
          setRedirect(true);
        }
        
      }

      if(redirect){
        return <Navigate to={'/account/places'} />
      }

  return (
    <>
        <AccountNav/>
      <div>
            <form onSubmit={savePlace}>
              
              {/* Title */}
              {preInput('Title','Title for your place should be short and catchy as in advertisement')}
              <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example My Lovely apt" />
              
              {/* Address */}
              {preInput('Address','Address to this place')}
              <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
              
              {/* Photo */}
              {preInput('Photos','More == Better')}
              <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
              
            {/* Description */}
              {preInput('Description','Description of the Place')}
              <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

            {/* Perks */}
              {preInput('Perks','Select all the perks of your Place')}
              <Perks selected={perks} onChange={setPerks} />

            {/* Extra Information */}
              {preInput('Extra Info.','House Rules, etc.')}
              <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
              <h2 className="text-2xl mt-4">Check-In and Check-Out Times</h2>
              <p className="text-gray-500 text-sm">Add Check-In and Check-Out Times, remember to have some time window for cleaning the room between guests </p>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4 ">
                    <div>
                      <h3 className="mt-2 -mb-1">Check in Time</h3>
                      <input type="text"  value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00" />
                    </div>
                    <div>
                      <h3 className="mt-2 -mb-1">Check in Out</h3>
                      <input type="text"  value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="12:00" />
                    </div>
                    <div>
                      <h3 className="mt-2 -mb-1">Max. Guests Number </h3>
                      <input type="number"  value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="40 space" />
                    </div>
                    <div>
                      <h3 className="mt-2 -mb-1">Price per night</h3>
                      <input type="number"  value={price} onChange={ev => setPrice(ev.target.value)} placeholder="40 space" />
                    </div>
              </div>
              <div className="gap-2 mt-4">
                <button className="primary w-full">Save</button>
              </div>
            </form>
          </div>
    </>
  )
}
