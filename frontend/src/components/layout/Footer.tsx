import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleDetectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/detect');
    } else {
      navigate('/login');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    // Use setTimeout to ensure the navigation is complete before scrolling
    setTimeout(() => {
      const element = document.getElementById('howItWorks');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-background/95 pt-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-foreground">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Security Sentinel</span>
            </div>
            <p className="text-muted-foreground">
              Advanced robbery and theft Detection for departmental stores using cutting-edge AI technology.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <a href="#" onClick={handleDetectClick} className="text-gray-300 hover:text-white transition-colors">Detection Tool</a>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <a href="#" onClick={handleHowItWorksClick} className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Institution Info */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">Institution</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Noida Institute of Engineering and Technology</li>
              <li className="text-gray-300">Department of Computer Science & Engineering</li>
              <li className="text-gray-300">Greater Noida, Uttar Pradesh</li>
              <li>
                <a
                  href="https://www.niet.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  www.niet.co.in
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">NIET Campus</p>
            <p className="text-gray-300 mb-2">Greater Noida, UP 201306</p>
            <p className="text-gray-300 mb-2">securitySentienl.research@niet.co.in</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} DeepGuard - NIET Major Project. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Developed by Divyanshu, Ayushi, Abhay & Kshitij
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
