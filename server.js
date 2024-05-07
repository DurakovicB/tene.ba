const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { exec } = require('child_process'); // Import exec from child_process module

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

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

app.get('/shoes', (req, res) => {
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

// Route to run Python script
app.get('/scrape', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
