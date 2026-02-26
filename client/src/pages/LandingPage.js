import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhoWeProtect from '../components/WhoWeProtect';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const mockServices = [
        {
          id: 1,
          name: 'Vulnerability Assessment',
          description: 'Deep-scan analysis of your digital infrastructure to identify weaknesses before attackers do.',
          price: 2500,
          category: 'cyber'
        },
        {
          id: 2,
          name: 'Penetration Testing',
          description: 'Simulated cyberattack to test your defenses and uncover exploitable vulnerabilities.',
          price: 3500,
          category: 'cyber'
        },
        {
          id: 3,
          name: 'Security Operations',
          description: 'Continuous 24/7 monitoring, threat detection, and rapid incident response.',
          price: 299,
          category: 'general'
        },
        {
          id: 4,
          name: 'Compliance & Audit',
          description: 'GDPR, SOC2, ISO 27001 compliance assessment and certification preparation.',
          price: 4500,
          category: 'cyber'
        },
        {
          id: 5,
          name: 'Cloud Security',
          description: 'Secure your AWS, Azure, or GCP infrastructure with enterprise-grade protection.',
          price: 1800,
          category: 'general'
        },
        {
          id: 6,
          name: 'Incident Response',
          description: 'Rapid deployment team to contain, analyze, and recover from security breaches.',
          price: 5000,
          category: 'cyber'
        }
      ];
      setServices(mockServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="landing-page">
      <div className="grid-overlay"></div>
      <Header />
      <Hero />
      <Services services={services} />
      <WhoWeProtect />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
