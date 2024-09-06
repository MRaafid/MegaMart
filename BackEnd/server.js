const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handle Uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Setting up config file
if (process.env.NODE_ENV !== `PRODUCTION`)
  require("dotenv").dotenv.config({ path: "BackEnd/config/config.env" });

// Connecting to Database
connectDatabase();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.stack}`);
  console.log(`Shutting down the server due to unhandled promise rejections`);
  Server.close(() => {
    process.exit(1);
  });
});
