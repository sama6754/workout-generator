import {useState, React} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Questions from './pages/question';
import Timer from './pages/timer';
import Exercises from './pages/exercises';
import Feedback from './pages/feedback';
import Summary from './pages/summary';

function App() {

  return (
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question" element={<Questions />} />
          <Route path="/timer" element={<Timer/>} />
          <Route path="/exercises" element={<Exercises/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/summary" element={<Summary/>} />
        </Routes>
        </div>
      </Router>
  );
}
export default App;