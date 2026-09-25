require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
  res.json({message: "E-commerce API is running"});
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});