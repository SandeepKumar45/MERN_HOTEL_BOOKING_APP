import React from 'react'
import { Link } from "react-router-dom";
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

function Header() {
  const { isLoggedIn } = useAppContext()
  return (
    <div className="bg-blue-800 py-6 px-3">
    <div className="container mx-auto flex justify-between">
      <span className="text-xl sm:text-3xl text-white font-bold tracking-tight">
        <Link to="/">HotelHub</Link>
      </span>
      <span className="flex space-x-1">
        {isLoggedIn ? (
          <>
            <Link
              className="flex items-center text-white text-xs sm:text-base px-3 font-bold hover:bg-blue-600"
              to="/my-bookings"
            >
              My Bookings
            </Link>
            <Link
              className="flex items-center text-white text-xs sm:text-base px-3 font-bold hover:bg-blue-600"
              to="/my-hotels"
            >
              My Hotels
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link
            to="/sign-in"
            className="flex bg-white text-xs sm:text-base items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
        )}
      </span>
    </div>
  </div>
  )
}

export default Header