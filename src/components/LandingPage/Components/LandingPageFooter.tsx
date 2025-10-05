import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  CheckCircle,
  Star,
  Users,
  Award,
  Shield,
  Zap,
  Target
} from 'lucide-react'

const LandingPageFooter: React.FC = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/sign-up')
  }

  const handleLogin = () => {
    navigate('/sign-in')
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp",
      content: "Jobzyn reduced our time-to-hire by 70% and improved candidate quality significantly.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Ahmed El Mansouri", 
      role: "Talent Acquisition Manager",
      company: "InnovateLab",
      content: "The AI matching is incredibly accurate. We're finding perfect candidates in days, not weeks.",
      rating: 5,
      avatar: "AE"
    },
    {
      name: "Fatima Zahra",
      role: "Recruitment Lead", 
      company: "GrowthCo",
      content: "Our recruitment ROI improved by 300% since using Jobzyn. It's a game-changer.",
      rating: 5,
      avatar: "FZ"
    },
    {
      name: "Mohammed Alami",
      role: "Head of People",
      company: "StartupMorocco",
      content: "The platform is intuitive and powerful. We've streamlined our recruitment workflow.",
      rating: 5,
      avatar: "MA"
    },
    {
      name: "Aicha Benali",
      role: "Recruitment Specialist",
      company: "DigitalAgency",
      content: "Jobzyn's analytics helped us identify bottlenecks in our hiring process. Highly recommended.",
      rating: 5,
      avatar: "AB"
    },
    {
      name: "Youssef Tazi",
      role: "VP of Talent",
      company: "FinTechMorocco",
      content: "The candidate experience is outstanding. We've seen a 40% increase in application rates.",
      rating: 5,
      avatar: "YT"
    }
  ]

  const features = [
    { icon: <Zap className="h-6 w-6" />, title: "300% Faster Hiring", description: "AI-powered automation" },
    { icon: <Target className="h-6 w-6" />, title: "95% Match Accuracy", description: "Precise candidate matching" },
    { icon: <Shield className="h-6 w-6" />, title: "Privacy First", description: "GDPR compliant & secure" },
    { icon: <Award className="h-6 w-6" />, title: "Industry Leader", description: "Trusted by 500+ companies" }
  ]

  return (
    <div className="bg-white">
      {/* Final CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 overflow-hidden">
        {/* White decorative shapes */}
        <div className="absolute top-4 left-8 w-20 h-20 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-8 right-12 w-16 h-16 bg-white/15 rounded-lg rotate-45 blur-sm"></div>
        <div className="absolute bottom-8 left-1/4 w-24 h-12 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-4 right-1/3 w-18 h-18 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-12 w-14 h-14 bg-white/15 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-22 h-8 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-white/15 rounded-lg rotate-12 blur-sm"></div>
        <div className="absolute bottom-1/3 right-8 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
        
        {/* Vector-like lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-white/10"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-white/10"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Hiring?
            </motion.h2>
            <motion.p 
              className="text-xl text-orange-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join 500+ companies already using Jobzyn to hire faster, smarter, and more efficiently. 
              Start your free trial today and see the difference AI can make.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button 
                onClick={handleGetStarted}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button 
                onClick={handleLogin}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 text-orange-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Summary */}
      <motion.div 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="w-full px-6">
          <div className="text-center mb-16">
            <p className="text-gray-600 text-sm font-medium tracking-wider uppercase mb-2">
              Client Testimonials
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
          </div>
          
          {/* Top Row - Left to Right Sliding */}
          <div className="overflow-hidden mb-4">
            <div className="flex animate-slide-left-to-right">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials.slice(0, 5), ...testimonials.slice(0, 5)].map((testimonial, index) => (
                <div 
                  key={`top-${index}`}
                  className="flex-shrink-0 w-80 mx-2"
                >
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-orange-500/50 transition-all duration-300 shadow-sm hover:shadow-md h-32">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Right to Left Sliding */}
          <div className="overflow-hidden">
            <div className="flex animate-slide-right-to-left">
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials.slice(1, 6), ...testimonials.slice(1, 6)].map((testimonial, index) => (
                <div 
                  key={`bottom-${index}`}
                  className="flex-shrink-0 w-80 mx-2"
                >
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-orange-500/50 transition-all duration-300 shadow-sm hover:shadow-md h-32">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                        {testimonial.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/assets/jobsyn_recruitment.svg" 
                  alt="Jobzyn Logo" 
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Transform your hiring process with AI-powered recruitment solutions. 
                Hire faster, smarter, and more efficiently with Jobzyn.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">hello@jobzyn.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">+212 5 22 33 44 55</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">Casablanca, Morocco</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Jobzyn. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideLeftToRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes slideRightToLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-slide-left-to-right {
          animation: slideLeftToRight 20s linear infinite;
        }
        
        .animate-slide-right-to-left {
          animation: slideRightToLeft 20s linear infinite;
        }
        
        .animate-slide-left-to-right:hover,
        .animate-slide-right-to-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default LandingPageFooter