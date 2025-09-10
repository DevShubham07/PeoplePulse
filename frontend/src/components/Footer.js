import React from 'react';
import { Building2, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold">PeoplePulse</span>
            </div>
            <p className="text-secondary-400 mb-4 max-w-md">
              Modern employee management platform designed for the digital workplace. 
              Streamline your workforce management with comprehensive tools and insights.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/DevShubham07/PeoplePulse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/devshubham07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:devshubham07@gmail.com"
                className="text-secondary-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-secondary-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-secondary-400">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#status" className="hover:text-white transition-colors">System Status</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              &copy; {currentYear} PeoplePulse. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-secondary-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by DevShubham07</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
