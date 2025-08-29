import express from "express";
import bodyParser from "body-parser";

// Import routes
import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/users.mjs";
import productRoutes from "./routes/products.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route registrations
app.use('/', authRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);



// Default root
app.get("/", (req, res) => {
  res.send("<h1>Hello from Express App</h1>");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
