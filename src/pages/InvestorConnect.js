import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, ArrowLeft, CheckCircle2, DollarSign, Users, 
  FileText, Rocket, Target, Award, ArrowRight, Sun, Moon,
  BarChart3, Presentation, Handshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InvestorConnect = () => {
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
      title: "Investor Database",
      description: "Access 10,000+ verified investors including angels, VCs, and institutional investors.",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: Presentation,
      title: "Pitch Deck Builder",
      description: "Create professional pitch decks with AI-powered templates and suggestions.",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "Get matched with investors aligned with your industry, stage, and funding needs.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Funding Tracker",
      description: "Track funding rounds, manage cap tables, and monitor investor communications.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: FileText,
      title: "Deal Room",
      description: "Secure data room for sharing due diligence documents with potential investors.",
      color: "from-yellow-500 to-green-500"
    },
    {
      icon: Handshake,
      title: "Introduction Platform",
      description: "Get warm introductions to investors through our verified network.",
      color: "from-pink-500 to-purple-500"
    }
  ];

  const benefits = [
    "Access to global investor network",
    "AI-powered investor recommendations",
    "Professional pitch deck templates",
    "Track all funding conversations in one place",
    "Secure document sharing and analytics",
    "Expert guidance throughout fundraising"
  ];

  const stats = [
    { value: "10K+", label: "Active Investors" },
    { value: "$5B+", label: "Funds Raised" },
    { value: "500+", label: "Startups Funded" },
    { value: "85%", label: "Match Rate" }
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
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Investor <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Connect</span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Bridge between startups and investors for funding opportunities
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-pink-600/50 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Fundraising
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className={`px-8 py-4 rounded-xl border font-bold text-lg transition-all ${
                  darkMode 
                    ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-pink-600' 
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-pink-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Investors
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
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
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
              Fundraising <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Made Simple</span>
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
              Why Use <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Investor Connect</span>
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
                <CheckCircle2 className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
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
              ? 'bg-gradient-to-br from-pink-600/10 to-rose-600/10 border-pink-600/20'
              : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200'
          }`}
        >
          <h2 className={`text-4xl font-bold mb-6 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Ready to Raise <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Capital?</span>
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Connect with the right investors and secure funding faster
          </p>
          <motion.button
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-pink-600/50 transition-all inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
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

export default InvestorConnect;