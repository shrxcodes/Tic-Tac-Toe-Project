const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON requests
app.use(express.json());

// POST endpoint to save winner info
app.post('/save', (req, res) => {
  const winner = req.body.winner;
  fs.appendFileSync('history.txt', `Winner: ${winner}\n`);
  res.send({ message: 'Saved' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
