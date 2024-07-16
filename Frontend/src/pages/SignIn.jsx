import React from 'react'
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom"

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const queryClient = useQueryClient()
      const navigate = useNavigate()

      const location = useLocation();


      const mutation = useMutation({
        mutationFn: apiClient.signIn,
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

            await queryClient.invalidateQueries({ queryKey: ['validateToken'] })
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error) => {
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
    
      const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
      });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 sm:text-xl"
        >
          Login
        </button>
      </span>
    </form>
  )
}

export default SignIn