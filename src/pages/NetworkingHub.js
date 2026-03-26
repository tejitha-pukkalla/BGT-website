import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ArrowLeft, CheckCircle2, Calendar, MessageSquare, 
  Award, Handshake, Globe2, Sparkles, ArrowRight, Sun, Moon,
  TrendingUp, Heart, Share2, UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NetworkingHub = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const features = [
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with 100,000+ entrepreneurs, CEOs, and business leaders globally.",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: Calendar,
      title: "Events & Meetups",
      description: "Join virtual and in-person networking events, webinars, and business conferences.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Discussion Forums",
      description: "Engage in industry-specific discussions, share insights, and learn from experts.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Handshake,
      title: "Partnership Opportunities",
      description: "Discover potential partners, collaborators, and strategic alliances for growth.",
      color: "from-rose-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Referral System",
      description: "Give and receive business referrals with built-in trust and verification.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Globe2,
      title: "Global Community",
      description: "Access networking opportunities across 150+ countries and all time zones.",
      color: "from-indigo-500 to-cyan-500"
    }
  ];

  const benefits = [
    "Build meaningful business relationships",
    "Access exclusive networking events and masterclasses",
    "Get introductions to key decision-makers",
    "Join industry-specific groups and communities",
    "Earn rewards through successful referrals",
    "Expand your professional influence"
  ];

  const stats = [
    { value: "100K+", label: "Active Members" },
    { value: "500+", label: "Monthly Events" },
    { value: "50+", label: "Industry Groups" },
    { value: "90%", label: "Connection Rate" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
        darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </div>
            
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Networking <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Hub</span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Professional networking ecosystem for entrepreneurs and business leaders
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Community
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className={`px-8 py-4 rounded-xl border font-bold text-lg transition-all ${
                  darkMode 
                    ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-indigo-500' 
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-500'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Events
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border text-center ${
                  darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Networking <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl border ${
                  darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Why Join <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Networking Hub</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-start gap-4 p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800/30' : 'bg-gray-50'
                }`}
              >
                <CheckCircle2 className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto text-center p-12 rounded-3xl border ${
            darkMode 
              ? 'bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20'
              : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
          }`}
        >
          <h2 className={`text-4xl font-bold mb-6 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Expand Your <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Network</span> Today
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of professionals building meaningful connections
          </p>
          <motion.button
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now - It's Free
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 ${
        darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 BGT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NetworkingHub;