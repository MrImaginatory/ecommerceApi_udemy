import { app } from "./app.js";
import dotenv from 'dotenv/config';
import { connectDB } from "./database/db.js";

connectDB()
    .then(()=>{
       console.log("🍃 Database Connected SuccessFully");
    })
    .then(()=>{
         app.listen(process.env.PORT,()=>{
            console.log(`📡 Server Up and Running at port: ${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.error("Error Connecting DB: Index.js",error);
    })
