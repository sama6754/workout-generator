import React, {useState} from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import '../styles/feedbackPage.css'

function Feedback() {
    const [formData, setFormData] = useState({
        Rating: ''
    });
    
    const handleChange = (e) => {
        const {value} = e.target;
        setFormData({
            ...formData,
            Rating: value
        });   
    };

    const [searchParams] = useSearchParams();
    const duration = searchParams.get('duration');
    const muscles = searchParams.get('muscles');
    const difficulty = searchParams.get('difficulty');
    const time = searchParams.get('time');

    return (
        <div className="feedback-container">
            <h2>How would you rate your workout?</h2>
            <div className="star-rating">
                {[...Array(10)].map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleChange({target: {value: index + 1}})}
                        style={{
                            cursor: "pointer",
                            fontSize: "24px",
                            color: formData.Rating >= index + 1 ? "RebeccaPurple" : "gray"
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <Link to={`/summary?duration=${duration}&muscles=${muscles}&difficulty=${difficulty}&time=${time}&rating=${formData.Rating}`}>
                <button> Submit </button>
            </Link>
        </div>
        )
    }

export default Feedback;