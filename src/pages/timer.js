import React, {useState, useEffect } from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import '../styles/timerPage.css';

const Timer = () => {
    const [searchParams] = useSearchParams();
    const duration = searchParams.get('duration');
    const muscles = searchParams.get('muscles');
    const difficulty = searchParams.get('difficulty');
    let time = duration;

    const [formattedTime, setFormattedTime] = useState('');
    const navigate = useNavigate();

    const convert = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const rem = seconds % 60;
        return `${minutes}:${rem < 10 ? '0' : ''}${rem}`;
    }

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');
        
        websocket.onopen = () => {
            console.log('Connected to WebSocket');
        }

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.status === 'workout_completed') {
                alert('Workout Complete! Redirecting to feedback page...');
                navigate(`/feedback?duration=${duration}&muscles=${muscles}&difficulty=${difficulty}&time=${time}`);
            } else {
                const remainingTime = message.remainingTime;
                const formatTime = convert(remainingTime);
                setFormattedTime(formatTime);
                time = message.remainingTime;
            }
        }

        return () => {
            websocket.close();
        }
    }, [navigate]);

    const startTimer = async () => {
        console.log("Start Timer clicked");
        try {
            await fetch('http://localhost:2456/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({duration}),
            });
                    
        } catch (error) {
            console.error('Error starting the timer:', error);
        }
    };

    const stopWorkout = async () => {
        console.log("Workout Stopped");
        try {
            const response = await fetch('http://localhost:2456/stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data.status);

        } catch (error) {
            console.error('Error stopping the timer', error);
        }
    }

return (
    <div className="timer-page">
        <div className="timer-title">
            <h2>Track your workout duration effortlessly with our built-in timer - no need for extra apps!</h2>
        </div>
        <div className="timer-container">
            <div className="timer-display">
                <h2>Time Remaining: {formattedTime || convert(duration * 60)}</h2>
            </div>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopWorkout}>Stop Workout</button>
        </div>
    </div>
);
};

export default Timer;
