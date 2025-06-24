import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to Spartex AI Platform!</h1>
      <p>Your comprehensive AI-powered data labeling and analysis solution.</p>
      <p>Explore our services:</p>
      <Link to="/services" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        View All Services
      </Link>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>About Spartex AI</h3>
        <p>
          Spartex AI provides a suite of intelligent services designed to streamline your data
          workflows, from ingestion and annotation to quality control and advanced ML model training.
          Our modular microservice architecture ensures scalability, reliability, and easy integration.
        </p>
      </div>
    </div>
  );
}