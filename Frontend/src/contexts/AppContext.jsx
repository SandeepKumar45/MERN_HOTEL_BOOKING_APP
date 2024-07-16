import React, { createContext, useContext, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import { loadStripe } from "@stripe/stripe-js";


const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const AppContext = createContext(null);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
    const { isError } = useQuery({ queryKey: ['validateToken'], queryFn: apiClient.validateToken, retry: false })
    return (
        <AppContext.Provider value={{ isLoggedIn: !isError , stripePromise}}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(AppContext)
}