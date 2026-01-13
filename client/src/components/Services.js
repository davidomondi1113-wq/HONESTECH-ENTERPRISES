import React from 'react';

const Services = ({ services }) => {
  const getServiceIcon = (category) => {
    return category === 'cyber' ? '🔒' : '💻';
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive cybersecurity and IT solutions tailored for your business</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                {getServiceIcon(service.category)}
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-price">
                Starting at ${service.price}
              </div>
              <button className="btn-outline">Learn More</button>
            </div>
          ))}
        </div>

        <div className="service-categories">
          <div className="category">
            <h3>🔐 Cybersecurity</h3>
            <ul>
              <li>Security Audits</li>
              <li>Penetration Testing</li>
              <li>Vulnerability Assessment</li>
              <li>Incident Response</li>
            </ul>
          </div>
          <div className="category">
            <h3>💼 IT Solutions</h3>
            <ul>
              <li>Hardware & Software</li>
              <li>Cloud Services</li>
              <li>Network Setup</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;