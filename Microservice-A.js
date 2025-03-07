var express = require('express');
var app = express();
const db = require("./connector");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = 3001;

// Get user's workout preferences
app.post("/preferences", (req, res) => {
   let data = req.body; // Receives data from the request body.

   let muscles = data['muscle_group'].split(',').map(muscle => `'${muscle.trim()}'`).join(',');
   let equipment = data['equipment'].split(',').map(item => `'${item.trim()}'`).join(',');
   let difficulty = data['difficulty_level'].split(',').map(level => `'${level.trim()}'`).join(',');

   // SQL query retrieves exercises based on the user's workout preferences. 
   query = `
    SELECT * FROM Exercises
    WHERE muscle_group IN (${muscles}) 
    AND equipment IN (${equipment}) 
    AND difficulty_level IN (${difficulty})
  `;
    db.pool.query(query, function(error, rows, fields) {
      if (error) {
        console.error("Database error:", error);
        res.status(500).json({ Error: "Failed to retrieve exercises.", error });
      } else if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ Error: "No exercises found matching workout preferences." });
      }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});