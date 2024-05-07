const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import the routes module

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/', routes); // Mount the routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
