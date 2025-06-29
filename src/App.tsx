import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Paths from './pages/Paths/Paths';
import PathView from './pages/PathView/PathView';
import ArticleDetailView from './pages/ArticleDetailView/ArticleDetailView';
import QuestionsMenu from './pages/QuestionsMenu/QuestionsMenu';
import QuestionsEnd from './pages/QuestionsEnd/QuestionsEnd';
import QuestionsGame from './pages/QuestionsGame/QuestionsGame';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/path-view" element={<PathView />} />
          <Route path="/article-detail-view" element={<ArticleDetailView />} />
          <Route path="/questions-menu" element={<QuestionsMenu />} />
          <Route path="/questions-end" element={<QuestionsEnd/>} />
          <Route path="/questions-game" element={<QuestionsGame/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;