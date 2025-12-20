
import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";



dotenv.config();

const app=express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

connectDB();

app.get('/',(req , res )=>{
    res.send('✅  welcome to my website');
});

const PORT=3000


app.listen(PORT,()=>{
    console.log("✅ server is running on PORT 3000");
    
})
//ROUTES//

app.use("/api/users", userRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);