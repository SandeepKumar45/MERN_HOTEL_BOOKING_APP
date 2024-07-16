import React from 'react'
import { useMutation } from '@tanstack/react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import * as apiClient from "../api-client"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function AddHotel() {
    const { isLoggedIn } = useAppContext()
    // const navigate  = useNavigate()

    // if (!isLoggedIn) {
    //     navigate("/");
    // }

    const { mutate, isPending } = useMutation({
        mutationFn: apiClient.addMyHotel,
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
          onError: () => {
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
  
    return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
}

export default AddHotel