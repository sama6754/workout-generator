import React, {useEffect, useState} from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import '../styles/summaryPage.css'

function Summary() {

    const [summaryData, setSummaryData] = useState(null);
    
    const [searchParams] = useSearchParams();
    const duration = searchParams.get('duration');
    const muscles = searchParams.get('muscles').split(',');
    const difficulty = searchParams.get('difficulty');
    const time = searchParams.get('time');
    const rating = searchParams.get('rating');

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch('http://localhost:7496/summary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        duration,
                        muscles,
                        difficulty,
                        time,
                        rating,
                    }),
                });
                console.log("Request sent to /summary:");
                
                if (response.ok) {
                    const result = await response.json()
                    console.log("Request Data:", result)
                    setSummaryData(result);
                } else {
                    console.error('Error')
                }
            } catch (error) {
                console.error('Error: ', error)
            } 
        };
        fetchSummary();
    }, [duration, muscles, difficulty, time, rating]);

    return (
    <div className="summary-page">
        <header>
            <div className="homepage-purple-square">
                <h1>Workout Generator</h1>
            </div>
        </header>
        <div className="workout-header">
            <h2>You did it! You should feel proud.</h2>
        </div>
        <div className="summary-container">
            {summaryData ? (
            <div className="summary-info">
            <h3>Workout Summary</h3>
            <p><strong>Duration:</strong> {summaryData.duration}</p>
            <p><strong>Muscles Worked:</strong> {summaryData.muscles}</p>
            <p><strong>Difficulty:</strong> {summaryData.difficulty}</p>
            <p><strong>Rating:</strong> {summaryData.rating}</p>
            <p><strong>Feedback:</strong> {summaryData.feedback}</p>
            <Link to="/">
                <button>Homepage</button>
            </Link>
            </div>
            ) : (
            <p>No summary data available</p>
             )}
         <img src="/summary.png" alt= "Signs" className="summary-image" />
        </div>
    </div>
  );
}


export default Summary;