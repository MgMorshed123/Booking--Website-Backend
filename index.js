import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authroutes from './api/route/auth.js'
import usersroutes from './api/route/users.js'
import hotelsroutes from './api/route/hotels.js'
import roomsroutes from './api/route/rooms.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json())

async function main() {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other connection options
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  
}

main();

app.get("/", (req, res) => {
  res.send("Connected");
});


mongoose.connection.on("disconnected", () => {
    console.log("MongoDb DisConnected");
})


mongoose.connection.on("connected", () => {
    console.log("MongoDb Connected");
})

app.use("/api/auth", authroutes);
app.use("/api/users", usersroutes);
app.use("/api/hotels", hotelsroutes);
app.use("/api/rooms", roomsroutes);


// middleware error
app.use((err,req,res,next) => {
 
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  
  return res.status(errorStatus).json({
    success : false,
    status :errorStatus,
    message :errorMessage,
    stack : err.stack,

  })

})








app.listen(8800, () => {
 
    console.log("connectd");
    main()
})