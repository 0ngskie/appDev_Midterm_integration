const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./mysql/mysqlConnection');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/PolicyRoutes');
const paymentRoute = require('./routes/paymentRoute');
const claimsRoute = require('./routes/claimsRoute');
const plansRoute = require('./routes/plansRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test MySQL connection
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.use('/', userRoutes);
app.use('/', policyRoutes);
app.use('/', paymentRoute);
app.use('/', claimsRoute);  
app.use('/', plansRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});