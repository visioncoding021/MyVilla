import { useState } from "react";

export default function PlaceGalllery({place}) {
    const [showPhoto,setShowPhoto] = useState(false);
    if(showPhoto){
        return(
        <div className=" text-white lg:text-3xl text-2xl absolute inset-0 bg-black mix-h-full ">
            <div className="bg-black p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4"> 
                <div className="flex flex-col p-5 justify-center items-center">
                    <h1 className="p-3 font-semibold text-center">Photos of <a target='_blank' rel="noreferrer" href={"https://maps.google.com/?q="+ place.address} className="font-bold underline">{place.title}</a> </h1>
                    <button onClick={() => setShowPhoto(false)}  className="flex gap-1 w-auto " >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        <span>Back to Page</span>
                    </button>
                </div>
                {place?.photos?.length > 0 && place.photos.map(photo => (
                <div className="">
                    <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+photo} alt="Photos" />
                </div>
                 ))}
            </div>
            
        </div>
        );
      }
  return (
    <>
      <div className="mt-2 relative mx-3">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => {setShowPhoto(true)}} className="cursor-pointer aspect-square object-cover " src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Photos" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[3] && (
                                <img onClick={() => {setShowPhoto(true)}} className="cursor-pointer aspect-square object-cover " src={'http://localhost:4000/uploads/' + place.photos[3]} alt="Photos" />
                        )}
                        <div className="overflow-hidden">
                        {place.photos?.[2] && (
                                <img onClick={() => {setShowPhoto(true)}} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="Photos" />
                                )}
                        </div>
                    </div>
                </div>

                {/* Show More Photos Button */}
                <button onClick={() => setShowPhoto(true)} className="absolute bottom-0 right-0 flex gap-1 items-center opacity-80 hover:opacity-100 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    <span>Show More Photos</span>
                </button>
            </div>
    </>
  )
}
