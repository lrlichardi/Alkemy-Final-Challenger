require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// log morgan
app.use(morgan('dev'));

// Routes
app.use('/' , require('./routes/usersRoutes'))
app.use('/' , require('./routes/budgetRoutes'));


// Port
app.listen( process.env.PORT || 3002, () => {
    console.log(`Server on PORT ${process.env.PORT}`);
});