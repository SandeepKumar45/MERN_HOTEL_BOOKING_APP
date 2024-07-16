import React from 'react'
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"



function EditHotel() {
    const { hotelId } = useParams();
    const { isLoggedIn } = useAppContext()
    // const navigate  = useNavigate()

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

    // if (!isLoggedIn) {
    //     navigate("/");
    // }

    const { data } = useQuery({
        queryKey: ['fetchMyHotelById'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId || ""}`, {
              credentials: "include",
            });
          
            if (!response.ok) {
              throw new Error("Error fetching Hotels");
            }
          
            return response.json();
          },
        enabled: !!hotelId,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: apiClient.updateMyHotelById,
        onSuccess: () => {
            toast.success("Hotel Saved!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          },
          onError: (error) => {
            console.log(error.message);
            toast.error("Error Saving Hotel", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          },
    });

    const handleSave = (hotelFormData) => {
        mutate(hotelFormData);
      };
  return (
    <ManageHotelForm hotel={data} onSave={handleSave} isLoading={isPending} />
  )
}

export default EditHotel