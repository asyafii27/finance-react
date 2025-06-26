import './App.css';
import MainContent from './components/main/MainContent';
import CompanyPage from './pages/company';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </Router>
  );
}

export default App;