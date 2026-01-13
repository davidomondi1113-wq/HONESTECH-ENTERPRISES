import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Secure Your Digital Future with 
            <span className="highlight"> HonesTech</span>
          </h1>
          <p>
            Leading cybersecurity and IT solutions provider. We protect your business 
            with cutting-edge security audits, penetration testing, and comprehensive IT support.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Clients Protected</p>
          </div>
          <div className="stat">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
          <div className="stat">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;