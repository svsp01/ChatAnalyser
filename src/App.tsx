import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadAnalyzePage from './pages/UploadAnalyzePage';
import ResultPage from './pages/ResultPage';
import SearchHistoryPage from './pages/SearchHistoryPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/upload-analyze" element={<UploadAnalyzePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/search-history" element={<SearchHistoryPage />} /> */}
    </Routes>
  </Router>
);

export default App;
