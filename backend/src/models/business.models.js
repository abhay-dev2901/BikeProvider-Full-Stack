import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
    
    {
        businessName: {
            type:String,
            required: true
        },
        businessAddress: {
            type: String,
            required: true,
        },
        businessRegistrartionNumber: {
            type: String,
            required: true
        },
        PAN: {
            type: String,
            required: true
        },
        GST: {
            type: String,
            required: true,
        },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            
        },
          image_url: {
            type: String,
            default: '',

        },
          business_account_number: {
            type: String,
            default: '',
        },
    }
    ,{timestamps:true});

const Business = mongoose.model("Business",businessSchema);

export default Business;




