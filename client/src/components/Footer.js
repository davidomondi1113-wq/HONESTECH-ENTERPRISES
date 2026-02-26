import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">HT</div>
              <h3>HonesTech</h3>
            </div>
            <p>
              Your trusted partner in cybersecurity and IT solutions. 
              Protecting businesses from digital threats with cutting-edge technology.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="GitHub">⌘</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Security Audits</a></li>
              <li><a href="#services">Penetration Testing</a></li>
              <li><a href="#services">IT Support</a></li>
              <li><a href="#services">Cloud Solutions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security Policy</a></li>
              <li><a href="#">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 HonesTech Enterprises. All systems operational.</p>
          <div className="status">
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
