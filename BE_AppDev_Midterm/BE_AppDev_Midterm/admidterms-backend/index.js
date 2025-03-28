<<<<<<< HEAD:admidterms-backend/index.js
const express = require("express");

const app = express();
const port_number = 4000;

// Middleware Setup
app.use(express.json());

//Routes
const userRoute = require("./routes/userRoute");
const claimRoute = require("./routes/claimsRoute");
const paymentRoute = require("./routes/paymentRoute");
const policyRoute = require("./routes/policyRoute");

// Address
app.use("/users", userRoute);
app.use('/payments', paymentRoute);  
app.use("/claims", claimRoute);
app.use("/policies", policyRoute);
const userRoute = require('./routes/userRoute');
const plansRoute = require('./routes/plansRoute');


//Address
app.use('/users', userRoute);
app.use('/plans', plansRoute);


// Running
app.listen(port_number, () => {
  console.log(`Server: http://localhost:${port_number}`);;
});;


//npm install

//Make a .env
//DB_HOST, DB_USER, DB_DATABASE

//npm install mysql
//node index.js (To Run)

//March 28 2025 12:44 Update details:
//1. Removed the following from the plansController.js: annual_amount, monthly_amount, duration_years, coverage_amount, benefits
//2. Added the Plans.js in models folder

=======
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
>>>>>>> dev/Miggy:BE_AppDev_Midterm/admidterms-backend/index.js
