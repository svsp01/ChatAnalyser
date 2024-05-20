import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadAnalyzePage from './pages/UploadAnalyzePage';
import ResultPage from './pages/ResultPage';
import SearchHistoryPage from './pages/SearchHistoryPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/upload-analyze" element={<UploadAnalyzePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/search-history" element={<SearchHistoryPage />} />
    </Routes>
  </Router>
);

export default App;
