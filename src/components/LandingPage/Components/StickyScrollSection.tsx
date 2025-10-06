import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StickyScrollSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Streamline Your Job Management Process",
      description: "Create, manage, and track job postings with our intuitive job management system. From posting to hiring, streamline your entire recruitment workflow with powerful automation tools and real-time analytics.",
      links: [
        "Explore job management features →",
        "See automation capabilities →",
        "View job posting analytics →"
      ],
      image: "/assets/landing-page/features/Jobs.png",
      imageAlt: "Job Management Dashboard"
    },
    {
      title: "Build Professional Resumes with AI",
      description: "Create stunning, ATS-friendly resumes in minutes with our AI-powered resume builder. Choose from professional templates, get real-time suggestions, and ensure your resume stands out to recruiters.",
      links: [
        "Try the resume builder →",
        "View resume templates →",
        "Learn about ATS optimization →"
      ],
      image: "/assets/landing-page/features/resume builder.png",
      imageAlt: "Resume Builder Interface"
    },
    {
      title: "Manage Your Client Relationships",
      description: "Keep track of all your client interactions, manage contracts, and maintain strong relationships with our comprehensive client management system. Organize client data, track communications, and ensure nothing falls through the cracks.",
      links: [
        "Explore client management →",
        "See communication tools →",
        "View client analytics →"
      ],
      image: "/assets/landing-page/features/Clients.png",
      imageAlt: "Client Management Dashboard"
    },
    {
      title: "Create Stunning Career Pages",
      description: "Build beautiful, branded career pages that attract top talent. Customize your company's career site with our drag-and-drop builder, showcase your culture, and make it easy for candidates to apply.",
      links: [
        "Design your career page →",
        "See customization options →",
        "View page templates →"
      ],
      image: "/assets/landing-page/features/Careers page.png",
      imageAlt: "Career Page Builder"
    },
    {
      title: "Comprehensive Analytics Dashboard",
      description: "Get insights into your recruitment performance with detailed analytics and reporting. Track key metrics, monitor hiring trends, and make data-driven decisions to improve your recruitment process.",
      links: [
        "View analytics dashboard →",
        "Explore reporting features →",
        "See performance metrics →"
      ],
      image: "/assets/landing-page/features/dashboard.png",
      imageAlt: "Analytics Dashboard"
    }
  ];

  const scrollToSection = (index: number) => {
    const element = document.querySelector(`[data-text-section="${index}"]`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const textSections = document.querySelectorAll('[data-text-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      textSections.forEach((section, index) => {
        const element = section as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setActiveSection(index);
        }
      });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile Image Slider - Shows on top for mobile */}
        <div className="lg:hidden mb-8">
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src={sections[activeSection].image}
              alt={sections[activeSection].imageAlt}
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105 max-w-lg mx-auto"
            />
            
            {/* Mobile Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    activeSection === index 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Section - Text Content */}
          <div className="space-y-16 sm:space-y-32 lg:order-1">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                data-text-section={index}
                className={`space-y-6 sm:space-y-8 transition-opacity duration-500 ${
                  activeSection === index ? 'opacity-100' : 'opacity-60'
                }`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: activeSection === index ? 1 : 0.6, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Main Headline */}
                <motion.h2 
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {section.title}
                </motion.h2>
                
                {/* Body Text */}
                <motion.p 
                  className="text-base sm:text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {section.description}
                </motion.p>
                
                {/* Call-to-Action Links */}
                <motion.div 
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  viewport={{ once: true }}
                >
                  {section.links.map((link, linkIndex) => (
                    <motion.a 
                      key={linkIndex}
                      href="#" 
                      className="block text-base sm:text-lg text-gray-900 hover:text-blue-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-600"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.8 + linkIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right Section - Desktop Sticky Feature Image */}
          <motion.div 
            className="hidden lg:block sticky top-8 sm:top-20 order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="transition-all duration-500">
              {/* Feature Image */}
              <motion.div 
                className="relative overflow-hidden"
                key={activeSection}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={sections[activeSection].image}
                  alt={sections[activeSection].imageAlt}
                  className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105 max-w-2xl"
                />
              </motion.div>

              {/* Desktop Feature Indicators */}
              <motion.div 
                className="flex justify-center mt-4 sm:mt-6 space-x-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {sections.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                      activeSection === index 
                        ? 'bg-blue-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to section ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollSection;
