const mongoose = require("mongoose"); // Import the Mongoose library to interact with MongoDB
require("dotenv").config(); // Load environment variables from the .env file

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, log the host of the connected MongoDB instance
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error during connection, log the error and exit the process with a failure code
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with a status code of 1 to indicate an error
  }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;

//conn : is the connection object returned by mongoose.connect().
//conn.connection : is an object that provides information about the MongoDB connection.
//conn.connection.host : is a property of the connection object that contains the hostname of the MongoDB server to which you are connected.
