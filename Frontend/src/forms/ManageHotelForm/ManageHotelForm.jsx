import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';


const initialFormData = {
  name: '',
  city: '',
  country: '',
  description: '',
  type: '',
  pricePerNight: 0,
  starRating: 0,
  facilities: [],
  imageFiles: null,
  imageUrls: [],
  adultCount: 0,
  childCount: 0,
};

function ManageHotelForm({ onSave, isLoading, hotel }) {
    const formMethods = useForm({ defaultValues: initialFormData });
    const { handleSubmit, reset } = formMethods;
  
    useEffect(() => {
      reset(hotel || initialFormData);
    }, [hotel, reset]);
  
    const onSubmit = handleSubmit((formDataJson) => {
      const formData = new FormData();
      if (hotel) {
        formData.append('hotelId', hotel._id);
      }
      formData.append('name', formDataJson.name);
      formData.append('city', formDataJson.city);
      formData.append('country', formDataJson.country);
      formData.append('description', formDataJson.description);
      formData.append('type', formDataJson.type);
      formData.append('pricePerNight', formDataJson.pricePerNight.toString());
      formData.append('starRating', formDataJson.starRating.toString());
      formData.append('adultCount', formDataJson.adultCount.toString());
      formData.append('childCount', formDataJson.childCount.toString());
  
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
  
      if (formDataJson.imageUrls) {
        formDataJson.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }
  
      if (formDataJson.imageFiles) {
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
          formData.append('imageFiles', imageFile);
        });
      }
  
      onSave(formData);
    });
  
    return (
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </span>
        </form>
      </FormProvider>
    );
}

export default ManageHotelForm