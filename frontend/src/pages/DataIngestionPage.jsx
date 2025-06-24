import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

export default function DataIngestionPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
    setError(null);
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please login to use this service.");
      return;
    }
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/ingest', {
        method: 'POST',
        // No Content-Type header needed for FormData
        headers: {
          "X-Mock-Auth-Token": "mock-token-123"
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(`Success: ${data.message}`);
      setFile(null); // Clear file input
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Data Ingestion Service</h2>
      {!isAuthenticated && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>You must be logged in to use this service.</p>
      )}
      <p>Upload your documents or datasets here for processing.</p>
      <input type="file" onChange={handleFileChange} disabled={!isAuthenticated || loading} />
      <br /><br />
      <button onClick={handleSubmit} disabled={!isAuthenticated || loading || !file}>
        {loading ? 'Uploading...' : 'Upload File'}
      </button>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
    </div>
  );
}