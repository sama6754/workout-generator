import {useState, React} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Questions from './pages/question';

function App() {

  return (
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question" element={<Questions />} />
        </Routes>
        </div>
      </Router>
  );
}
export default App;