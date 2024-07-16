import React, { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import { useSearchContext } from '../contexts/SearchContext';
import { useNavigate, useParams } from 'react-router-dom';
import * as apiClient from "../api-client"
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useQuery } from '@tanstack/react-query';

function Booking() {
    const { stripePromise, isLoggedIn } = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();
    // const navigate  = useNavigate()


    const [numberOfNights, setNumberOfNights] = useState(0);


    // if (!isLoggedIn) {
    //     navigate("/");
    // }

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);

            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);


    const { data: paymentIntentData } = useQuery({
        queryKey: ['createPaymentIntent', hotelId, numberOfNights.toString()],
        queryFn: () => apiClient.createPaymentIntent(hotelId, numberOfNights.toString()),
        enabled: !!hotelId && numberOfNights > 0,
    })

    const { data: hotel } = useQuery({
        queryKey: ['fetchHotelByID', hotelId],
        queryFn: () => apiClient.fetchHotelById(hotelId),
        enabled: !!hotelId
    })

    const { data: currentUser } = useQuery({
        queryKey: ['fetchCurrentUser'],
        queryFn: apiClient.fetchCurrentUser
    })


    if (!hotel) {
        return <></>;
    }


    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />
            {currentUser && paymentIntentData && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: paymentIntentData.clientSecret,
                    }}
                >
                    <BookingForm
                        currentUser={currentUser}
                        paymentIntent={paymentIntentData}
                    />
                </Elements>
            )}
        </div>
    )
}

export default Booking