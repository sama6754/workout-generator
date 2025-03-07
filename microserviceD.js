const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 7496;
let min = true;

const generateFeedback = (difficulty, rating) => {
    if (rating <= 4) {
        return difficulty === "Advanced" ?
            "You crushed an advanced workout! Keep it up!" :
            "Great job! Maybe try advancing the difficulty next time!"

    } else if (rating === 5 || rating === 6) {
        return "Great job! You choose the perfect difficulty for your skill level!"
    } else {
        return difficulty === "Beginner" ?
            "Don't worry, every start is tough. Keep going!" :
            "This workout might have been too intense. Consider lowering the difficulty next time."
    }
}

const convert = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const rem = seconds % 60;
    if (minutes === 0) {
        min = false;
    }
    return `${minutes}:${rem < 10 ? '0' : ''}${rem}`;
}

const summary = (req, res) => {
    let {duration, muscles, difficulty, time, rating} = req.body;

    duration = duration * 60
    duration = duration - time;
    duration = convert(duration)

    const durationText = min === true ? `${duration} minutes` : `${duration} seconds`;
    const feedback = generateFeedback(difficulty, rating);

    const result = {
        duration: durationText,
        muscles: muscles.join(','),
        difficulty,
        rating: `${rating}/10`,
        feedback: feedback
    };

    res.json(result);

}

app.post('/summary', summary);
app.listen(PORT, () => console.log(`Microservice D running on ${PORT}`));