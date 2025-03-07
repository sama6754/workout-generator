var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 4756;

const selectExercises = (req, res) => {
    const {exercises, duration} = req.body;
    console.log(exercises);
    let numExercises = exercises.length;
    let result = new Array();
    let difficulty;
  

    if (duration < 20) {
        difficulty = 4;
    } else if (duration > 19 && duration < 40) {
        difficulty = 6;
    } else {
        difficulty = 8;
    }

    if (numExercises < difficulty) {
        return res.json({
            message: "Not enough exercises available for selected duration",
            result: exercises
        });
    }

    let selectedNums = new Set();

    while (difficulty > 0) {
        num = Math.floor(Math.random() * numExercises);

        if (!selectedNums.has(num)) {
            selectedNums.add(num);
            result.push(exercises[num]);
            difficulty -= 1;
        }
    }
    res.json({result})
}

app.post("/select", selectExercises);
app.listen(PORT, () => console.log(`Microservice B running on port ${PORT}`));

