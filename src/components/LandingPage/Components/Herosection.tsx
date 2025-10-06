import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LogosSlider from './LogosSlider';
import StickyScrollSection from './StickyScrollSection';
import EmployeesSection from './EmployeesSection';
import HiringSection from './HiringSection';
import PricingSection from './PricingSection';
import LandingPageFooter from './LandingPageFooter';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  // Typing animation state
  const sentences = [
    "Find Talent Faster",
    "Your Next Hire Awaits",
    "Recruit Smarter Today…",
    "Talent Made Simple",
    "AI-Powered Hiring",
    "Better Matches, Faster",
    "Hire with Confidence",
    "Unlock Top Talent",
    "Hiring, Simplified"
  ];
  
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIndex];
    
    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before deleting
      return () => clearTimeout(waitTimeout);
    }

    if (isDeleting) {
      if (currentText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50); // Delete speed
        return () => clearTimeout(deleteTimeout);
      } else {
        setIsDeleting(false);
        setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
      }
    } else {
      if (currentText.length < currentSentence.length) {
        const typeTimeout = setTimeout(() => {
          setCurrentText(currentSentence.slice(0, currentText.length + 1));
        }, 100); // Typing speed
        return () => clearTimeout(typeTimeout);
      } else {
        setIsWaiting(true);
      }
    }
  }, [currentText, isDeleting, isWaiting, currentSentenceIndex, sentences]);

  const handleLogin = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <img 
              src="/assets/jobsyn_recruitment.svg" 
              alt="Jobzyn Logo" 
              className="h-6 sm:h-8 w-auto"
            />
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/pricing" 
                className="relative text-black hover:text-orange-600 transition-colors duration-300 font-medium text-sm lg:text-base group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/contact" 
                className="relative text-black hover:text-orange-600 transition-colors duration-300 font-medium text-sm lg:text-base group"
              >
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={handleLogin} className="text-black hover:text-gray-600 transition-colors text-sm sm:text-base">
              Login
            </button>
            <button onClick={handleSignUp} className="bg-black text-white px-3 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm">
              <span className="hidden sm:inline">Get Started — It's Free</span>
              <span className="sm:hidden">Get Started</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#FDF1E8] min-h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300/15 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-100/25 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-orange-200/20 rounded-full blur-xl"></div>
          
          {/* Medium circles */}
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-orange-300/10 rounded-full blur-lg"></div>
          <div className="absolute top-2/3 right-1/4 w-16 h-16 bg-orange-200/15 rounded-full blur-md"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-orange-100/20 rounded-full blur-lg"></div>
          
          {/* Small circles */}
          <div className="absolute top-16 right-1/2 w-12 h-12 bg-orange-300/25 rounded-full blur-sm"></div>
          <div className="absolute bottom-16 left-1/2 w-8 h-8 bg-orange-200/30 rounded-full blur-sm"></div>
          <div className="absolute top-1/2 left-16 w-14 h-14 bg-orange-100/20 rounded-full blur-md"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-32 right-10 w-16 h-16 bg-orange-200/15 rounded-lg rotate-45 blur-sm"></div>
          <div className="absolute bottom-32 left-10 w-20 h-20 bg-orange-300/10 rounded-lg rotate-12 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-400/10 rounded-full blur-sm"></div>
          
          {/* Additional subtle shapes */}
          <div className="absolute top-24 left-1/3 w-6 h-6 bg-orange-200/20 rounded-full blur-xs"></div>
          <div className="absolute bottom-24 right-1/3 w-10 h-10 bg-orange-300/15 rounded-full blur-sm"></div>
          <div className="absolute top-3/4 left-1/4 w-18 h-18 bg-orange-100/25 rounded-full blur-md"></div>
          <div className="absolute bottom-1/4 right-1/4 w-22 h-22 bg-orange-200/10 rounded-full blur-lg"></div>
          
          {/* Floating dots */}
          <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-orange-300/30 rounded-full blur-xs"></div>
          <div className="absolute top-1/2 right-1/5 w-6 h-6 bg-orange-200/25 rounded-full blur-sm"></div>
          <div className="absolute bottom-1/4 left-2/3 w-5 h-5 bg-orange-100/35 rounded-full blur-xs"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto gap-8 lg:gap-16 relative z-10 min-h-[calc(100vh-80px)]">
        {/* Left Hero Content */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Brand Name */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-2">Jobzyn</h1>
            <p className="text-base sm:text-lg text-black underline">300% faster hiring with AI workflows</p>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 sm:mb-12 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-[1.2em] flex items-center overflow-hidden">
              <span className="inline-block whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {currentText}
                <span className="animate-pulse bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">|</span>
              </span>
            </div>
          </motion.div>

          {/* Supporting CTAs */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* I'm a Recruiter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">I'm a Recruiter</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Automate sourcing, screening, and pipelines to hire top talent in minutes.</p>
              <div className="relative inline-block">
                <button 
                  onClick={handleSignUp}
                  className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                >
                  {/* Decorative shapes */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white/20 rounded-full"></div>
                  <div className="absolute top-3 right-4 w-1 h-1 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white/40 rounded-full"></div>
                  
                  {/* Button text */}
                  <span className="relative z-10">Get Started →</span>
                </button>
              </div>
            </motion.div>

            {/* I'm a Candidate */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">I'm a Candidate</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Showcase your skills and land the right job with AI-matched opportunities.</p>
              <div className="relative inline-block">
                <button 
                  onClick={() => window.open('https://www.jobzyn.com/', '_blank')}
                  className="relative bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 overflow-hidden border border-gray-300"
                >
                  {/* Decorative shapes */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400/30 rounded-full"></div>
                  <div className="absolute top-3 right-4 w-1 h-1 bg-gray-500/40 rounded-full"></div>
                  <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-gray-400/25 rounded-full"></div>
                  <div className="absolute bottom-3 right-2 w-1 h-1 bg-gray-500/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-gray-600/50 rounded-full"></div>
                  
                  {/* Button text */}
                  <span className="relative z-10">Get Started →</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Hero Content */}
        <motion.div 
          className="flex-1 relative max-w-2xl w-full lg:ml-16"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <img 
            src="/assets/landing-page/hero.svg" 
            alt="Jobzyn Hero Visual" 
            className="w-full h-auto object-contain max-w-md mx-auto lg:max-w-none"
          />
        </motion.div>
        </div>
      </div>

      {/* Logos Slider */}
      <LogosSlider />
      
      {/* Sticky Scroll Section */}
      <StickyScrollSection />
      
      {/* Employees Section */}
      <EmployeesSection />
      
      {/* Hiring Section */}
      <HiringSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
};

export default HeroSection;
