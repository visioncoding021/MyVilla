import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../Components/AccountNav";
import PlaceImg from "../Components/PlaceImg";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(()=>{
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  },[]);

  return (
    <>
      <AccountNav/>
      <div className=" lg:mx-40 ">
        {
          !bookings?.length  && (
            <div  className=" lg:mx-44 ">
            <div  className="text-2xl text-center lg:my-20 p-10 shadow-md border  border-gray-300 justify-center items-center rounded-full ">
              We are waiting for your bookings.... 😊
              <br /> Book your Place 
              <br /><button href="http://localhost:3000" className="mt-4"><a href="http://localhost:3000">Here</a></button> 
            </div>
            </div>
          )
        }
      {bookings?.length > 0 && bookings.map( booking => (
        <Link to={`${booking._id}`} className="flex mt-3 bg-gray-100 gap-4 border border-black cursor-pointer p-4 rounded-2xl">
          <div className=" w-48 h-22">
            <PlaceImg  place={booking.place}/>
          </div>
          <div className="">
          <h1 className="text-xl underline">{booking.place.title}</h1>
          <h1 className="text-md  mt-3">
            From <span className="font-semibold">{format(new Date(booking.checkIn), 'yyyy-MM-dd') }</span> to <span className="font-semibold">{format(new Date(booking.checkOut), 'yyyy-MM-dd') }</span></h1>
          <p className="text-md flex mt-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg> &nbsp;
              For {differenceInCalendarDays(new Date(booking.checkOut) ,new Date(booking.checkIn))} Nights  
          </p>
          <p className="text-md flex mt-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg> &nbsp;
            Total Price : ${booking.price} 
          </p>
          </div>
        </Link>
      )
      )}
      </div>
    </>
  )
}
