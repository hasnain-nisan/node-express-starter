require("dotenv").config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// DB connect
const sequelize = require('./db/sequelize.js');

//models
const User = require('./models/User.js');


// routes files
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const port = process.env.PORT || 3000;

// routes
app.use("/api/v1/auth", authRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(port, console.log(`Server is listening on port: ${port}`));
        console.log(sequelize);
    } catch (error) {
        console.log(error);

    }
};

start();
