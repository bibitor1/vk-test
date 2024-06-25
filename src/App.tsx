import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsFeed from './pages/NewsFeed';
import News from './pages/News';
import Favorites from './pages/Favorites';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
