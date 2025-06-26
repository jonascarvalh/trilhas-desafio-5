import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Paths from './pages/Paths/Paths';
import PathView from './pages/PathView/PathView';
import ArticleDetailView from './pages/ArticleDetailView/ArticleDetailView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/path-view" element={<PathView />} />
        <Route path="/article-detail-view" element={<ArticleDetailView />} />
      </Routes>
    </Router>
  );
};

export default App;