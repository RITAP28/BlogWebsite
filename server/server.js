const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const corsOptions = require('./config/cors');
const postRoutes = require('./routes/postRoutes');

const PORT = 3000;
dotenv.config();

//database connection
mongoose
    .connect(
        process.env.MONGODB_URI
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// middlewares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

//routes
app.use("/api/user", userRoutes);
app.use('/user', authRoutes);
app.use('/user', postRoutes);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));