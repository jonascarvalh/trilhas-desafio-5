import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Paths from './pages/Articles/Articles';
import PathView from './pages/PathView/PathView';
import ArticleDetailView from './pages/ArticleDetailView/ArticleDetailView';
import QuestionsMenu from './pages/QuestionsMenu/QuestionsMenu';
import QuestionsEnd from './pages/QuestionsEnd/QuestionsEnd';
import QuestionsGame from './pages/QuestionsGame/QuestionsGame';
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/PublicRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/articles" element={<Paths />} />
          <Route path="/path-view" element={<PathView />} />
          <Route path="/article/:id" element={<ArticleDetailView />} />
          <Route path="/questions-menu" element={<QuestionsMenu />} />
          <Route path="/questions-end" element={<QuestionsEnd/>} />
          <Route path="/questions-game" element={<QuestionsGame/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;