//Local Server with Port 4000
const express = require('express');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port_number = 4000;


// Enable CORS for frontend (localhost:3000)
app.use(cors());

//Middleware Setup
app.use(express.json());

// Routes
const userRoute = require('./routes/userRoute');
const policyRoute = require('./routes/policyRoute');
const plansRoute = require('./routes/plansRoute');
const claimRoute = require('./routes/claimsRoute');
const paymentRoute = require('./routes/paymentRoute');
//Address
app.use('/users', userRoute);
app.use('/policy', policyRoute);
app.use('/plans', plansRoute);
app.use('/claims', claimRoute);
app.use('/payments', paymentRoute);

// Catch-all for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Running the server
app.listen(port_number, () => {
  console.log(`Server: http://localhost:${port_number}`);
});

//npm install

//Make a .env
//DB_HOST, DB_USER, DB_DATABASE

//npm install mysql
//node index.js (To Run)

//March 31 2025 9:37pm Update details:
//1. Modified everything to accomodate the new database scheme


