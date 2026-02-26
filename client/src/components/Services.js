import React from 'react';

const Services = ({ services }) => {
  const getServiceIcon = (category) => {
    const icons = {
      cyber: '🛡️',
      general: '⚡'
    };
    return icons[category] || '⚡';
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <span className="label">// Services</span>
          <h2>Comprehensive Security Solutions</h2>
          <p>Advanced cybersecurity and IT infrastructure services designed for the modern enterprise</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="card-glow"></div>
              <div className="service-icon">
                {getServiceIcon(service.category)}
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-price">
                <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>from</span> ${service.price}
              </div>
              <button className="btn-outline">View Details</button>
            </div>
          ))}
        </div>

        <div className="service-categories">
          <div className="category">
            <h3>Cyber Defense</h3>
            <ul>
              <li>Security Audits & Assessment</li>
              <li>Penetration Testing</li>
              <li>Vulnerability Analysis</li>
              <li>Incident Response Teams</li>
              <li>Threat Intelligence</li>
            </ul>
          </div>
          <div className="category">
            <h3>IT Infrastructure</h3>
            <ul>
              <li>Enterprise Hardware Solutions</li>
              <li>Cloud Architecture</li>
              <li>Network Security</li>
              <li>24/7 SOC Monitoring</li>
              <li>Compliance Management</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
