const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const ObjectId=Schema.Types.ObjectId;

const userSchema=new Schema({
    fullName:{type:String,unique:true,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    createdAt:{type:Date,default:Date.now}
});

const userModel=mongoose.model("user",userSchema);

module.exports={
    userModel
},