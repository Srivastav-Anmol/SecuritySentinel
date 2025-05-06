import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/95 pt-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-foreground">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Security Sentinel</span>
            </div>
            <p className="text-muted-foreground">
              Advanced robbery and theft Detection
              for departmental stores using cutting-edge AI technology.
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
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/detect" className="text-gray-300 hover:text-white transition-colors">Detection Tool</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/research" className="text-gray-300 hover:text-white transition-colors">Research Paper</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 md:ml-auto md:max-w-[350px]">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Tundla, Agra</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-muted-foreground">+91 9988776655</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-muted-foreground">contact@securitysentinel.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Security Sentinel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
