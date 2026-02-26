import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <span className="label">// About Us</span>
            <h2>Defending Your Digital <span className="gradient">Frontier</span></h2>
            <p>
              Founded with a mission to secure the digital landscape, HonesTech Enterprises 
              has been at the forefront of cybersecurity and IT solutions. Our team of 
              certified experts brings years of experience in protecting businesses from 
              evolving cyber threats.
            </p>
            <p>
              We combine cutting-edge technology with proven methodologies to deliver 
              comprehensive security solutions that give you peace of mind and allow 
              you to focus on growing your business.
            </p>
            
            <div className="features">
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>Certified Experts</h4>
                  <p>Industry-certified security professionals</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>Advanced Tools</h4>
                  <p>Leading-edge security technologies</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>Tailored Solutions</h4>
                  <p>Custom strategies for every client</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <h4>Round-the-Clock</h4>
                  <p>24/7 monitoring and support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="placeholder-image">
              <div className="scanner-line"></div>
              <div className="shield-icon">🛡️</div>
              <p>SECURE // PROTECTED // MONITORED</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
