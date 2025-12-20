import User from "../models/UserModel";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


//REGISTER USER//

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, address } = req.body;

        //VALIDATION//
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "name, email, and password are required"
            });
        }

        //CHECK EXISTING USER//
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exist",
            });
        }

        //HASH PASSWORD//
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)



        //CREATE USER//

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobileNumber,
            address,
        });
        res.status(201).json({
            message: "User registerd successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },

        });

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        });

    }
};






//LOGIN USER//

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "email and password required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "invalid user"
            });
        }

        const testPassword = await bcrypt.compare(password, user.password);
        if (!testPassword) {
            return res.status(401).json({
                message: "password not match"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
            ,
        );

        res.status(200).json({
            message: "login successful",
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        });
    }
};



//GET ALL USER//
export const getAllUsers = async (req , res) => {

    try {
        const users = await User.find()
        res.status(200).json({
            users,
        })

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        });

    }
};


//GET USER BY ID//

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


//UPDATE USER//


export const updateUser = async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            message: "user updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        });

    }
};


//DELETE USER//


export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



//LOGOUT USER//
export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful",
        });
        
    } catch (error) {
        res.status(500).json({

            message: "Server error",
            error: error.message
        });
    }
};