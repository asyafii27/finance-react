import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoEda from '../../assets/icon/logo_eda.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const LoginPage = () => {

  const baseUrl = 'http://localhost:3000';

  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Login berhasil!');
      console.log('Login successful:', data);
      setTimeout(() => {
        navigate('/')
      }, 1000); // delayy agar terlihat toast nya

    } catch (error) {
      console.log(error);
      setError('Error message: ' + error.message);
      toast.error('Error: Segera hubungi administrator');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: 'linear-gradient(to bottom, #4A90E2, #74b9ff)' }}
    >
      <div className="card p-4 shadow" style={{ minWidth: '400px' }}>
        <div className="text-center mb-3">
          <img
            src={logoEda}
            alt="Logo"
            style={{ width: '150px' }}
          />
          <h4 className="mt-2 fw-bold">EDA FINANCE</h4>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
              </span>
            </div>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold d-flex justify-content-center align-items-center"
            disabled={loading} // Disable saat loading
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
              </>
            ) : (
              'Login'
            )}
          </button>

        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
};

export default LoginPage;
