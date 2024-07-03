import Business from '../models/business.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { BusinessDataValidator } from '../utils/businessDataValidator.js'; // Import the validator

// Create a new business
const createBusiness = asyncHandler(async (req, res) => {
    const { businessName, businessAddress, businessRegistrartionNumber, PAN, GST } = req.body;
    const image_url = req.file ? req.file.path : '';


    // Validate business data
    const validation = await BusinessDataValidator.validateBusinessData({
        business_name: businessName,
        business_address: businessAddress,
        business_registration_number: businessRegistrartionNumber,
        PAN,
        GST
    });

    // check for valid images

    if (validation.isInputValid) {
        return res.status(403).json({ msg: validation.msg });
    }

    const business = await Business.create({
        businessName,
        businessAddress,
        businessRegistrartionNumber,
        PAN,
        image_url,
        GST,
    });

    return res.status(201).json({ msg: "Business created successfully", business });
});

// Get all businesses
const getAllBusinesses = asyncHandler(async (req, res) => {
    const businesses = await Business.find();
    return res.status(200).json({ msg: "Businesses retrieved successfully", businesses });
});

// Get a business by ID
const getBusinessById = asyncHandler(async (req, res) => {
    const business = await Business.findById(req.params.id);
    if (!business) {
        throw new ApiError(404, "Business not found");
    }
    return res.status(200).json({ msg: "Business retrieved successfully", business });
});

// Update a business by ID
const updateBusinessById = asyncHandler(async (req, res) => {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!business) {
        throw new ApiError(404, "Business not found");
    }
    return res.status(200).json({ msg: "Business updated successfully", business });
});

// Delete a business by ID
const deleteBusinessById = asyncHandler(async (req, res) => {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
        throw new ApiError(404, "Business not found");
    }
    return res.status(200).json({ msg: "Business deleted successfully" });
});

export { createBusiness, getAllBusinesses, getBusinessById, updateBusinessById, deleteBusinessById };
