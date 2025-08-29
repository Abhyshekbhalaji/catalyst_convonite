import express from "express";
import bodyParser from "body-parser";

// Import routes
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/users.mjs";
import productRoutes from "./routes/products.js";


const app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route registrations
app.use('/', authRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);




app.get("/", (req, res) => {
  res.send("<h1>Hello and do check out other routes like /signin , /signup and /orders from postman</h1>");
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});


const PORT=process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
