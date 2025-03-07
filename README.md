Workout Generator Microservices

Main Program Overview

Purpose

The Workout Generator is designed to help users create personalized workout routines based on their selected muscle groups, available equipment, and difficulty level. The system efficiently organizes exercises and provides a structured workout experience.

How It Works

User Input: The user selects muscle groups, available equipment, desired workout duration, and difficulty level.

Exercise Filtering: Microservice A filters exercises from the database based on user input.

Exercise Selection: Microservice B randomly selects exercises from the filtered list, considering the workout duration.

Workout Execution: Microservice C provides a timer for each exercise to guide the user through the workout.

Workout Summary: Microservice D collects session details and provides a summary with feedback.

Tech Stack

Frontend: React.js (handles user interface and interactions)

Backend: Node.js with Express (manages API requests and logic)

Database: MySQL (stores exercises and related data)

Microservices: Deployed as separate Node.js services for modular functionality
