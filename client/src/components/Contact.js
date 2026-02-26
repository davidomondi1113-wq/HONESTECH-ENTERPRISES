import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <span className="label">// Contact</span>
          <h2>Initiate Contact Protocol</h2>
          <p>Ready to secure your business? Send us an encrypted transmission.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Reach out through any channel. Our security team is standing by.</p>
            
            <div className="contact-item">
              <div className="contact-icon">✉</div>
              <div>
                <h4>Secure Email</h4>
                <p>info@honestech.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">◈</div>
              <div>
                <h4>Direct Line</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">⌖</div>
              <div>
                <h4>Headquarters</h4>
                <p>123 Security Street<br />Tech City, TC 12345</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">⏱</div>
              <div>
                <h4>Operations</h4>
                <p>Mon - Fri: 9:00 AM - 6:00 PM<br />24/7 Emergency Response</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                placeholder="Organization name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Describe your security requirements..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary">Transmit Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
