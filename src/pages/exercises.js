import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/exercisePage.css'

function Exercises() {
    const [Data, setData] = useState(null);
    const [secondResult, setResult] = useState(null);
    const [searchParams] = useSearchParams();
    const duration = searchParams.get('duration');
    const muscles = searchParams.get('muscles');
    const equipment = searchParams.get('equipment');
    const difficulty = searchParams.get('difficulty');

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                console.log('Fetching preferences with:', { duration, muscles, equipment, difficulty });
                // Fetch exercises based on preferences
                const response = await fetch('http://localhost:3001/preferences', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        muscle_group: muscles,
                        equipment,
                        difficulty_level: difficulty,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Preferences response received:', result);
                    setData(result);

                    console.log('Fetching exercises with:', { data: result, duration });

                    // Fetch the exercises after preferences are retrieved
                    const secondResponse = await fetch('http://localhost:4756/select', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            exercises: result,  // Send the fetched preferences here
                            duration,
                        }),
                    });

                    console.log('Exercise selection request sent with:', {
                        exercises: result,
                        duration,
                    });

                    if (secondResponse.ok) {
                        const secondResult = await secondResponse.json();
                        console.log('Selected exercises response received:', secondResult);
                        
                        if (Array.isArray(secondResult.result)) {
                            setResult(secondResult);
                        }

                        console.log('Selected exercises response received:', secondResult);
                    } else {
                        console.error('Error fetching selected exercises');
                    }
                } else {
                    console.error('Error fetching preferences');
                }
            } catch (error) {
                console.error('Error during fetch operations', error);
            }
        };

        fetchExercises();
    }, [duration, muscles, equipment, difficulty]);

    return (
        <div className="exercise-page">
            <h2>Your Workout</h2>
            {secondResult && Array.isArray(secondResult.result) ? (
                secondResult.result.length > 0 ? (
            <div className="exercise-container">
                <ul>
                    {secondResult.result.map((exercise, index) => (
                        <li key={index}>
                            <h3>{exercise.exercise_name}</h3>
                            <p><strong>Muscles: </strong>{exercise.muscle_group}</p>
                            <p><strong>Equipment: </strong>{exercise.equipment}</p>
                            <p><strong>Difficulty Level: </strong>{exercise.difficulty_level}</p>
                         </li>
                    ))}
                </ul>
            </div>
            ) : (
                <p>No exercises found matching your preferences</p>
            )
            ) : (
                <p>Loading exercises...</p>
            )}

        <Link to={`/timer?duration=${duration}&muscles=${muscles}&difficulty=${difficulty}`}>
              <button> Start Workout </button>
        </Link>
        </div>
    );
}
export default Exercises;