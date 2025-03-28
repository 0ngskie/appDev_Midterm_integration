//Local Server with Port 4000
const express = require('express');
const cors = require('cors');

const app = express();

const port_number = 4000;

//Middleware Setup
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend's port
  credentials: true
}));

//Routes
const userRoute = require('./routes/userRoute');

//Address
app.use('/users', userRoute);

//Running
app.listen(port_number, () => {
    console.log(`Server: http://localhost:${port_number}`)
})

//npm install

//Make a .env
//DB_HOST, DB_USER, DB_DATABASE

//node index.js (To Run)    
