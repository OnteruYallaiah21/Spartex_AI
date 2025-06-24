import React, { useState, useContext } from 'react';
import { AuthContext } from '../App'; // Import the mock auth context

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext); // Use mock auth state

  async function analyze() {
    if (!isAuthenticated) {
      alert("Please login to use this service.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // In a real app, send actual token: "Authorization": `Bearer ${token}`
          "X-Mock-Auth-Token": "mock-token-123" // Mock token for gateway
        },
        body: JSON.stringify({ resume: resumeText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.analysis_results); // Access the specific analysis_results key
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Resume Analyzer</h2>
      {!isAuthenticated && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>You must be logged in to use this service.</p>
      )}
      <textarea
        rows={10}
        cols={50}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        disabled={!isAuthenticated || loading}
      />
      <br />
      <button onClick={analyze} disabled={!isAuthenticated || loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}