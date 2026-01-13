import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About HonesTech Enterprises</h2>
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
                <span className="feature-icon">✓</span>
                <span>Certified Security Professionals</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Industry-Leading Tools & Techniques</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Customized Solutions for Every Business</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>24/7 Monitoring & Support</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="placeholder-image">
              <span>🛡️</span>
              <p>Your Security Partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;