import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from './pages/Home.jsx';
import { AppContextProvider, useAppContext } from './contexts/AppContext.jsx';
import SignIn from './pages/SignIn.jsx';
import AddHotel from './pages/AddHotel.jsx';
import MyHotels from './pages/MyHotels.jsx';
import EditHotel from './pages/EditHotel.jsx';
import Search from './pages/Search.jsx';
import { SearchContextProvider } from './contexts/SearchContext.jsx';
import Detail from './pages/Detail.jsx';
import Booking from './pages/Booking.jsx';
import MyBookings from './pages/MyBookings.jsx';


// const { isLoggedIn } = useAppContext();

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />
//       },
//       {
//         path: "/search",
//         element: <Search />
//       },
//       {
//         path: "/detail/:hotelId",
//         element: <Detail />
//       },
//       {
//         path: "/register",
//         element: <Register />
//       },
//       {
//         path: "/sign-in",
//         element: <SignIn />
//       },


//     ]
//   },
// ]);



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const AppRouter = () => {
  const { isLoggedIn } = useAppContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home /> 
        },
        {
          path: "/search",
          element: <Search />
        },
        {
          path: "/detail/:hotelId",
          element: <Detail />
        },
        ...(!isLoggedIn ? [
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/sign-in",
            element: <SignIn />
          },
        ]:[]),
        ...(isLoggedIn ? [
          {
            path: "/add-hotel",
            element: <AddHotel />
          },
          {
            path: "/my-hotels",
            element: <MyHotels />
          },
          {
            path: "/edit-hotel/:hotelId",
            element: <EditHotel />
          },
          {
            path: "/hotel/:hotelId/booking",
            element: <Booking />
          },
          {
            path: "/my-bookings",
            element: <MyBookings />
          }
        ] : []),
        {
          path: "*",
          element: <Navigate to="/" />
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          {/* <RouterProvider router={router} /> */}
          <AppRouter />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
