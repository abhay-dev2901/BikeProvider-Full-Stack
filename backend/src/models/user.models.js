import mongoose from "mongoose";
import bcrypt from "bcrypt"


// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
  });


//middleware to hash the password before saving

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})


// Static methods

userSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
        },
        process.env.ACCESS_TOKEN_SECRET,

        {
            expireIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            phone: this.phone,


        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


userSchema.method.generateRefreshTokens = function(){}

const User = mongoose.model("User",userSchema)

export default User;

