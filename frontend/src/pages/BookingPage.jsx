import axios from "axios";
import { useEffect, useState , useContext } from "react";
import { useParams } from "react-router-dom"
import AccountNav from "../Components/AccountNav";
import PlaceGalllery from "../Components/PlaceGalllery";
import { UserContext } from "../Components/UserContext";

export default function BookingPage() {
    const {id} = useParams();
    const [place,setPlace] = useState([]);
    const [booking,setBooking] =  useState(null);
    const [className,setClassName] = useState('');
    const {user} = useContext(UserContext);

    let num = 0;
    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return (Math.floor(Math.random()*(max - min + 1.0)) + min) + (Math.floor(Math.random()*(max - 1 + 1.0)) + min)/10;
    }
   num = randomNumberInRange(3, 4);

    useEffect(()=>{
      if(id){
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if(foundBooking){
            setBooking(foundBooking);
          }
        });
      }
    },[id]);

    if(!booking) {
      return '';
    }

    if(!place) return '';
      
    if(PlaceGalllery.showPhoto){
      setClassName("opacity-0");
      return '';
    }
    
  return (
    <>
      <AccountNav/>
      <div className="mt-2 xl:mx-40 bg-gray-100 ">
        <hr className={"my-4 prime w-full h-1" + className}/> 
        <div className="mx-8 ">
            <h1 className="font-semibold text-3xl mt-4 mb-4 mx-3">
            {booking.place.title}
            </h1>
            <div className="mt-2 flex items-center justify-start mx-3">
                <div className="flex items-center font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {num}
                </div>  &emsp;&emsp;
                <div className="font-semibold ">{num*10} reviews</div> &emsp;&emsp;
                <a target='_blank' className="underline font-semibold" rel="noreferrer" href={"https://maps.google.com/?q="+ place.address}>{booking.place.address}</a>
            </div>

            {/* IMAGES  Shown here */} 
            <PlaceGalllery place={booking.place}/>
            
            <hr className={"my-4 w-full prime h-1"+ className}/>
            <div className="mt-3 mx-2">
                    {!!user && (
                        <h2 className="text-lg font-semibold">
                        Farm booked By <span className="text" >{user.name}</span> 
                        </h2>
                    )}
                    <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 md:gap-8">
                        <div className="mt-4  flex items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <h1 className="font-semibold ml-2">
                                Great Location
                                <p className="font-[400]">
                                91% of recent guests gave the location a {num}-star rating.
                                </p>
                            </h1>
                        </div>
                        <div className="mt-4  flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                            <h1 className="font-semibold ml-2">
                                Great check-in experience
                                <p className="font-[400]">
                                91% of recent guests gave the check-in process a {num}-star rating.
                                </p>
                            </h1>
                        </div>
                        <div className="mt-4  flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                        </svg>
                            <h1 className="font-semibold ml-2">
                                Furry friends welcome
                                <p className="font-[400]">
                                Bring your pets along for the stay.
                                </p>
                            </h1>
                        </div>
                    </div>  
            </div>
            <hr className={"my-4 w-full prime h-1"+ className}/>
        </div>
    </div>
    </>
  )
}
