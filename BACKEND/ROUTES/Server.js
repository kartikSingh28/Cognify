require('dotenv').config()

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const {UserRouter}=require("../ROUTES/User");

app.use(express.json());

app.use("/api/v1/buyer",UserRouter);

async function main() {
    try{
        await mongoose.connect(process.env.MONGO__URL);
        console.log("Connected to Mongo");
        app.listen(3000,()=>{
            console.log("Server started at port 3000")
        });
    }catch(err){
        console.log("Could not connect to database",err.message);
    }
}

main();
