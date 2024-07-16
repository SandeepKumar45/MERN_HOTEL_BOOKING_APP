import { Hotel } from "../models/hotel.model.js"
import cloudinary from "cloudinary";

export const addHotel = async ( req, res ) => {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
    
        const imageUrls = await uploadImages(imageFiles);
    
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
    
        const hotel = await Hotel.create(newHotel);
    
        res.status(201).send(hotel);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
      }
}


async function uploadImages(imageFiles) {
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.uploader.upload(dataURI);
      return res.url;
    });
  
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  }

export const viewHotels = async ( req, res ) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
}

export const viewHotelById = async ( req, res ) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
}

export const editHotelById = async ( req, res ) => {
  try {
    const updatedHotel = req.body;
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files;
    if (files) {
      const updatedImageUrls = await uploadImages(files);
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
    }

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went throw" });
  }
}