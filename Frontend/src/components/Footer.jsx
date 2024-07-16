import React from 'react'

function Footer() {
  return (
    <div className="bg-blue-800 py-10 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-base sm:text-3xl text-white font-bold tracking-tight">
        HotelHub
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer text-xs sm:text-base">Privacy Policy</p>
          <p className="cursor-pointer text-xs sm:text-base">Terms of Service</p>
        </span>
      </div>
    </div>
  )
}

export default Footer