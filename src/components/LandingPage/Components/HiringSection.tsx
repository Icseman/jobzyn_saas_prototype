import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, ClipboardCheck, Target, TrendingUp, Award, Clock, Filter } from 'lucide-react';

const HiringSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Talent CRM Database",
      description: "Manage your talent pool in one searchable database. Access candidate profiles with all the information you need. Easily filter, move candidates through stages, and take actions in a few clicks."
    },
    {
      icon: ClipboardCheck,
      title: "Evaluation Tools",
      description: "Get access to customizable interview kits, scorecards, and science-backed assessments to standardize your hiring criteria across every role."
    },
    {
      icon: Search,
      title: "Smart Sourcing",
      description: "Advanced candidate search and matching algorithms to find the perfect fit for your roles quickly and efficiently."
    },
    {
      icon: Target,
      title: "Pipeline Management",
      description: "Streamline your hiring process with automated workflows, stage tracking, and collaborative candidate evaluation tools."
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track hiring metrics, time-to-fill, and candidate quality to optimize your recruitment strategy and improve outcomes."
    },
    {
      icon: Award,
      title: "Team Collaboration",
      description: "Enable seamless collaboration between hiring managers, recruiters, and interviewers with shared candidate profiles and feedback."
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
            Recruiting Platform
          </motion.p>
          <motion.h3 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive recruiting platform
          </motion.h3>
          <motion.p 
            className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            From initial candidate review to final offer, Jobzyn helps you identify and secure top talent efficiently.
          </motion.p>
        </motion.div>

        {/* Main Image */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src="/assets/landing-page/hiring.png" 
            alt="Hiring Platform" 
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Complete Recruiting Solution
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            From talent sourcing to final hiring decisions, our comprehensive recruiting platform 
            helps you build and maintain a world-class team with efficiency and precision.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Hiring Features
            </motion.button>
            <motion.button 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HiringSection;
