import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import DataIngestionPage from './pages/DataIngestionPage';

// Mock Auth Context (for demonstration)
const AuthContext = React.createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state

  const handleLogin = () => {
    // In a real app: call auth service, get token, store in localStorage
    setIsAuthenticated(true);
    alert("Logged in! (Mock)");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // In a real app: clear token from localStorage
    alert("Logged out! (Mock)");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      <Router>
        <nav>
          <div>
            <Link to="/">Spartex AI</Link>
            <Link to="/services">Services</Link>
          </div>
          <div>
            {isAuthenticated ? (
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Logout</button>
            ) : (
              <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Login</button>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/services/data-ingestion" element={<DataIngestionPage />} />
          {/* Add more routes for other services here */}
        </Routes>

        <footer>
          <p>&copy; {new Date().getFullYear()} Spartex AI. All rights reserved.</p>
        </footer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext }; // Export context for use in child components