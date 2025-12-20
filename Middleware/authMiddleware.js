import  jwt from "jsonwebtoken";
import User from "../models/UserModel";


export const requireSignIn = async (req , res , next)=>{
    try {
        

        const token=
        req.header.authorization && 
        req.header.authorization.startsWith("Bearer")?
        req.header.authorization.split("")[1]
        :null;

if(!token){
    return res.status (401).json({
        message:"access denied. token missing",
    });
}

const decoded =jwt.verify(token,process.env.JWT_SECRET);
req.user =decoded;
next();

    } catch (error) {
        return res.status(401).json({
            message:"invalid or expired token",
        });
    }
};



//ADMIN MIDDLEWARE//

export const isAdmin= async (req ,res , next)=>{
    try {
        const user =await User.findById(req.user.id);
        if(!user ||user.role !=="admin"){
            return res.status(403).json({
                message:"admin access denied",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            message:"server error",
            error:error.message
        });
    }
};