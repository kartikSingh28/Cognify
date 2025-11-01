const {Router}=require("express");
const {userModel}=require("../DB/db");

const UserRouter=Router();

UserRouter.post("/signup",async (req,res)=>{
    const reqData=zod.object({
        fullName:zod.string().min(3),
        email:zod.string().email().min(5),
        password:zod.string().email().min(4),
    });

    const parseDataWithSuccess=reqData.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message:"Incorrect Data Format",
            error:parseDataWithSuccess.error,
        });
    }

    const {fullName,email,password}=parseDataWithSuccess.data;

    const hashedPassword= await bcrypt.hash(password,10);

    try{
        await userModel.create({
            fullName,
            email,
            password:hashedPassword,
            role
        });
        return res.json({
            message:'You are registered SuccessFully'
        })
    }catch(err){
        console.log(err);
        if(err.code===1000){
            res.status(400).json({
                message:"User already exists"
            })
        }else{
            res.status(500).json({
                message:"Something Went Off"
            })
        }
    }

});




UserRouter.post("/signin",async (req,res)=>{

});

module.exports={UserRouter}