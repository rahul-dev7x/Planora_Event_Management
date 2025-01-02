import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import authRouter from "./routes/user.routes.js"
import dbConnection from './database/db.js';
import eventRouter from "./routes/event.routes.js"
const app=express();
dotenv.config();

 app.use(cookieParser());
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: [
    process.env.USER_FRONTEND_URL, 
    process.env.EVENT_FRONTEND_URL,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });

app.use("/api/auth",authRouter)
app.use("/api/event",eventRouter)

const PORT =9000 || process.env.PORT;

app.get("/",(req,res)=>{
  res.json({message:"Backend Running"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});