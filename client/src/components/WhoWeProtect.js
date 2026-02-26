import React from 'react';

const WhoWeProtect = () => {
  const sectors = [
    { icon: '🏢', name: 'Small Business', desc: 'Affordable security for growing companies' },
    { icon: '🏙️', name: 'Enterprises', desc: 'Large-scale protection for corporations' },
    { icon: '🏥', name: 'Healthcare', desc: 'HIPAA-compliant security solutions' },
    { icon: '🏦', name: 'Finance', desc: 'Banking-grade cybersecurity' },
    { icon: '🛒', name: 'Retail', desc: 'E-commerce & POS security' },
    { icon: '🎓', name: 'Education', desc: 'Campus network protection' },
  ];

  return (
    <section id="who-we-protect" className="who-we-protect">
      <div className="container">
        <div className="section-header">
          <span className="label">Expertise</span>
          <h2>Who We Protect</h2>
          <p>Comprehensive cybersecurity solutions tailored to your industry</p>
        </div>
        
        <div className="protect-grid">
          {sectors.map((sector, index) => (
            <div className="protect-card" key={index}>
              <span className="protect-icon">{sector.icon}</span>
              <div className="protect-info">
                <h3>{sector.name}</h3>
                <p>{sector.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeProtect;
