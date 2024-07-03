import Bike from '../models/bike.models.js';
import { ApiError } from '../utils/ApiError.js';

// Create a new bike
const createBike = async (req, res) => {
  const {
    bike_brand, bike_model, bike_category, year_of_manufacture,
    bike_condition, rental_price_daily, rental_price_weekly,
    rental_price_monthly, availability_schedule, minimum_rental_duration,
    maximum_rental_duration, bike_image_url, accessories, bike_specifications,
    bike_insurance_url, ownership_documents_url, maintenance_records_url,
    business_id
  } = req.body;

  if (
    [bike_brand, bike_model, bike_category, year_of_manufacture, bike_condition,
      rental_price_daily, rental_price_weekly, rental_price_monthly, availability_schedule,
      minimum_rental_duration, maximum_rental_duration, accessories, bike_specifications, business_id]
      .some(field => !field)
  ) {
    res.status(400).json({msg:"Plz fill all the required feilds"})
  }

  try {
    const newBike = await Bike.create({
      bike_brand, bike_model, bike_category, year_of_manufacture,
      bike_condition, rental_price_daily, rental_price_weekly,
      rental_price_monthly, availability_schedule, minimum_rental_duration,
      maximum_rental_duration, bike_image_url, accessories, bike_specifications,
      bike_insurance_url, ownership_documents_url, maintenance_records_url,
      business_id
    });

    return res.status(201).json({msg:"Bike created successfully"});
  } catch (error) {
    console.error('Error creating bike:', error);
    throw new ApiError(500, 'Failed to create bike');
  }
};

// Get all bikes
const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.findAll();
    console.log(bikes)
    return res.status(200).json({msg:"Bikes retrived successfully"});
    
  } catch (error) {
    console.error('Error getting bikes:', error);
    throw new ApiError(500, 'Failed to get bikes');
  }
};

// Get bike by ID
const getBikeById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const bike = await Bike.findById(id);
      if (!bike) {
        throw new ApiError(404, 'Bike not found');
      }
      console.log(bike)
      return res.status(200).json({msg:"Bike retrieved successfully"});
      
    } catch (error) {
      console.error('Error getting bike:', error);
      
      throw new ApiError(500, 'Failed to get bike');
    }
  };
  

// Update bike by ID
const updateBikeById = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedBike = await Bike.updateById(id, updateFields);
    if (!updatedBike) {
      throw new ApiError(404, 'Bike not found');
    }
    return res.status(200).json({msg:"Bike updated successfully"});
  } catch (error) {
    console.error('Error updating bike:', error);
    throw new ApiError(500, 'Failed to update bike');
  }
};

// Delete bike by ID
const deleteBikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBike = await Bike.findByIdAndDelete(id);
    if (!deletedBike) {
      throw new ApiError(404, 'Bike not found');
    }
    return res.status(200).json({msg:"Bike deleted successfully"});
  } catch (error) {
    console.error('Error deleting bike:', error);
    throw new ApiError(500, 'Failed to delete bike');
  }
};

export {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBikeById
};
