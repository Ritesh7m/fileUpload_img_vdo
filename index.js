const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// Database Connection
const db = require("./config/database");
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();  
// Routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload); 

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
