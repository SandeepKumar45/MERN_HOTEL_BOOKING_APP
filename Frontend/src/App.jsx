import React from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "./components/SearchBar"


function App() {
  const location = useLocation();
  const hideSearchBar = location.pathname === '/sign-in' || location.pathname === '/register';
  return (
    // <div className="flex flex-col min-h-screen border-2 border-red-500 w-screen">
    //   <Header />
    //   <Hero />
    //   <div className="container mx-auto">
    //     <SearchBar />
    //   </div>
    //   <div className="container mx-auto py-10 px-5 flex-1">
    //     <Outlet />
    //   </div>
    //   <Footer />
    //   <ToastContainer />
    // </div>
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <Hero />
      {!hideSearchBar && (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      )}
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 flex-1">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>

  )
}

export default App
