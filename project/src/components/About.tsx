import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Music, Camera, BookOpen, Heart } from 'lucide-react';

const About: React.FC = () => {
  const interests = [
    { icon: Code, label: 'Coding', color: 'text-blue-500' },
    { icon: Coffee, label: 'Coffee', color: 'text-amber-600' },
    { icon: Music, label: 'Music', color: 'text-purple-500' },
    { icon: Camera, label: 'Photography', color: 'text-green-500' },
    { icon: BookOpen, label: 'Reading', color: 'text-indigo-500' },
    { icon: Heart, label: 'Volunteering', color: 'text-red-500' },
  ];

  const funFacts = [
    "🎯 Solved 200+ coding problems",
    "☕ Coffee enthusiast (3 cups/day)",
    "🌍 Visited 5 countries",
    "📚 Read 25+ tech books",
    "🎵 Play guitar in spare time",
    "🏆 Hackathon winner (2x)"
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative mx-auto w-80 h-80 mb-8"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/pic_portfolio.png" alt="Aami Reeba Mathew" className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 -z-10 blur-md"
                />
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl"
              >
                👋
              </motion.div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-2xl transform rotate-6 -z-10" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                Hi there! I'm Aami Reeba Mathew, a passionate Computer Science student with a love for creating 
                digital experiences that matter. My journey began when I wrote my first 
                "Hello, World!" program, and I've been hooked ever since.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or sharing my knowledge with fellow developers. 
                I believe in the power of continuous learning and collaboration.
              </p>
              <p className="leading-relaxed">
                My goal is to create innovative solutions that solve real-world problems 
                while keeping user experience at the forefront of everything I build.
              </p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What I Love
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <interest.icon className={`w-8 h-8 mx-auto mb-2 ${interest.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {interest.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Fun Facts About Me
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
                  {fact}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;