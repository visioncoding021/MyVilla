import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
  
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [guests,setGuests] = useState('');
  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(user){
      setName(user.name);
    }
  },[user]);

  const placeBook = () => {
    alert("First Enter the details");
  }
  let numOfDays = 0;
  if(checkIn && checkOut) {
    numOfDays = differenceInCalendarDays(new Date(checkOut) ,new Date(checkIn));
  }

  async function bookPlace(){

    const response = await axios.post('/bookings', { checkIn,checkOut,
    guests,name,mobile,
    place:place._id,
    price: numOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`)
  } 
  
  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <>
      <div  className=" grid place-items-center text-center  bg-white shadow-xl border border-gray-300 p-6 justify-center items-center rounded-2xl">
                    <span className="text-xl "><span className="font-semibold lg:text-2xl">${place.price}</span> per night</span>
                    <div className="mt-4 flex lg:flex-row sm:flex-col lg:flex-wrap justify-center w-full">
                        <div className="lg:w-1/2 font-semibold border border-gray-300 shadow hover:shadow-2xl p-2">
                                    <span className="">CheckIn Date</span><br />
                                    <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} className="w-2/3 sm:w-full lg:w-4/6 border border-pink-400 my-1 rounded-xl px-2 pb-1" type="date" />
                        </div>
                        <div className="lg:w-1/2 font-semibold border border-gray-300 shadow hover:shadow-2xl p-2">
                                    <span className="">CheckOut Date</span> <br />          
                                    <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)}  className="w-2/3 sm:w-full lg:w-4/6 border border-pink-400 my-1 rounded-xl px-2 pb-1" type="date" />
                        </div>
                        {
                          numOfDays <= 0 && (
                              <p className=" mt-2 mb-2 text-red-600 font-semibold"> atleast 1 day booking* </p>
                          )
                        }
                    </div>
                    <div className="font-semibold border w-full border-gray-300 shadow hover:shadow-2xl p-2">
                                    <span className="">Maximum Number of Guests</span>
                                    <input  value={guests} onChange={ev => setGuests(ev.target.value)} className="guest" type='number' placeholder="1" />
                                    {place.maxGuests-guests<0 && (
                                      <p className="text-red-600"> enter number of guest according to guest allowed* </p>
                                    )
                                    }
                                    {guests < 1  && (
                                      <p className="text-red-600"> atleast 1 person* </p>
                                    )}
                    </div>
                    {numOfDays > 0 && guests > 0 && place.maxGuests-guests>=0 && (
                      <>
                      <div className="font-semibold border w-full  border-gray-300 shadow hover:shadow-2xl p-2">
                        <span className="">Your Full Name: </span>
                        <input  value={name} onChange={ev => setName(ev.target.value)} className="guest" type='text' placeholder="Himanshi Sharma" />
                        { name === "" && (
                          <p className="text-red-600"> Fill up your name* </p>
                        )
                        }
                      </div>
                      <div className="font-semibold border w-full  border-gray-300 shadow hover:shadow-2xl p-2">
                        <span className="">Your Mobile Number: </span>
                        <input  value={mobile} onChange={ev => setMobile(ev.target.value)} className="guest" type={'tel'} placeholder="********23" />
                        { mobile.length!==10 && (
                          <p className="text-red-600"> enter correct phone number* </p>
                        )
                        }
                      </div>
                      </>
                    )}
                    {
                      !user && (
                        
                          <a target="_self" rel="noreferrer" href="http://localhost:3000/login">
                            <button className="rounded-full mt-3 text-lg w-full">
                               Book this place
                            </button>
                          </a>
                      )
                    }
                    { (user) && (numOfDays < 0 || guests < 0 || place.maxGuests-guests < 0 || name==="" || mobile.length!==10 )  && (<button onClick={placeBook} className="rounded-full mt-3 text-lg w-full">
                      Book this place
                    </button>)}
                    { (user) && (numOfDays > 0 && guests > 0 && place.maxGuests-guests>=0 && name!=="" && mobile.length===10)  && (<button onClick={bookPlace} className="rounded-full mt-3 text-lg w-full">
                      Book this place 
                      {numOfDays > 0 && (
                        <span className=""> for ${numOfDays * place.price}</span>
                      )}
                    </button>)}
                </div> 
    </>
  )
}
