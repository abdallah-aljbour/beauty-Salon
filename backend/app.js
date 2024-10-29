const express = require('express');
const app = express();
const salonDetailsRouter = require('./routes/salonDetailsRouter');
const userRoutes = require('./routes/userRoutes');

// ... other middleware ...

// Register the routes
app.use('/api/salon-ownerDahboord', salonDetailsRouter);
app.use('/api/users', userRoutes);

// ... rest of your app configuration ... 