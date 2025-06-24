import React from 'react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      id: 'resume-analyzer',
      name: 'Resume Analyzer',
      description: 'Analyze resume text for keywords, skills, and basic structure.',
      link: '/services/resume-analyzer',
    },
    {
      id: 'data-ingestion',
      name: 'Data Ingestion',
      description: 'Upload and process various data formats for annotation and analysis.',
      link: '/services/data-ingestion',
    },
    // Add more services here as you build them
    // {
    //   id: 'annotation',
    //   name: 'Data Annotation',
    //   description: 'Collaborative platform for precise data labeling.',
    //   link: '/services/annotation',
    // },
    // {
    //   id: 'quality-control',
    //   name: 'Quality Control',
    //   description: 'Ensure the highest quality of your annotated datasets.',
    //   link: '/services/quality-control',
    // },
    // {
    //   id: 'ml-training',
    //   name: 'ML Training',
    //   description: 'Train and evaluate custom machine learning models.',
    //   link: '/services/ml-training',
    // },
  ];

  return (
    <div className="container">
      <h1>Our AI Services</h1>
      <p>Explore the powerful capabilities Spartex AI offers:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {services.map(service => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <Link to={service.link} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              Go to Service
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}