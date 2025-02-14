import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';


function Detail() {
    const { hotelId } = useParams();

//   const { data } = useQuery(
//     "fetchHotelById",
//     () => apiClient.fetchHotelById(hotelId || ""),
//     {
//       enabled: !!hotelId,
//     }
//   );

  const { data } = useQuery({
    queryKey: ['fetchHotelById', hotelId || ""],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
})

  if (!data) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: data.starRating }).map((val,index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.imageUrls.map((image,index) => (
          <div key={index} className="h-[300px]">
            <img
              src={image}
              alt={data.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {data.facilities.map((facility,index) => (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line mb-5">{data.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={data.pricePerNight}
            hotelId={data._id}
          />
        </div>
      </div>
    </div>
  )
}

export default Detail