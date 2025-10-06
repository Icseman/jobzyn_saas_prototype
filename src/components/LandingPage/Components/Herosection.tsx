import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogosSlider from './LogosSlider';
import StickyScrollSection from './StickyScrollSection';
import EmployeesSection from './EmployeesSection';
import HiringSection from './HiringSection';
import LandingPageFooter from './LandingPageFooter';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          {/* Left Side */}
          <div className="flex items-center">
            <img 
              src="/assets/jobsyn_recruitment.svg" 
              alt="Jobzyn Logo" 
              className="h-6 sm:h-8 w-auto"
            />
          </div>

          {/* Center Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="#" className="text-black hover:text-gray-600 transition-colors text-sm lg:text-base">Top Job</a>
            <span className="text-black">•</span>
            <a href="#" className="text-black hover:text-gray-600 transition-colors text-sm lg:text-base">Resume</a>
            <span className="text-black">•</span>
            <a href="#" className="text-black hover:text-gray-600 transition-colors text-sm lg:text-base">Hiring</a>
            <span className="text-black">•</span>
            <a href="#" className="text-black hover:text-gray-600 transition-colors text-sm lg:text-base">Companies</a>
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
      <div className="bg-[#FDF1E8] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto gap-8 lg:gap-16 min-h-[calc(100vh-80px)]">
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
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold text-black mb-8 sm:mb-12 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Smarter Hiring Starts Here...
          </motion.h2>

          {/* Supporting CTAs */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* I'm a Candidate */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">I'm a Candidate</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Showcase your skills and land the right job with AI-matched opportunities.</p>
              <a href="#" className="text-black underline hover:text-gray-600 transition-colors text-sm sm:text-base">
                Get Started →
              </a>
            </motion.div>

            {/* I'm a Recruiter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center sm:text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">I'm a Recruiter</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Automate sourcing, screening, and pipelines to hire top talent in minutes.</p>
              <a href="#" className="text-black underline hover:text-gray-600 transition-colors text-sm sm:text-base">
                Get Started →
              </a>
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
            src="/assets/landing-page/Group 1.png" 
            alt="Jobzyn Hero Visual" 
            className="w-full h-auto object-contain max-w-md mx-auto lg:max-w-none"
          />
        </motion.div>
      </div>

      {/* Logos Slider */}
      <LogosSlider />
      
      {/* Sticky Scroll Section */}
      <StickyScrollSection />
      
      {/* Employees Section */}
      <EmployeesSection />
      
      {/* Hiring Section */}
      <HiringSection />
      
      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
};

export default HeroSection;
