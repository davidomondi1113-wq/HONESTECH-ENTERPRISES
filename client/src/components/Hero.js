import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="badge fade-in">
            <span>●</span>
            System Online
          </div>
          <h1 className="fade-in stagger-1">
            Secure Your Digital Future with <span className="highlight">HonesTech</span>
          </h1>
          <p className="fade-in stagger-2">
            Leading cybersecurity and IT solutions provider. We protect your business 
            with cutting-edge security audits, penetration testing, and comprehensive IT support.
          </p>
          <div className="hero-buttons fade-in stagger-3">
            <button className="btn-primary">Initialize Protection</button>
            <button className="btn-secondary">Explore Services</button>
          </div>
        </div>
        
        <div className="hero-stats fade-in stagger-4">
          <div className="stat-bar">
            <div className="stat-bar-header">
              <span className="stat-value">500+</span>
              <span className="stat-label">Systems Secured</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ '--width': '85%', '--color': 'var(--accent-cyan)' }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-header">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime Guarantee</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ '--width': '99.9%', '--color': 'var(--accent-green)' }}></div>
            </div>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-header">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Active Monitoring</span>
            </div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ '--width': '100%', '--color': 'var(--accent-purple)' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="code-float">
        <div><span className="keyword">const</span> security = <span className="string">'active'</span>;</div>
        <div><span className="keyword">const</span> protection = <span className="function">await</span> enable();</div>
        <div><span className="keyword">if</span> (threat) &#123;</div>
        <div style={{paddingLeft: '1rem'}}><span className="function">neutralize</span>(threat);</div>
        <div>&#125;</div>
      </div>
    </section>
  );
};

export default Hero;
