import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

// routers ===================
import products_api from "./routers/products/api.js";
import users_api from "./routers/users/api.js";

// utils =====================
import F400 from "./utils/F400.js";

dotenv.config();

await mongoose.connect(process.env.E_COMMERCE_DB);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products/", products_api);
app.use("/api/users/", users_api);
app.use("/api/uploads", express.static("./uploads"));

app.all("*", (req, res) => {
  res.status(404).json(F400("Can not find this page"));
});
app.listen(Number(process.env.PORT));
