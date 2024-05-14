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

router.get('/removebs', (req, res) => {
  const query = 'delete from shoe where name like "Jibbitz%" or sizes like "%OS%" or sizes like"%UNI%" or sizes like "%XSS%" or sizes like "%Standard%" ';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error removing bs: ', err);
      res.status(500).json({ error: 'Failed to remove bs' });
      return;
    }
    //res.json(results);
  });
});

// Define the route to handle dynamic queries
router.post('/shoes/query', (req, res) => {
    // Parse JSON data from request body
    //console.log(req.body);
    const { sortBy, asc_desc, sex, sizes,brands } = req.body;
    // Construct base SQL query
    let query = 'SELECT * FROM shoe join store on shoe.store_id = store.store_id';
  
    // Add WHERE clause for filtering by parameters
    const whereConditions = [];
  

    // Filter by sizes
    if (sizes && sizes.length > 0) {
      const sizeConditions = sizes.map(size => `sizes LIKE '%${size}%'`).join(' OR ');
      whereConditions.push(`(${sizeConditions})`);
    }
  
    // Filter by sex
    if (Array.isArray(sex) && sex.length > 0) {
      // If sex is an array (multiple checkboxes selected), use IN operator
      const sexValues = sex.map(s => `'${s}'`).join(', '); // Surround each value with quotes
      whereConditions.push(`sex IN (${sexValues})`);
    } 
  
    // Filter by brand
    if (Array.isArray(brands) && brands.length > 0) {
      // If brands is an array (multiple checkboxes selected), use IN operator
      const brandValues = brands.map(s => `'${s}'`).join(', '); // Surround each value with quotes
      whereConditions.push(`brand IN (${brandValues})`);
    } 
  
    // Construct WHERE clause if there are any conditions
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }
  
    // Add ORDER BY clause for sorting
    if (sortBy && ['name', 'price'].includes(sortBy)) {
      const order = asc_desc === 'desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY ${sortBy} ${order} `;
    }
    query += ' limit 100';
  
    // Execute the constructed query
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Failed to execute query' });
        return;
      }
      res.json(results); // Return results as JSON
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

  router.get('/shoebrands', (req, res) => {
    const query = 'SELECT distinct brand FROM shoe'; // Assuming sizes column name is 'sizes'
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching shoe brands: ', err);
        res.status(500).json({ error: 'Failed to fetch shoe brands' });
        return;
      }
      const brands = results.map(row => row.brand);
      res.json(brands);
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

    router.handle({ method: 'get', url: '/removebs' }, res, () => {});
    res.status(200).send('Python script executed successfully');
  });
});


module.exports = router;
