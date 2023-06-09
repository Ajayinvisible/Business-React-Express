import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        requiyred:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    password:{
        type:String,
        required:true
    }, 
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
},{ versionKey: false });

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

UserSchema.methods.getSignedJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

UserSchema.methods.toJSON = function (){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model("user",UserSchema);