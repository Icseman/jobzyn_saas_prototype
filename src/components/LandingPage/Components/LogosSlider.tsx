import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Logo {
  name: string;
  src: string;
}

const LogosSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const logos: Logo[] = [
    { name: 'Theodo', src: '/src/components/LandingPage/Assets/Logos/theodo.svg' },
    { name: 'JESA', src: '/src/components/LandingPage/Assets/Logos/JESA.svg' },
    { name: 'Intelica', src: '/src/components/LandingPage/Assets/Logos/intelica.svg' },
    { name: 'Glovo', src: '/src/components/LandingPage/Assets/Logos/glovo-logo-vector.svg' },
    { name: 'Deloitte', src: '/src/components/LandingPage/Assets/Logos/deloitte.svg' },
    { name: 'CIH Bank', src: '/src/components/LandingPage/Assets/Logos/CIH Bank.svg' },
    { name: 'CDG', src: '/src/components/LandingPage/Assets/Logos/CDG.svg' },
    { name: 'CDG Capital', src: '/src/components/LandingPage/Assets/Logos/CDG Capital.svg' },
  ];

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000); // Change logo every 3 seconds

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-gray-600 text-sm font-medium tracking-wider uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.p>
          <motion.h3 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Companies that trust Jobzyn
          </motion.h3>
        </motion.div>

        {/* Logo Slider */}
        <div className="relative overflow-hidden">
          {/* Infinite scroll container */}
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center group"
                style={{ width: '200px' }}
              >
                <div className="relative w-full h-16 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className={`w-auto filter grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 ease-in-out ${
                      logo.name === 'Glovo' ? 'max-h-16' : 'max-h-12'
                    }`}
                    style={{
                      filter: 'brightness(0) saturate(100%)',
                      transition: 'all 0.3s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'brightness(0) saturate(100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'brightness(0) saturate(100%)';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {logos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-900 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Companies Trust Us</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">Successful Hires</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogosSlider;
