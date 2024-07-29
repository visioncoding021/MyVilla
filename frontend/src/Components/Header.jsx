import { Link } from 'react-router-dom';
import { UserContext } from "../Components/UserContext";
import { useContext} from "react";

export default function Header() {
  const {user} = useContext(UserContext);
  return (
    <div>
      <header className='flex justify-between'>
      <Link to={'/'} href="/" className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7 ">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
      <span className='font-bold text-xl'>TripFix</span>
      </Link>
      <div className='flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
        <div className=' px-4 sm:px-2'>Anywhere</div>
        <div>|</div>
        <div className='sm:px-2 px-4'>Any Week</div>
        <div>|</div>
        <div className='sm:px-2 px-4 text-gray-500'>Add guests</div>
        <button className='mx-1 rounded-full mt-3 bg-pink-600 text-white p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
    </div>
    <Link to={user?'account':'/login'} className='flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>&nbsp;
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rounded-full bg-gray-500 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>

      {!!user && (
        <div className='sm:text-sm text-center'>
         &nbsp; {user.name}
        </div>
      )}
    
    </Link>
    </header>
    </div>
  )
}
