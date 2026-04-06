import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { Signcontroller } from "./Controller/Signcontroller.js";
import { Logincontroller } from "./Controller/Logincontroller.js";
import Notesrouter from "./Routes/Notesrouter.js"

const app = express();
const port = process.env.PORT || 3000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongodb_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "*"
}));

// Routes
app.post("/sign", Signcontroller);
app.post("/login", Logincontroller);
app.use("/notes",Notesrouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});