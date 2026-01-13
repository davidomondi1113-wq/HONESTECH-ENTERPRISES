import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from your API
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Mock data - replace with actual API call
      const mockServices = [
        {
          id: 1,
          name: 'Security Audit',
          description: 'Comprehensive security assessment of your systems',
          price: 2500,
          category: 'cyber'
        },
        {
          id: 2,
          name: 'Penetration Testing',
          description: 'Ethical hacking to identify vulnerabilities',
          price: 3500,
          category: 'cyber'
        },
        {
          id: 3,
          name: 'IT Support',
          description: '24/7 technical support and maintenance',
          price: 299,
          category: 'general'
        }
      ];
      setServices(mockServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Services services={services} />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;