import Business from "../models/business.models.js";

class BusinessDataValidator {
    static async validateBusinessData(businessData) {
        const { business_name, business_address, business_registration_number, PAN, GST } = businessData;
        if (!business_name || !business_address || !business_registration_number || !PAN || !GST) {
            return {
                isInputValid: true,
                msg: "All fields are required",
            };
        }

        let business = await Business.findOne({ business_registration_number });
        if (business) {
            return {
                isInputValid: true,
                msg: "Business with the same registration number already exists",
            };
        }

        business = await Business.findOne({ business_name });
        if (business) {
            return {
                isInputValid: true,
                msg: "Business with the same name already exists",
            };
        }
        
        return {
            isInputValid: false,
        };
    }
}

export { BusinessDataValidator };