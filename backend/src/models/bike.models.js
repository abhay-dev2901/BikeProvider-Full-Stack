import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  bike_brand: { type: String, required: true },
  bike_model: { type: String, required: true },
  bike_category: { type: String, required: true },
  year_of_manufacture: { type: Number, required: true },
  bike_condition: { type: String, required: true },
  rental_price_daily: { type: Number, required: true },
  rental_price_weekly: { type: Number, required: true },
  rental_price_monthly: { type: Number, required: true },
  availability_schedule: { type: String, required: true },
  minimum_rental_duration: { type: Number, required: true },
  maximum_rental_duration: { type: Number, required: true },
  bike_image_url: { type: String, default: '' },
  accessories: { type: String, required: true },
  bike_specifications: { type: String, required: true },
  bike_insurance_url: { type: String, default: '' },
  ownership_documents_url: { type: String, default: '' },
  maintenance_records_url: { type: String, default: '' },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
});

bikeSchema.statics.findAll = async function () {
  try {
    const bikes = await this.find();
    return bikes;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

bikeSchema.statics.findBy = async function (column, value) {
  try {
    const query = {};
    query[column] = value;
    const bike = await this.findOne(query);
    return bike;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

bikeSchema.statics.updateById = async function (id, updateFields) {
  try {
    const bike = await this.findByIdAndUpdate(id, updateFields, { new: true });
    return bike;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;
