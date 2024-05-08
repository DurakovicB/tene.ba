const express = require('express');
const mysql = require('mysql');
const { exec } = require('child_process');

const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WebProgrammer',
  database: 'tene'
});

connection.connect((err) =>{
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

router.get('/shoes', (req, res) => {
  const query = 'SELECT * FROM shoe limit 100';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching shoes: ', err);
      res.status(500).json({ error: 'Failed to fetch shoes' });
      return;
    }
    res.json(results);
  });
});

// Route to fetch shoes ordered by name ascending
router.get('/shoes/name-asc', (req, res) => {
    const query = 'SELECT * FROM shoe ORDER BY name ASC LIMIT 100';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoes ordered by name (ascending): ', err);
        res.status(500).json({ error: 'Failed to fetch shoes ordered by name (ascending)' });
        return;
      }
      res.json(results);
    });
  });
  
  // Route to fetch shoes ordered by name descending
  router.get('/shoes/name-desc', (req, res) => {
    const query = 'SELECT * FROM shoe ORDER BY name DESC LIMIT 100';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoes ordered by name (descending): ', err);
        res.status(500).json({ error: 'Failed to fetch shoes ordered by name (descending)' });
        return;
      }
      res.json(results);
    });
  });
  
  // Route to fetch shoes ordered by price ascending
  router.get('/shoes/price-asc', (req, res) => {
    const query = 'SELECT * FROM shoe ORDER BY price ASC LIMIT 100';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoes ordered by price (ascending): ', err);
        res.status(500).json({ error: 'Failed to fetch shoes ordered by price (ascending)' });
        return;
      }
      res.json(results);
    });
  });
  
  // Route to fetch shoes ordered by price descending
  router.get('/shoes/price-desc', (req, res) => {
    const query = 'SELECT * FROM shoe ORDER BY price DESC LIMIT 100';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoes ordered by price (descending): ', err);
        res.status(500).json({ error: 'Failed to fetch shoes ordered by price (descending)' });
        return;
      }
      res.json(results);
    });
  });

router.get('/shoesizes', (req, res) => {
    const query = 'SELECT sizes FROM shoe'; // Assuming sizes column name is 'sizes'
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoe sizes: ', err);
        res.status(500).json({ error: 'Failed to fetch shoe sizes' });
        return;
      }
      const allSizes = results.map(result => result.sizes.split(',').map(size => size.trim())).flat(); // Split sizes string by commas, trim spaces, and flatten the resulting array
      const uniqueSizes = [...new Set(allSizes)].sort(); // Get unique sizes
      res.json(uniqueSizes);
    });
  });

router.get('/scrape', (req, res) => {
  exec('python python/main.py', (error, stdout, stderr) => {
    if (error) {
      console.error('Error running Python script: ', error);
      res.status(500).json({ error: 'Failed to run Python script' });
      return;
    }
    console.log('Python script output:', stdout);
    res.status(200).send('Python script executed successfully');
  });
});

module.exports = router;
