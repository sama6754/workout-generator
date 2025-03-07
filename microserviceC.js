const WebSocket = require('ws');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 2456;

const wss = new WebSocket.Server({port: 8080});

let connectedClients = [];
let interval = null;
let remainingTime = 0;

wss.on('connection', (ws) => {
    console.log('Client Connected');
    connectedClients.push(ws);

    ws.on('close', () => {
        console.log('Client Disconnected');
        connectedClients = connectedClients.filter(client => client !== ws);
    });
});

const startTimer = (req, res) => {
    const {duration} = req.body;

    if (interval) clearInterval(interval);

    let remainingTime = duration * 60

    interval = setInterval(() => {
        remainingTime--;

        connectedClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({remainingTime}));
            }
        });

        if (remainingTime <= 0) {
            clearInterval(interval);
            interval = null;
            broadcastMessage({status: 'workout_completed'});
        }
    }, 1000);
}

const stopTimer = (req, res) => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        broadcastMessage({status: 'workout_completed'});
    }

}

const broadcastMessage = (message) => {
    connectedClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

app.post('/start', startTimer);
app.post('/stop', stopTimer)
app.listen(PORT, () => console.log(`Micorservice C running on port ${PORT}`));