import './App.css';
import MainContent from './components/main/MainContent';
import CompanyPage from './pages/company';
import LoginPage from './pages/auth/Login';
import IncomePage from './pages/income/index';
import IncomeCreatePage from './pages/income/create';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path='/income/create' element={<IncomeCreatePage />}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;