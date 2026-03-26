import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Search, Users, Briefcase, TrendingUp, Brain, 
  Menu, X, Sun, Moon, Check, ArrowRight, Zap,
  Target, Network, Rocket, Sparkles, ChevronDown,
  Clock, Shield, DollarSign, Globe, Lightbulb, Award,
  Mail, Phone, Building, MessageSquare, Send, CheckCircle2, AlertCircle
} from 'lucide-react';

// Mouse Follower Component
const MouseFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400/20 to-indigo-500/20 blur-3xl"
      style={{ left: cursorXSpring, top: cursorYSpring }}
    />
  );
};

// Animated Network Background Component
const AnimatedBackground = ({ darkMode }) => {
  // Create more network nodes for denser network
  const nodes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 3,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5
  }));

  // Create connections between nearby nodes - more connections
  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const distance = Math.sqrt(
        Math.pow(nodes[i].x - nodes[j].x, 2) + 
        Math.pow(nodes[i].y - nodes[j].y, 2)
      );
      // Increased connection distance for more visible network
      if (distance < 30) {
        connections.push({
          from: nodes[i],
          to: nodes[j],
          id: `${i}-${j}`,
          distance: distance
        });
      }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Static Network Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? "#2dd4bf" : "#14b8a6"} stopOpacity="0.15" />
            <stop offset="50%" stopColor={darkMode ? "#6366f1" : "#4f46e5"} stopOpacity="0.25" />
            <stop offset="100%" stopColor={darkMode ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Static lines always visible */}
        {connections.map((conn) => (
          <line
            key={`static-${conn.id}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke={darkMode ? "rgba(45, 212, 191, 0.1)" : "rgba(20, 184, 166, 0.15)"}
            strokeWidth="1"
          />
        ))}
        {/* Animated pulsing lines */}
        {connections.map((conn, idx) => (
          <motion.line
            key={`pulse-${conn.id}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: idx * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Animated Network Nodes */}
      {nodes.map(node => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut"
          }}
        >
          {/* Node Core */}
          <motion.div
            className={`rounded-full shadow-lg ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
            style={{
              width: `${node.size}px`,
              height: `${node.size}px`,
              boxShadow: darkMode 
                ? '0 0 10px rgba(45, 212, 191, 0.6)' 
                : '0 0 10px rgba(20, 184, 166, 0.6)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.delay,
            }}
          />
          {/* Node Outer Ring */}
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              darkMode ? 'border-teal-400/40' : 'border-teal-600/40'
            }`}
            style={{
              width: `${node.size * 2.5}px`,
              height: `${node.size * 2.5}px`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.delay,
            }}
          />
        </motion.div>
      ))}

      {/* Data Packets Moving Through Network */}
      {connections.slice(0, 15).map((conn, idx) => (
        <motion.div
          key={`packet-${conn.id}`}
          className={`absolute w-2 h-2 rounded-full shadow-lg ${
            darkMode ? 'bg-indigo-400' : 'bg-indigo-600'
          }`}
          style={{
            boxShadow: darkMode 
              ? '0 0 8px rgba(99, 102, 241, 0.8)' 
              : '0 0 8px rgba(79, 70, 229, 0.8)'
          }}
          animate={{
            left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
            top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: idx * 0.5,
            ease: "linear"
          }}
        />
      ))}

      {/* Larger Data Bursts */}
      {connections.slice(15, 20).map((conn, idx) => (
        <motion.div
          key={`burst-${conn.id}`}
          className={`absolute w-3 h-3 rounded-full ${
            darkMode ? 'bg-purple-400' : 'bg-purple-600'
          }`}
          style={{
            boxShadow: darkMode 
              ? '0 0 12px rgba(139, 92, 246, 0.8)' 
              : '0 0 12px rgba(124, 58, 237, 0.8)'
          }}
          animate={{
            left: [`${conn.from.x}%`, `${conn.to.x}%`],
            top: [`${conn.from.y}%`, `${conn.to.y}%`],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Large Gradient Blobs for depth */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-teal-400/5' : 'bg-teal-400/10'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-indigo-500/5' : 'bg-indigo-400/10'
        }`}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}
        animate={{
          scale: [1, 1.4, 1],
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
const SuperBusinessApp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);


  // api integration for contact form
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    pillarInterest: '',
    planInterest: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ADD THIS NEW useEffect HERE 👇
  useEffect(() => {
    // Auto-open contact form on first visit
    const timer = setTimeout(() => {
      const hasSubmitted = localStorage.getItem('bgt_contact_submitted');
      const hasSeenPopup = sessionStorage.getItem('bgt_popup_shown');
      
      // Show popup only if user hasn't submitted before AND hasn't seen it in this session
      if (!hasSubmitted && !hasSeenPopup) {
        setShowContactForm(true);
        sessionStorage.setItem('bgt_popup_shown', 'true');
      }
    }, 2000); // Opens after 3 seconds

    return () => clearTimeout(timer);
  }, []); // Empty dependency array - runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please provide a valid 10-digit phone number';
    }
    if (!formData.subject.trim() || formData.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Thank you! Your enquiry has been submitted successfully.');

        // ADD THESE TWO LINES 👇
        localStorage.setItem('bgt_contact_submitted', 'true'); // ✅ Prevents auto-popup in future
        sessionStorage.setItem('bgt_popup_shown', 'true'); // ✅ Prevents popup in same session
        
        setFormData({
          name: '', email: '', phone: '', company: '',
          subject: '', message: '', pillarInterest: '', planInterest: ''
        });
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setFormErrors(fieldErrors);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  const pillars = [
    {
      icon: Search,
      title: "Lead Hub",
      description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
      color: "from-teal-400 to-cyan-500",
      features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
    },
    {
      icon: Users,
      title: "Networking Hub",
      description: "Professional networking ecosystem for entrepreneurs and business leaders",
      color: "from-indigo-500 to-purple-600",
      features: ["Global Network", "Events & Meetups", "Referral System"]
    },
    {
      icon: Briefcase,
      title: "Business Suite",
      description: "Complete CRM and project management tools for business operations",
      color: "from-purple-600 to-pink-600",
      features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
    },
    {
      icon: TrendingUp,
      title: "Investor Connect",
      description: "Bridge between startups and investors for funding opportunities",
      color: "from-pink-600 to-rose-600",
      features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
    },
    {
      icon: Brain,
      title: "AI Growth",
      description: "AI-powered business assistant for strategy, insights, and automation",
      color: "from-teal-400 to-indigo-500",
      features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Save 20+ Hours Weekly",
      description: "Automate repetitive tasks and streamline your workflow",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Reduce Costs by 60%",
      description: "One subscription replaces multiple expensive tools",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and compliance standards",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with businesses across 150+ countries",
      color: "from-pink-600 to-rose-600"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Get actionable recommendations in real-time",
      color: "from-rose-600 to-orange-600"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "Join 50,000+ businesses growing faster",
      color: "from-teal-400 to-indigo-500"
    }
  ];

  const faqs = [
    {
      question: "How is BGT different from using separate tools?",
      answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
    },
    {
      question: "Can I integrate my existing tools?",
      answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      features: [
        "Access to Lead Hub",
        "Basic Networking Features",
        "5 AI Queries/day",
        "Email Support",
        "1 User Account"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      features: [
        "All 5 Pillars Access",
        "Unlimited Networking",
        "100 AI Queries/day",
        "Priority Support",
        "5 Team Members",
        "Advanced Analytics",
        "Custom Branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹9,999",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited AI Queries",
        "Dedicated Account Manager",
        "Unlimited Team Members",
        "API Access",
        "White Label Solution",
        "Custom Integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
    } relative`}>
      <AnimatedBackground darkMode={darkMode} />
      <MouseFollower />
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
        darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
                BGT
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${
                    darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'
                  } transition-colors`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-gray-300 hover:text-teal-400' : 'bg-gray-100 text-gray-700 hover:text-teal-600'
                } transition-colors`}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <motion.button 
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-400/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactForm(true)}
              >
                Get Started
              </motion.button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Laptop Mockup */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative pt-32 pb-20 px-4 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
                    darkMode 
                      ? 'bg-teal-400/10 border-teal-400/20 text-teal-400' 
                      : 'bg-teal-50 border-teal-200 text-teal-700'
                  }`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  5 Platforms. 1 Super App. Infinite Growth.
                </motion.span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-5xl md:text-7xl font-bold leading-tight ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                All Your Business Power
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  In One Unified App
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-xl ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button 
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContactForm(true)}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
                    darkMode 
                      ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-teal-400' 
                      : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-500'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 pt-4"
              >
                {pillars.slice(0, 5).map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      delay: 0.8 + idx * 0.1,
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2 + idx * 0.2
                      }
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <pillar.icon className="w-6 h-6 text-white" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Laptop Mockup with Scrolling Website */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Laptop Frame */}
              <div className="relative">
                {/* Laptop Screen */}
                <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
                  darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
                }`} style={{ paddingTop: '62.5%' }}>
                  {/* Screen Content - Scrolling Website */}
                  <div className="absolute inset-0 p-2">
                    <motion.div
                      className={`w-full h-full rounded-lg overflow-hidden ${
                        darkMode ? 'bg-gray-950' : 'bg-white'
                      }`}
                      style={{ 
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Mini Website Content */}
                      <motion.div
                        animate={{ y: [0, -2000, 0] }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="space-y-6 p-6"
                      >
                        {/* Mini Navbar */}
                        <div className={`flex justify-between items-center p-3 rounded-lg ${
                          darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-teal-400" />
                            <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
                          </div>
                          <div className="flex gap-3 text-xs">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
                          </div>
                        </div>

                        {/* Mini Hero */}
                        <div className="text-center space-y-3 py-6">
                          <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            All Your Business
                          </h1>
                          <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                            In One Unified App
                          </p>
                          <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                            5 Platforms. 1 Super App. Infinite Growth.
                          </p>
                          <div className="flex gap-2 justify-center pt-3">
                            <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold">
                              Start Free
                            </div>
                            <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
                              Demo
                            </div>
                          </div>
                        </div>

                        {/* Five Pillars Section */}
                        <div className="space-y-3">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Five Powerful <span className="text-teal-400">Pillars</span>
                          </h2>
                          <div className="grid grid-cols-1 gap-3">
                            {pillars.map((pillar, i) => (
                              <motion.div
                                key={i}
                                className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
                                animate={{ 
                                  scale: [1, 1.02, 1],
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.3,
                                  repeat: Infinity
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
                                    <pillar.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                      {pillar.title}
                                    </h3>
                                    <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                      {pillar.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {pillar.features.map((feature, idx) => (
                                        <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Advantages Section */}
                        <div className="space-y-3 mt-8">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Why Choose <span className="text-teal-400">BGT</span>
                          </h2>
                          <div className="grid grid-cols-2 gap-2">
                            {advantages.slice(0, 4).map((adv, i) => (
                              <div
                                key={i}
                                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
                              >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
                                  <adv.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {adv.title}
                                </h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                  {adv.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mini Pricing Cards */}
                        <div className="space-y-3 mt-8">
                          <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Simple <span className="text-teal-400">Pricing</span>
                          </h2>
                          <div className="grid grid-cols-3 gap-2">
                            {plans.map((plan, i) => (
                              <div
                                key={i}
                                className={`p-3 rounded-xl border ${
                                  plan.popular
                                    ? 'border-teal-400 bg-teal-400/10' 
                                    : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
                                }`}
                              >
                                <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {plan.name}
                                </h4>
                                <div className="text-sm font-bold text-teal-400 mb-2">{plan.price}</div>
                                <div className="space-y-1">
                                  {plan.features.slice(0, 3).map((feature, idx) => (
                                    <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                      <Check className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
                                      <span className="leading-tight">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mini Footer */}
                        <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                          © 2025 BGT. All rights reserved.
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Screen Glare Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                    animate={{
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {/* Laptop Base */}
                <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
                  darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
                }`}></div>

                {/* Laptop Bottom */}
                <div className={`h-2 rounded-b-3xl mx-auto ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`} style={{ width: '80%' }}></div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Advantages Section with 3D Floating Cards */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Why Businesses <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Love BGT</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discover the powerful advantages that set us apart from traditional business tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400' 
                    : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {advantage.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Pillars Section with Carousel Animation */}
      <section id="pillars" className={`py-32 px-4 relative ${
        darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Five Powerful <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Pillars</span>
              </h2>
            </motion.div>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
            </p>
          </motion.div>

          {/* Interactive Card Deck */}
          <div className="relative h-[650px] flex items-center justify-center">
            {/* Navigation Arrows */}
            <motion.button
              onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
              className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
                darkMode 
                  ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
                  : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
              }`}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            </motion.button>

            <motion.button
              onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
              className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
                darkMode 
                  ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
                  : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
              }`}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
            </motion.button>

            {/* Cards Stack */}
            {pillars.map((pillar, idx) => {
              const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
              const diff = idx - selectedIndex;
              const absDiff = Math.abs(diff);
              
              // Calculate position based on index relative to selected
              let x = 0;
              let y = 0;
              let scale = 1;
              let zIndex = 5;
              let opacity = 1;
              let rotateY = 0;

              if (idx === selectedIndex) {
                // Center card
                x = 0;
                y = 0;
                scale = 1.1;
                zIndex = 20;
                opacity = 1;
                rotateY = 0;
              } else if (diff < 0) {
                // Cards on the left
                x = -150 * absDiff - 100;
                y = 20 * absDiff;
                scale = 1 - (absDiff * 0.15);
                zIndex = 5 - absDiff;
                opacity = 0.6 - (absDiff * 0.2);
                rotateY = -30;
              } else {
                // Cards on the right
                x = 150 * absDiff + 100;
                y = 20 * absDiff;
                scale = 1 - (absDiff * 0.15);
                zIndex = 5 - absDiff;
                opacity = 0.6 - (absDiff * 0.2);
                rotateY = 30;
              }
              
              return (
                <motion.div
                  key={idx}
                  className="absolute cursor-pointer"
                  style={{
                    zIndex,
                    perspective: '1000px'
                  }}
                  animate={{
                    x,
                    y,
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                  onClick={() => setHoveredPillar(idx)}
                  whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
                >
                  <motion.div
                    className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
                      idx === selectedIndex
                        ? darkMode 
                          ? 'bg-gray-800/90 border-teal-400' 
                          : 'bg-white border-teal-400'
                        : darkMode
                          ? 'bg-gray-800/60 border-gray-700'
                          : 'bg-white/80 border-gray-300'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Active Card Effects */}
                    {idx === selectedIndex && (
                      <>
                        {/* Animated Border Particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-teal-400"
                            style={{
                              left: `${(i / 20) * 100}%`,
                              top: i % 2 === 0 ? 0 : '100%',
                            }}
                            animate={{
                              scale: [0, 1.5, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}

                        {/* Glowing Background */}
                        <motion.div
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Floating Particles */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={`particle-${i}`}
                            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -50, 0],
                              x: [0, Math.random() * 30 - 15, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 2, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.4,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Card Number Badge */}
                    <motion.div
                      className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      animate={idx === selectedIndex ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      } : {}}
                      transition={{ 
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      {idx + 1}
                    </motion.div>

                    {/* Icon */}
                    <motion.div 
                      className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                      animate={idx === selectedIndex ? { 
                        rotate: [0, 360]
                      } : {}}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {idx === selectedIndex && (
                        <motion.div
                          className="absolute inset-0 border-4 border-white/30 rounded-2xl"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
                    </motion.div>
                    
                    <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {pillar.title}
                    </h3>
                    
                    <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {pillar.description}
                    </p>
                    
                    {/* Features - Only show for selected card */}
                    {/* {idx === selectedIndex && (
                      <div className="space-y-3">
                        {pillar.features.map((feature, fidx) => (
                          <motion.div 
                            key={fidx} 
                            className={`flex items-center text-sm ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: fidx * 0.1 }}
                          >
                            <motion.div 
                              className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                            <span className="font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                    )} */}
                    {/* Features - Only show for selected card */}
                    {idx === selectedIndex && (
                      <>
                        <div className="space-y-3 mb-6">
                          {pillar.features.map((feature, fidx) => (
                            <motion.div 
                              key={fidx} 
                              className={`flex items-center text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fidx * 0.1 }}
                            >
                              <motion.div 
                                className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                              <span className="font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Read More Button */}
                        <motion.a
                          href={`/${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center Glow Effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <motion.p
              className={`text-lg font-medium mb-6 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Click any card or use arrows to explore
            </motion.p>
            <div className="flex justify-center gap-4">
              {pillars.map((pillar, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setHoveredPillar(idx)}
                  className={`group flex flex-col items-center gap-2 ${
                    (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
                  } transition-opacity`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
                    animate={{
                      width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '48px' }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section with Flip Animation */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Simple, <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transparent</span> Pricing
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Choose the plan that fits your business. All plans include access to our unified ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
                  plan.popular
                    ? darkMode 
                      ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400 shadow-xl shadow-teal-400/20'
                      : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-400 shadow-xl shadow-teal-400/20'
                    : darkMode
                      ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400'
                      : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white text-sm font-bold"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {plan.popular && (
                  <>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-teal-400"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -50, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <motion.li 
                      key={fidx} 
                      className={`flex items-start ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button 
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-white hover:shadow-xl hover:shadow-teal-400/50'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContactForm(true)}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faqs" className={`py-20 px-4 relative ${
        darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to know about BGT
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl overflow-hidden border ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700' 
                    : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <motion.button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
                    darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
                >
                  <span className={`text-lg font-semibold pr-8 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
                      darkMode ? 'text-teal-400' : 'text-teal-600'
                    }`} />
                  </motion.div>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === idx ? 'auto' : 0,
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`px-8 pb-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Pulsing Glow */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400/20'
              : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-200'
          }`}
        >
          <motion.div
            className={`absolute inset-0 ${
              darkMode ? 'opacity-50' : 'opacity-30'
            }`}
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-teal-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          <div className="relative z-10">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Ready to <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join thousands of businesses already growing faster with our unified Super App platform.
            </p>
            <motion.button 
              className="group px-10 py-5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all inline-flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(45, 212, 191, 0)",
                  "0 0 40px rgba(45, 212, 191, 0.6)",
                  "0 0 0px rgba(45, 212, 191, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => setShowContactForm(true)}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer with Wave Animation */}
      <footer className={`relative border-t py-12 px-4 overflow-hidden ${
        darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
      }`}>
        <motion.div
          className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3)), linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3))',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
                  BGT
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All your business power in one unified ecosystem.
              </p>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Product
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Company
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-bold mb-4 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Legal
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t pt-8 text-center text-sm ${
            darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
<motion.button
  onClick={() => setShowContactForm(true)}
  className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
    darkMode 
      ? 'bg-gradient-to-r from-teal-400 to-indigo-500' 
      : 'bg-gradient-to-r from-teal-500 to-indigo-600'
  } text-white hover:scale-110 transition-transform`}
  whileHover={{ scale: 1.15, rotate: 90 }}
  whileTap={{ scale: 0.95 }}
  animate={{
    boxShadow: [
      "0 0 0 0 rgba(45, 212, 191, 0.7)",
      "0 0 0 10px rgba(45, 212, 191, 0)",
      "0 0 0 0 rgba(45, 212, 191, 0)"
    ]
  }}
  transition={{
    boxShadow: {
      duration: 2,
      repeat: Infinity
    }
  }}
>
  <MessageSquare className="w-7 h-7" />
</motion.button>
     
     {showContactForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowContactForm(false)}>
          <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} onClick={(e) => e.stopPropagation()}>
            <motion.button onClick={() => !isSubmitting && setShowContactForm(false)} className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} disabled={isSubmitting}>
              <X className="w-6 h-6" />
            </motion.button>

            <div className="relative p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 mb-4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Mail className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Get in <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tell us about your business needs and we'll get back to you within 24 hours</p>
              </div>

              {submitStatus && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${submitStatus === 'success' ? darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200' : darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                  {submitStatus === 'success' ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className={`font-semibold ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{submitStatus === 'success' ? 'Success!' : 'Error'}</p>
                    <p className={`text-sm ${submitStatus === 'success' ? darkMode ? 'text-green-400' : 'text-green-700' : darkMode ? 'text-red-400' : 'text-red-700'}`}>{submitMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                      <Users className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                      <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                    <div className="relative">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="1234567890" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                      <Phone className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
                    <div className="relative">
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your Company Inc." disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                      <Building className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pillar of Interest</label>
                    <select name="pillarInterest" value={formData.pillarInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
                      <option value="">Select a pillar</option>
                      <option value="Lead Hub">Lead Hub</option>
                      <option value="Networking Hub">Networking Hub</option>
                      <option value="Business Suite">Business Suite</option>
                      <option value="Investor Connect">Investor Connect</option>
                      <option value="AI Growth">AI Growth</option>
                      <option value="All Pillars">All Pillars</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plan of Interest</label>
                    <select name="planInterest" value={formData.planInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
                      <option value="">Select a plan</option>
                      <option value="Starter">Starter</option>
                      <option value="Professional">Professional</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject <span className="text-red-500">*</span></label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="How can we help you?" disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${formErrors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                  {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us more about your requirements..." rows="5" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
                    <MessageSquare className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>

                <motion.button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-teal-400 to-indigo-500 hover:shadow-xl hover:shadow-teal-400/50'} text-white`} whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
                  {isSubmitting ? (
                    <>
                      <motion.div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className={`text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>We'll respond within 24 hours. Your information is secure and confidential.</p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SuperBusinessApp;