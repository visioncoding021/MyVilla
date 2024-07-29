import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../Components/BookingWidget";
import PlaceGalllery from "../Components/PlaceGalllery";
import { UserContext } from "../Components/UserContext";

export default function PlacePage() {

    const {id} = useParams();
    const [place,setPlace] = useState([]);
    const [className,setClassName] = useState('');
    const {user} = useContext(UserContext);
    const perk = place.perks;

    let num = 0;
    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return (Math.floor(Math.random()*(max - min + 1.0)) + min) + (Math.floor(Math.random()*(max - 1 + 1.0)) + min)/10;
    }
   num = randomNumberInRange(3, 4);

    useEffect(()=> {
        if(!id){
          return;
        }
        axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
          
        });
      },[id]);

      if(!place) return '';
      
      if(PlaceGalllery.showPhoto){
        setClassName("opacity-0");
        return '';
      }

  return (
    <div className="mt-8 xl:mx-48 bg-gray-100 ">
        <hr className={"my-4 prime w-full h-1" + className}/> 
        <div className="mx-8 ">
            <h1 className="font-semibold text-3xl mt-4 mb-4 mx-3">
            {place.title}
            </h1>
            <div className="mt-2 flex items-center justify-start mx-3">
                <div className="flex items-center font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {num}
                </div>  &emsp;&emsp;
                <div className="font-semibold ">{num*10} reviews</div> &emsp;&emsp;
                <a target='_blank' className="underline font-semibold" rel="noreferrer" href={"https://maps.google.com/?q="+ place.address}>{place.address}</a>
            </div>

            {/* IMAGES  Shown here */} 
            <PlaceGalllery place={place}/>
            
            <hr className={"my-4 w-full prime h-1"+ className}/>
            <div className="mt-3 mx-2">
                    {!!user && (
                        <h2 className="text-lg font-semibold">
                        Farm Hosted By <span className="text" >{user.name}</span> 
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
            <hr className={"my-4 prime w-full h-1 " + className}/>
            <div className="mx-3">
                <h1 className="font-semibold text-2xl mt-2">What this place offers</h1>
                <div className="">
                    {place.perks && (
                        <div className="mt-4 grid grid-cols-3">
                            <div className="flex gap-3 text-lg items-center mt-3 mx-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                                {perk.includes('wifi') && (
                                <span>Free Wifi provided</span>
                                )}
                                {!perk.includes('wifi') && (
                                <span className="line-through">Free Wifi provided</span>
                                )}
                            </div>
                            <div className="flex gap-3 text-lg items-center mt-3 mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                                {perk.includes('parking') && (
                                <span>Free Parking Spot</span>
                                )}
                                {!perk.includes('parking') && (
                                <span className="line-through">Free Parking Spot</span>
                                )}
                            </div>
                            <div className="flex gap-3 text-lg items-center  mt-3 mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                                {perk.includes('tv') && (
                                <span>TV availability</span>
                                )}
                                {!perk.includes('tv') && (
                                <span className="line-through">TV availability</span>
                                )}
                            </div>
                            <div className="flex gap-3 text-lg items-center mt-3 mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                                {perk.includes('radio') && (
                                <span>Radio availability</span>
                                )}
                                {!perk.includes('radio') && (
                                <span className="line-through">Radio availability</span>
                                )}
                            </div>
                            <div className="flex gap-3 text-lg items-center mt-3 mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                                {perk.includes('pets') && (
                                <span>Pets allowance</span>
                                )}
                                {!perk.includes('pets') && (
                                <span className="line-through">Pets allowance</span>
                                )}
                            </div>
                            <div className="flex gap-3 text-lg items-center mt-3 mx-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            {perk.includes('entrance') && (
                                <span>Private Entrance</span>
                                )}
                                {!perk.includes('entrance') && (
                                <span className="line-through">Private Entrance</span>
                                )}
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr className={"my-4 prime w-full h-1" + className}/>
            <div className="mx-3  text-justify">
            </div>
            <div className="grid gap-6 grid-cols-2 my-2 mx-2 ">
                <div className=" text-justify px-2">
                <h1 className="font-semibold text-2xl mb-3">Place Description</h1>
                    <div className="mb-3">{place.description}</div>
                    <div className="font-semibold">Check-In : {place.checkIn} AM.</div>
                    <div className="font-semibold">Check-Out : {place.checkOut} PM.</div>
                    <div className="font-semibold">Max. number of Guests allowed : {place.maxGuests}.</div>
                </div>
                <BookingWidget place={place}/>                 
            </div>
            <div className="my-2 mx-3">
                <h1 className="font-semibold text-2xl mb-3 ">Extra Information</h1>
                <h1 className="text-justify">{place.extraInfo}</h1>
            </div>
            <hr className={"my-6 prime w-full h-1" + className}/>
        </div>
    </div>
  )
}
