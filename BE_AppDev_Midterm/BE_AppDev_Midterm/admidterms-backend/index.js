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

