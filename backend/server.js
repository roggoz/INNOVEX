const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// routes
app.use("/api/auth", require("./routes/authRoutes"));



mongoose.connect(process.env.VITE_API_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


const PORT = process.env.PORT  || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});


