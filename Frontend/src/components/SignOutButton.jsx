import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function SignOutButton() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: async () => {
          toast.success("LoggedIn Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

            queryClient.invalidateQueries({ queryKey: ['validateToken'] })
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message, {
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

      const handleClick = () => {
        mutation.mutate();
      };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 text-xs sm:text-base px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Sign Out
    </button>
  )
}

export default SignOutButton