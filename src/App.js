// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400/20 to-indigo-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={darkMode ? "#2dd4bf" : "#14b8a6"} stopOpacity="0.15" />
//             <stop offset="50%" stopColor={darkMode ? "#6366f1" : "#4f46e5"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke={darkMode ? "rgba(45, 212, 191, 0.1)" : "rgba(20, 184, 166, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(45, 212, 191, 0.6)' 
//                 : '0 0 10px rgba(20, 184, 166, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-teal-400/40' : 'border-teal-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-indigo-400' : 'bg-indigo-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(99, 102, 241, 0.8)' 
//               : '0 0 8px rgba(79, 70, 229, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-purple-400' : 'bg-purple-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(139, 92, 246, 0.8)' 
//               : '0 0 12px rgba(124, 58, 237, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-teal-400/5' : 'bg-teal-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-indigo-500/5' : 'bg-indigo-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-teal-400 to-cyan-500",
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-indigo-500 to-purple-600",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-purple-600 to-pink-600",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-pink-600 to-rose-600",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-teal-400 to-indigo-500",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-teal-400 to-cyan-500"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-indigo-500 to-purple-600"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-purple-600 to-pink-600"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-pink-600 to-rose-600"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-rose-600 to-orange-600"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-teal-400 to-indigo-500"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-teal-400' : 'bg-gray-100 text-gray-700 hover:text-teal-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       ? 'bg-teal-400/10 border-teal-400/20 text-teal-400' 
//                       : 'bg-teal-50 border-teal-200 text-teal-700'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-teal-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-500'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-teal-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold">
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-teal-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-teal-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-teal-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? 'border-teal-400 bg-teal-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-teal-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400' 
//                     : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Carousel Animation */}
//      {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               // Calculate position based on index relative to selected
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 // Center card
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 // Cards on the left
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 // Cards on the right
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? darkMode 
//                           ? 'bg-gray-800/90 border-teal-400' 
//                           : 'bg-white border-teal-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-teal-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-center text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400 shadow-xl shadow-teal-400/20'
//                       : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-400 shadow-xl shadow-teal-400/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400'
//                       : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full bg-teal-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-white hover:shadow-xl hover:shadow-teal-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-teal-400' : 'text-teal-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400/20'
//               : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full bg-teal-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                   "0 0 40px rgba(45, 212, 191, 0.6)",
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             backgroundImage: 'linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3)), linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;


































///////////////////// colour -1 /////////////////////// my choice 
// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       // CHANGED: Gradient from Teal/Indigo to Amber/Sky
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-amber-400/20 to-sky-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             {/* CHANGED: Gradient Stops to Amber/Sky/Violet */}
//             <stop offset="0%" stopColor={darkMode ? "#fbbf24" : "#f59e0b"} stopOpacity="0.15" /> 
//             <stop offset="50%" stopColor={darkMode ? "#38bdf8" : "#0284c7"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             // CHANGED: Static line color from Teal to Sky
//             stroke={darkMode ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             // CHANGED: Node Core color from Teal to Amber
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-amber-400' : 'bg-amber-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 // CHANGED: Shadow color from Teal to Amber
//                 ? '0 0 10px rgba(251, 191, 36, 0.6)' 
//                 : '0 0 10px rgba(245, 158, 11, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               // CHANGED: Outer Ring color from Teal to Amber
//               darkMode ? 'border-amber-400/40' : 'border-amber-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             // CHANGED: Data Packet color from Indigo to Sky
//             darkMode ? 'bg-sky-400' : 'bg-sky-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               // CHANGED: Shadow color from Indigo to Sky
//               ? '0 0 8px rgba(56, 189, 248, 0.8)' 
//               : '0 0 8px rgba(2, 132, 199, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             // CHANGED: Data Burst color remains Purple/Violet for variety
//             darkMode ? 'bg-violet-400' : 'bg-violet-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               // CHANGED: Shadow color from Purple to Violet
//               ? '0 0 12px rgba(167, 139, 250, 0.8)' 
//               : '0 0 12px rgba(109, 40, 217, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           // CHANGED: Blob 1 from Teal to Amber
//           darkMode ? 'bg-amber-400/5' : 'bg-amber-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           // CHANGED: Blob 2 from Indigo to Sky
//           darkMode ? 'bg-sky-500/5' : 'bg-sky-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           // CHANGED: Blob 3 from Purple to Violet
//           darkMode ? 'bg-violet-500/5' : 'bg-violet-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   // CHANGED: Pillar colors to use a new, diverse palette (Amber, Sky, Emerald, Rose, Violet)
//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-amber-400 to-orange-500", // New: Amber/Orange
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-sky-500 to-blue-600", // New: Sky/Blue
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-emerald-600 to-green-600", // New: Emerald/Green
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-rose-600 to-red-600", // New: Rose/Red
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-violet-400 to-purple-500", // New: Violet/Purple
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   // CHANGED: Advantage colors to match the new palette
//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-amber-400 to-orange-500" // New: Amber/Orange
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-sky-500 to-blue-600" // New: Sky/Blue
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-emerald-600 to-green-600" // New: Emerald/Green
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-rose-600 to-red-600" // New: Rose/Red
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-violet-600 to-purple-600" // New: Violet/Purple
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-amber-400 to-sky-500" // New: Amber/Sky
//     }
//   ];

//   const faqs = [
//     // ... (FAQs remain the same)
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     // ... (Plans remain the same)
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 // CHANGED: Navbar logo color from Teal/Indigo to Amber/Sky
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-sky-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span 
//                 // CHANGED: BGT text gradient from Teal/Indigo to Amber/Sky
//                 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//               >
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     // CHANGED: Hover color from Teal to Amber
//                     darkMode ? 'text-gray-300 hover:text-amber-400' : 'text-gray-700 hover:text-amber-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   // CHANGED: Hover color from Teal to Amber
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-amber-400' : 'bg-gray-100 text-gray-700 hover:text-amber-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 // CHANGED: Button gradient from Teal/Indigo to Amber/Sky, shadow from Teal to Amber
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-sky-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {/* ... (Mobile menu remains the same, except for primary colors) */}

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       // CHANGED: Badge colors from Teal to Amber
//                       ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' 
//                       : 'bg-amber-50 border-amber-200 text-amber-700'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span 
//                   // CHANGED: Headline gradient from Teal/Indigo/Purple to Amber/Sky/Violet
//                   className="bg-gradient-to-r from-amber-400 via-sky-500 to-violet-600 bg-clip-text text-transparent"
//                 >
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   // CHANGED: Primary button gradient from Teal/Indigo to Amber/Sky, shadow from Teal to Amber
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-sky-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       // CHANGED: Secondary button hover border from Teal to Amber
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-amber-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-amber-500'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {/* Pillar icons use the new color combination defined above */}
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             {/* CHANGED: Mini Navbar icon color from Teal to Amber */}
//                             <Zap className="w-5 h-5 text-amber-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${
//                             // CHANGED: Mini Hero text color from Teal to Amber
//                             darkMode ? 'text-amber-400' : 'text-amber-600'
//                           }`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div 
//                               // CHANGED: Mini Hero button gradient from Teal/Indigo to Amber/Sky
//                               className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-amber-400 to-sky-500 text-white font-semibold"
//                             >
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             {/* CHANGED: Pillar section heading color from Teal to Amber */}
//                             Five Powerful <span className="text-amber-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   {/* Pillar icon color uses new palette */}
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             {/* CHANGED: Advantage section heading color from Teal to Amber */}
//                             Why Choose <span className="text-amber-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 {/* Advantage icon color uses new palette */}
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             {/* CHANGED: Pricing section heading color from Teal to Amber */}
//                             Simple <span className="text-amber-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     // CHANGED: Popular card border/bg color from Teal to Amber
//                                     ? 'border-amber-400 bg-amber-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div 
//                                   // CHANGED: Price color from Teal to Amber
//                                   className="text-sm font-bold text-amber-400 mb-2"
//                                 >
//                                   {plan.price}
//                                 </div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       {/* CHANGED: Check icon color from Teal to Amber */}
//                                       <Check className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     // CHANGED: Glow colors from Teal/Indigo to Amber/Sky
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span 
//                 // CHANGED: Headline gradient from Teal/Indigo to Amber/Sky
//                 className="bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//               >
//                 Love BGT
//               </span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400' 
//                     : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span 
//                   // CHANGED: Headline gradient from Teal/Indigo/Purple to Amber/Sky/Violet
//                   className="bg-gradient-to-r from-amber-400 via-sky-500 to-violet-600 bg-clip-text text-transparent"
//                 >
//                   Pillars
//                 </span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   // CHANGED: Arrow color from Teal to Amber
//                   ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400' 
//                   : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   // CHANGED: Arrow color from Teal to Amber
//                   ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400' 
//                   : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               // Calculate position based on index relative to selected
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 // Center card
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 // Cards on the left
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 // Cards on the right
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? darkMode 
//                           // CHANGED: Selected card border from Teal to Amber
//                           ? 'bg-gray-800/90 border-amber-400' 
//                           : 'bg-white border-amber-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             // CHANGED: Border Particle color from Teal to Amber
//                             className="absolute w-2 h-2 rounded-full bg-amber-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-center text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               {/* CHANGED: Check icon color is set by the pillar's gradient for consistency */}
//                               <Check className="w-3 h-3 text-white" /> 
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span 
//                 // CHANGED: Headline gradient from Teal/Indigo to Amber/Sky
//                 className="bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//               >
//                 Transparent
//               </span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       // CHANGED: Popular card colors from Teal/Indigo to Amber/Sky
//                       ? 'bg-gradient-to-br from-amber-400/10 to-sky-500/10 border-amber-400 shadow-xl shadow-amber-400/20'
//                       : 'bg-gradient-to-br from-amber-50 to-sky-50 border-amber-400 shadow-xl shadow-amber-400/20'
//                     : darkMode
//                       // CHANGED: Hover border from Teal to Amber
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400'
//                       : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     // CHANGED: Popular badge gradient from Teal/Indigo to Amber/Sky
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-sky-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         // CHANGED: Popular card particle color from Teal to Amber
//                         className="absolute w-1 h-1 rounded-full bg-amber-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span 
//                       // CHANGED: Price gradient from Teal/Indigo to Amber/Sky
//                       className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//                     >
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       {/* CHANGED: Check icon color from Teal to Amber */}
//                       <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       // CHANGED: Popular button gradient from Teal/Indigo to Amber/Sky, shadow from Teal to Amber
//                       ? 'bg-gradient-to-r from-amber-400 to-sky-500 text-white hover:shadow-xl hover:shadow-amber-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span 
//                 // CHANGED: Headline gradient from Teal/Indigo to Amber/Sky
//                 className="bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//               >
//                 Questions
//               </span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* CHANGED: Chevron color from Teal to Amber */}
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-amber-400' : 'text-amber-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               // CHANGED: CTA border/bg from Teal/Indigo to Amber/Sky
//               ? 'bg-gradient-to-br from-amber-400/10 to-sky-500/10 border-amber-400/20'
//               : 'bg-gradient-to-br from-amber-50 to-sky-50 border-amber-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               // CHANGED: CTA glow gradient from Teal/Indigo to Amber/Sky
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               // CHANGED: CTA particle color from Teal to Amber
//               className="absolute w-2 h-2 rounded-full bg-amber-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span 
//                 // CHANGED: Headline gradient from Teal/Indigo to Amber/Sky
//                 className="bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//               >
//                 Transform
//               </span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               // CHANGED: CTA button gradient from Teal/Indigo to Amber/Sky, shadow from Teal to Amber
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-amber-400 to-sky-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 // CHANGED: Button pulse shadow from Teal to Amber
//                 boxShadow: [
//                   "0 0 0px rgba(251, 191, 36, 0)",
//                   "0 0 40px rgba(251, 191, 36, 0.6)",
//                   "0 0 0px rgba(251, 191, 36, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             // CHANGED: Footer wave background color from Teal to Amber
//             backgroundImage: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3)), linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   // CHANGED: Footer logo color from Teal/Indigo to Amber/Sky
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-sky-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span 
//                   // CHANGED: Footer text gradient from Teal/Indigo to Amber/Sky
//                   className="text-xl font-bold bg-gradient-to-r from-amber-400 to-sky-500 bg-clip-text text-transparent"
//                 >
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* CHANGED: Link hover color from Teal to Amber */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* CHANGED: Link hover color from Teal to Amber */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* CHANGED: Link hover color from Teal to Amber */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;

////////////////////////////  clour -1 ////////////////////////// my choice 























///////// clour -2 orange ////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-red-500/20 to-orange-600/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={darkMode ? "#f87171" : "#dc2626"} stopOpacity="0.15" />
//             <stop offset="50%" stopColor={darkMode ? "#fb923c" : "#ea580c"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#c084fc" : "#9333ea"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke={darkMode ? "rgba(248, 113, 113, 0.1)" : "rgba(220, 38, 38, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-red-500' : 'bg-red-700'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(248, 113, 113, 0.6)' 
//                 : '0 0 10px rgba(220, 38, 38, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-red-500/40' : 'border-red-700/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-blue-500' : 'bg-blue-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(59, 130, 246, 0.8)' 
//               : '0 0 8px rgba(37, 99, 235, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-violet-500' : 'bg-violet-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(167, 139, 250, 0.8)' 
//               : '0 0 12px rgba(109, 40, 217, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-red-500/5' : 'bg-red-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-orange-600/5' : 'bg-orange-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-violet-600/5' : 'bg-violet-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-red-500 to-orange-600",
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-blue-600 to-violet-700",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-violet-700 to-emerald-500",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-emerald-500 to-lime-600",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-red-500 to-orange-600",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-red-500 to-orange-600"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-blue-600 to-violet-700"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-violet-700 to-emerald-500"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-emerald-500 to-lime-600"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-lime-600 to-yellow-500"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-red-500 to-orange-600"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-700'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-red-500' : 'bg-gray-100 text-gray-700 hover:text-red-700'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       ? 'bg-red-500/10 border-red-500/20 text-red-500' 
//                       : 'bg-red-50 border-red-200 text-red-800'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span className="bg-gradient-to-r from-red-500 via-orange-600 to-blue-600 bg-clip-text text-transparent">
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-red-500' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-red-600'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-red-500" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-red-500' : 'text-red-700'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold">
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-red-500">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-red-500">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-red-500">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? 'border-red-500 bg-red-500/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-red-500 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-red-500' 
//                     : 'bg-white border-gray-200 hover:border-red-500 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span className="bg-gradient-to-r from-red-500 via-orange-600 to-blue-600 bg-clip-text text-transparent">Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-red-500/50 hover:border-red-500' 
//                   : 'bg-white/80 border-red-500/50 hover:border-red-500'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-red-500' : 'text-red-700'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-red-500/50 hover:border-red-500' 
//                   : 'bg-white/80 border-red-500/50 hover:border-red-500'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-red-500' : 'text-red-700'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               // Calculate position based on index relative to selected
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 // Center card
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 // Cards on the left
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 // Cards on the right
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? darkMode 
//                           ? 'bg-gray-800/90 border-red-500' 
//                           : 'bg-white border-red-500'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-red-500"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-center text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? 'bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500 shadow-xl shadow-red-500/20'
//                       : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-500 shadow-xl shadow-red-500/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-red-500'
//                       : 'bg-white border-gray-200 hover:border-red-500 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-600 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full bg-red-500"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-xl hover:shadow-red-500/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-red-500' : 'text-red-700'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500/20'
//               : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full bg-red-500"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(239, 68, 68, 0)",
//                   "0 0 40px rgba(239, 68, 68, 0.6)",
//                   "0 0 0px rgba(239, 68, 68, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             backgroundImage: 'linear-gradient(45deg, rgba(239, 68, 68, 0.3) 25%, transparent 25%, transparent 75%, rgba(239, 68, 68, 0.3) 75%, rgba(239, 68, 68, 0.3)), linear-gradient(45deg, rgba(239, 68, 68, 0.3) 25%, transparent 25%, transparent 75%, rgba(239, 68, 68, 0.3) 75%, rgba(239, 68, 68, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-red-500 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;



//////////////////////////////// option 2 ////////////////////////////////





















///////////////////////////////////////// option 3 ///////////////////////////// ediii fixed version ////////////////////////

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       // Primary Gradient: Amber/Orange
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             {/* Using Amber/Orange/Violet for background gradient pulse */}
//             <stop offset="0%" stopColor={darkMode ? "#f59e0b" : "#d97706"} stopOpacity="0.15" /> 
//             <stop offset="50%" stopColor={darkMode ? "#fb923c" : "#ea580c"} stopOpacity="0.25" /> 
//             <stop offset="100%" stopColor={darkMode ? "#c084fc" : "#9333ea"} stopOpacity="0.15" /> 
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             // Amber/Orange for subtle lines
//             stroke={darkMode ? "rgba(251, 191, 36, 0.1)" : "rgba(234, 88, 12, 0.15)"} 
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core - Amber/Orange */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-amber-400' : 'bg-orange-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(251, 191, 36, 0.6)' 
//                 : '0 0 10px rgba(234, 88, 12, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring - Amber/Orange */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-amber-400/40' : 'border-orange-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network - Kept Blue/Violet for contrast */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-blue-500' : 'bg-blue-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(59, 130, 246, 0.8)' 
//               : '0 0 8px rgba(37, 99, 235, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts - Violet */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-violet-500' : 'bg-violet-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(167, 139, 250, 0.8)' 
//               : '0 0 12px rgba(109, 40, 217, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth - Amber/Orange/Violet */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-amber-400/5' : 'bg-amber-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-orange-500/5' : 'bg-orange-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-violet-600/5' : 'bg-violet-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   // Updated Pillars with New Color Palette
//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       // 1. Primary: Amber/Orange
//       color: "from-amber-400 to-orange-500", 
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       // 2. Secondary Accent: Rose/Pink
//       color: "from-rose-500 to-pink-600",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       // 3. Tertiary Accent: Violet/Purple
//       color: "from-violet-600 to-purple-600",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       // 4. Supporting Color: Blue/Cyan
//       color: "from-blue-600 to-cyan-600",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       // 5. Fresh Accent: Emerald/Teal
//       color: "from-emerald-400 to-teal-500",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   // Updated Advantages with New Color Palette (6 total)
//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       // 1. Primary: Amber/Orange
//       color: "from-amber-400 to-orange-500"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       // 2. Secondary Accent: Rose/Pink
//       color: "from-rose-500 to-pink-600"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       // 3. Tertiary Accent: Violet/Purple
//       color: "from-violet-600 to-purple-600"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       // 4. Supporting Color: Blue/Cyan
//       color: "from-blue-600 to-cyan-600"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       // 5. Fresh Accent: Emerald/Teal
//       color: "from-emerald-400 to-teal-500"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       // 6. Extra Pop: Fuchsia/Pink
//       color: "from-fuchsia-500 to-pink-600"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 // Primary Gradient
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span 
//                 // Primary Gradient
//                 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//               >
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     // Primary color for hover
//                     darkMode ? 'text-gray-300 hover:text-amber-400' : 'text-gray-700 hover:text-orange-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   // Primary color for hover
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-amber-400' : 'bg-gray-100 text-gray-700 hover:text-orange-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 // Primary Gradient
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     // Primary color badge
//                     darkMode 
//                       ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' 
//                       : 'bg-amber-50 border-amber-200 text-orange-800'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span 
//                   // Multi-color gradient for headline emphasis
//                   className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent"
//                 >
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   // Primary CTA Button Gradient
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     // Secondary CTA hover border
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-amber-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-orange-600'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     // Pillar colors (from the new palette)
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame (color changes in this section are minor, mostly keeping gray/white) */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-amber-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-amber-400' : 'text-orange-600'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div 
//                               // Primary Gradient
//                               className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold"
//                             >
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-amber-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   {/* Pillar colors */}
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-amber-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 {/* Advantage colors */}
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-amber-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? // Popular border/bg color
//                                       'border-amber-400 bg-amber-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-amber-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect (using Amber/Orange) */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//               >Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   // Primary color hover border
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400' 
//                     : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   // Advantage colors
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span 
//                   // Multi-color gradient for headline emphasis
//                   className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent"
//                 >Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 // Primary color border/text
//                 darkMode 
//                   ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400' 
//                   : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-amber-400' : 'text-orange-600'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 // Primary color border/text
//                 darkMode 
//                   ? 'bg-gray-800/80 border-amber-400/50 hover:border-amber-400' 
//                   : 'bg-white/80 border-amber-400/50 hover:border-amber-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-amber-400' : 'text-orange-600'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? // Selected card border color
//                           darkMode 
//                           ? 'bg-gray-800/90 border-amber-400' 
//                           : 'bg-white border-amber-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles (using Primary color) */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-amber-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background (Pillar's specific color) */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles (Pillar's specific color) */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge (Pillar's specific color) */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon (Pillar's specific color) */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-start text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               // Pillar's specific color for checkmark background
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect (Pillar's specific color) */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div 
//                 className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} 
//               />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div 
//                     // Pillar's specific color for dot icon
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     // Pillar's specific color for active indicator bar
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//               >Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? // Popular dark mode styling
//                         'bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-amber-400 shadow-xl shadow-amber-400/20'
//                       : // Popular light mode styling
//                         'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-xl shadow-amber-400/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-amber-400'
//                       : 'bg-white border-gray-200 hover:border-amber-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     // Primary Gradient
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         // Primary color particle
//                         className="absolute w-1 h-1 rounded-full bg-amber-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -100],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span 
//                       // Primary Gradient
//                       className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//                     >
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? // Primary Gradient
//                         'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-xl hover:shadow-amber-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//               >Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Primary color for chevron icon */}
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-amber-400' : 'text-orange-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-amber-400/10 to-orange-500/10 border-amber-400/20'
//               : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               // Primary glow
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               // Primary color particle
//               className="absolute w-2 h-2 rounded-full bg-amber-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//               >Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               // Primary CTA Button Gradient with Pulsing Shadow
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(251, 191, 36, 0)",
//                   "0 0 40px rgba(251, 191, 36, 0.6)",
//                   "0 0 0px rgba(251, 191, 36, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             // Primary color subtle wave background
//             backgroundImage: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3)), linear-gradient(45deg, rgba(251, 191, 36, 0.3) 25%, transparent 25%, transparent 75%, rgba(251, 191, 36, 0.3) 75%, rgba(251, 191, 36, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   // Primary Gradient
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span 
//                   // Primary Gradient
//                   className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
//                 >
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;
////////////////////////////////////////////////////





























////////////////////////////////// brighter version of 1st code /////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       // Primary Gradient: Blue/Indigo (TRUST)
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-blue-600/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             {/* Using Indigo/Blue/Violet for background gradient pulse */}
//             <stop offset="0%" stopColor={darkMode ? "#4f46e5" : "#3730a3"} stopOpacity="0.15" /> 
//             <stop offset="50%" stopColor={darkMode ? "#60a5fa" : "#2563eb"} stopOpacity="0.25" /> 
//             <stop offset="100%" stopColor={darkMode ? "#c084fc" : "#9333ea"} stopOpacity="0.15" /> 
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             // Indigo/Blue for subtle lines
//             stroke={darkMode ? "rgba(99, 102, 241, 0.1)" : "rgba(37, 99, 235, 0.15)"} 
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core - Blue/Indigo */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-indigo-400' : 'bg-blue-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(129, 140, 248, 0.6)' 
//                 : '0 0 10px rgba(37, 99, 235, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring - Blue/Indigo */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-indigo-400/40' : 'border-blue-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network - Kept Blue/Violet for contrast */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-emerald-500' : 'bg-emerald-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(16, 185, 129, 0.8)' 
//               : '0 0 8px rgba(5, 150, 105, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts - Violet */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-violet-500' : 'bg-violet-700'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(167, 139, 250, 0.8)' 
//               : '0 0 12px rgba(109, 40, 217, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth - Blue/Indigo/Violet */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-indigo-600/5' : 'bg-indigo-600/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-blue-600/5' : 'bg-blue-600/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-violet-600/5' : 'bg-violet-500/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   // Updated Pillars with New Color Palette
//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       // 1. Primary: Blue/Indigo (TRUST)
//       color: "from-indigo-600 to-blue-600", 
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       // 2. Secondary Accent: Emerald/Teal (GROWTH)
//       color: "from-emerald-400 to-teal-500",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       // 3. Tertiary Accent: Violet/Purple (INNOVATION)
//       color: "from-violet-600 to-purple-600",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       // 4. Supporting Color: Red/Orange (URGENCY/CONTRAST)
//       color: "from-red-500 to-orange-500",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       // 5. Fresh Accent: Rose/Pink (MODERN)
//       color: "from-rose-500 to-pink-600",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   // Updated Advantages with New Color Palette (6 total)
//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       // 1. Primary: Blue/Indigo (TRUST)
//       color: "from-indigo-600 to-blue-600"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       // 2. Secondary Accent: Emerald/Teal (GROWTH)
//       color: "from-emerald-400 to-teal-500"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       // 3. Tertiary Accent: Violet/Purple (INNOVATION)
//       color: "from-violet-600 to-purple-600"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       // 4. Supporting Color: Red/Orange (URGENCY/CONTRAST)
//       color: "from-red-500 to-orange-500"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       // 5. Fresh Accent: Rose/Pink (MODERN)
//       color: "from-rose-500 to-pink-600"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       // 6. Extra Pop: Fuchsia/Pink (HIGH-ENERGY)
//       color: "from-fuchsia-500 to-pink-600"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 // Primary Gradient
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span 
//                 // Primary Gradient
//                 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//               >
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     // Primary color for hover
//                     darkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-blue-700'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   // Primary color for hover
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-indigo-400' : 'bg-gray-100 text-gray-700 hover:text-blue-700'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 // Primary Gradient
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     // Primary color badge
//                     darkMode 
//                       ? 'bg-indigo-600/10 border-indigo-600/20 text-indigo-400' 
//                       : 'bg-indigo-50 border-indigo-200 text-blue-800'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span 
//                   // Multi-color gradient for headline emphasis
//                   className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent"
//                 >
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   // Primary CTA Button Gradient
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-600/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     // Secondary CTA hover border
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-indigo-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-blue-700'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     // Pillar colors (from the new palette)
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame (color changes in this section are minor, mostly keeping gray/white) */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-indigo-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-indigo-400' : 'text-blue-700'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div 
//                               // Primary Gradient
//                               className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold"
//                             >
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-indigo-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   {/* Pillar colors */}
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-indigo-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 {/* Advantage colors */}
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-indigo-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? // Popular border/bg color
//                                       'border-indigo-400 bg-indigo-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-indigo-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect (using Blue/Indigo) */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//               >Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   // Primary color hover border
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-indigo-400' 
//                     : 'bg-white border-gray-200 hover:border-indigo-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   // Advantage colors
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span 
//                   // Multi-color gradient for headline emphasis
//                   className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent"
//                 >Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 // Primary color border/text
//                 darkMode 
//                   ? 'bg-gray-800/80 border-indigo-400/50 hover:border-indigo-400' 
//                   : 'bg-white/80 border-indigo-400/50 hover:border-indigo-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-indigo-400' : 'text-blue-700'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 // Primary color border/text
//                 darkMode 
//                   ? 'bg-gray-800/80 border-indigo-400/50 hover:border-indigo-400' 
//                   : 'bg-white/80 border-indigo-400/50 hover:border-indigo-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-indigo-400' : 'text-blue-700'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? // Selected card border color
//                           darkMode 
//                           ? 'bg-gray-800/90 border-indigo-400' 
//                           : 'bg-white border-indigo-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles (using Primary color) */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-indigo-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background (Pillar's specific color) */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles (Pillar's specific color) */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge (Pillar's specific color) */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon (Pillar's specific color) */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-start text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               // Pillar's specific color for checkmark background
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect (Pillar's specific color) */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div 
//                 className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} 
//               />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div 
//                     // Pillar's specific color for dot icon
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     // Pillar's specific color for active indicator bar
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//               >Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? // Popular dark mode styling
//                         'bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border-indigo-400 shadow-xl shadow-indigo-600/20'
//                       : // Popular light mode styling
//                         'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-400 shadow-xl shadow-indigo-600/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-indigo-400'
//                       : 'bg-white border-gray-200 hover:border-indigo-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     // Primary Gradient
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         // Primary color particle
//                         className="absolute w-1 h-1 rounded-full bg-indigo-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -100],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span 
//                       // Primary Gradient
//                       className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//                     >
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? // Primary Gradient
//                         'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-xl hover:shadow-indigo-600/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//               >Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Primary color for chevron icon */}
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-indigo-400' : 'text-blue-700'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border-indigo-600/20'
//               : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               // Primary glow
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(96, 165, 250, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               // Primary color particle
//               className="absolute w-2 h-2 rounded-full bg-indigo-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span 
//                 // Primary Gradient
//                 className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//               >Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               // Primary CTA Button Gradient with Pulsing Shadow
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-600/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(99, 102, 241, 0)",
//                   "0 0 40px rgba(99, 102, 241, 0.6)",
//                   "0 0 0px rgba(99, 102, 241, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             // Primary color subtle wave background
//             backgroundImage: 'linear-gradient(45deg, rgba(99, 102, 241, 0.3) 25%, transparent 25%, transparent 75%, rgba(99, 102, 241, 0.3) 75%, rgba(99, 102, 241, 0.3)), linear-gradient(45deg, rgba(99, 102, 241, 0.3) 25%, transparent 25%, transparent 75%, rgba(99, 102, 241, 0.3) 75%, rgba(99, 102, 241, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   // Primary Gradient
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span 
//                   // Primary Gradient
//                   className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
//                 >
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {/* Primary color hover for links */}
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>\
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;

////////////////////////////////////////// brighter version of first code snippet //////////////////////////////////////////
















///////////////////////////////////////// green sea ////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={darkMode ? "#2dd4bf" : "#14b8a6"} stopOpacity="0.15" />
//             <stop offset="50%" stopColor={darkMode ? "#22d3ee" : "#06b6d4"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#38bdf8" : "#0ea5e9"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke={darkMode ? "rgba(45, 212, 191, 0.1)" : "rgba(20, 184, 166, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(45, 212, 191, 0.6)' 
//                 : '0 0 10px rgba(20, 184, 166, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-teal-400/40' : 'border-teal-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-cyan-400' : 'bg-cyan-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(34, 211, 238, 0.8)' 
//               : '0 0 8px rgba(6, 182, 212, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-sky-400' : 'bg-sky-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(56, 189, 248, 0.8)' 
//               : '0 0 12px rgba(14, 165, 233, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-teal-400/5' : 'bg-teal-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-cyan-500/5' : 'bg-cyan-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-sky-500/5' : 'bg-sky-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-teal-400 to-cyan-500",
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-cyan-500 to-sky-600", // Changed from indigo-purple
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-sky-600 to-blue-500", // Changed from purple-pink
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-blue-500 to-indigo-500", // Changed from pink-rose
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-teal-400 to-cyan-500", // Changed from teal-indigo
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-teal-400 to-cyan-500"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-cyan-500 to-sky-600" // Changed from indigo-purple
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-sky-600 to-blue-500" // Changed from purple-pink
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-blue-500 to-indigo-500" // Changed from pink-rose
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-teal-500 to-cyan-600" // Changed from rose-orange
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-teal-400 to-cyan-500" // Changed from teal-indigo
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-teal-400' : 'bg-gray-100 text-gray-700 hover:text-teal-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       ? 'bg-teal-400/10 border-teal-400/20 text-teal-400' 
//                       : 'bg-teal-50 border-teal-200 text-teal-700'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 bg-clip-text text-transparent">
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-teal-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-500'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-teal-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold">
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-teal-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-teal-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-teal-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? 'border-teal-400 bg-teal-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-teal-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400' 
//                     : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Interactive Deck */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gray-100'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 bg-clip-text text-transparent">Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               // Calculate position based on index relative to selected
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 // Center card
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 // Cards on the left
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 // Cards on the right
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? darkMode 
//                           ? 'bg-gray-800/90 border-teal-400' 
//                           : 'bg-white border-teal-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-teal-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-center text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? 'bg-gradient-to-br from-teal-400/10 to-cyan-500/10 border-teal-400 shadow-xl shadow-teal-400/20'
//                       : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-400 shadow-xl shadow-teal-400/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400'
//                       : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full bg-teal-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:shadow-xl hover:shadow-teal-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gray-100'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-teal-400' : 'text-teal-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-teal-400/10 to-cyan-500/10 border-teal-400/20'
//               : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full bg-teal-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                   "0 0 40px rgba(45, 212, 191, 0.6)",
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             backgroundImage: 'linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3)), linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperBusinessApp;
/////////////////////////////////////// sea greeen ////////////////////////////////////////////////////






























































































///////////////////// cards in 5 piller  //////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award,
//   Mail, Phone, Building, MessageSquare, Send, CheckCircle2, AlertCircle
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400/20 to-indigo-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={darkMode ? "#2dd4bf" : "#14b8a6"} stopOpacity="0.15" />
//             <stop offset="50%" stopColor={darkMode ? "#6366f1" : "#4f46e5"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke={darkMode ? "rgba(45, 212, 191, 0.1)" : "rgba(20, 184, 166, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(45, 212, 191, 0.6)' 
//                 : '0 0 10px rgba(20, 184, 166, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-teal-400/40' : 'border-teal-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-indigo-400' : 'bg-indigo-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(99, 102, 241, 0.8)' 
//               : '0 0 8px rgba(79, 70, 229, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-purple-400' : 'bg-purple-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(139, 92, 246, 0.8)' 
//               : '0 0 12px rgba(124, 58, 237, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-teal-400/5' : 'bg-teal-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-indigo-500/5' : 'bg-indigo-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };


// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);


//   // api integration for contact form
//   const [showContactForm, setShowContactForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     subject: '',
//     message: '',
//     pillarInterest: '',
//     planInterest: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState('');

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim() || formData.name.length < 2) {
//       errors.name = 'Name must be at least 2 characters';
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim() || !emailRegex.test(formData.email)) {
//       errors.email = 'Please provide a valid email';
//     }
//     if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
//       errors.phone = 'Please provide a valid 10-digit phone number';
//     }
//     if (!formData.subject.trim() || formData.subject.length < 5) {
//       errors.subject = 'Subject must be at least 5 characters';
//     }
//     if (!formData.message.trim() || formData.message.length < 10) {
//       errors.message = 'Message must be at least 10 characters';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${API_URL}/api/contacts`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setSubmitStatus('success');
//         setSubmitMessage(data.message || 'Thank you! Your enquiry has been submitted successfully.');
//         setFormData({
//           name: '', email: '', phone: '', company: '',
//           subject: '', message: '', pillarInterest: '', planInterest: ''
//         });
//         setTimeout(() => {
//           setShowContactForm(false);
//           setSubmitStatus(null);
//         }, 3000);
//       } else {
//         setSubmitStatus('error');
//         setSubmitMessage(data.message || 'Something went wrong. Please try again.');
//         if (data.errors && Array.isArray(data.errors)) {
//           const fieldErrors = {};
//           data.errors.forEach(err => {
//             fieldErrors[err.field] = err.message;
//           });
//           setFormErrors(fieldErrors);
//         }
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setSubmitStatus('error');
//       setSubmitMessage('Network error. Please check your connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (darkMode) {
//   //     document.documentElement.classList.add('dark');
//   //   } else {
//   //     document.documentElement.classList.remove('dark');
//   //   }
//   // }, [darkMode]);

//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-teal-400 to-cyan-500",
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-indigo-500 to-purple-600",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-purple-600 to-pink-600",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-pink-600 to-rose-600",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-teal-400 to-indigo-500",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-teal-400 to-cyan-500"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-indigo-500 to-purple-600"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-purple-600 to-pink-600"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-pink-600 to-rose-600"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-rose-600 to-orange-600"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-teal-400 to-indigo-500"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-teal-400' : 'bg-gray-100 text-gray-700 hover:text-teal-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowContactForm(true)}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       ? 'bg-teal-400/10 border-teal-400/20 text-teal-400' 
//                       : 'bg-teal-50 border-teal-200 text-teal-700'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowContactForm(true)}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-teal-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-500'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-teal-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold">
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-teal-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-teal-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-teal-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? 'border-teal-400 bg-teal-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-teal-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400' 
//                     : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Carousel Animation */}
//       {/* Five Pillars Section - AI Fiesta Style Scroll Cards */}
// <section id="pillars" className="relative py-20">
//   {/* Section Header - Fixed at top */}
//   <div className="max-w-7xl mx-auto px-4 text-center mb-20">
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8 }}
//     >
//       <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//         darkMode ? 'text-gray-100' : 'text-gray-900'
//       }`}>
//         Five Powerful{' '}
//         <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//           Pillars
//         </span>
//       </h2>
//       <p className={`text-xl max-w-3xl mx-auto ${
//         darkMode ? 'text-gray-400' : 'text-gray-600'
//       }`}>
//         Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//       </p>
//     </motion.div>
//   </div>

//   {/* Scrollable Cards Container */}
//   <div className="max-w-6xl mx-auto px-4">
//     <div className="relative" style={{ minHeight: `${pillars.length * 120}vh` }}>
//       {pillars.map((pillar, index) => (
//         <motion.div
//           key={index}
//           className="sticky mb-8"
//           style={{
//             top: `${80 + index * 40}px`,
//             zIndex: pillars.length - index
//           }}
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ 
//             opacity: 1, 
//             y: 0,
//           }}
//           viewport={{ 
//             once: false,
//             amount: 0.3,
//           }}
//           transition={{
//             duration: 0.6,
//             ease: [0.25, 0.1, 0.25, 1]
//           }}
//         >
//           <div 
//             className={`rounded-3xl backdrop-blur-xl border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
//               darkMode 
//                 ? 'bg-gray-800/95 border-gray-700' 
//                 : 'bg-white/95 border-gray-200'
//             }`}
//             style={{
//               boxShadow: darkMode 
//                 ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
//                 : '0 20px 60px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
//               {/* Left Side - Content */}
//               <div className="flex flex-col justify-center">
//                 {/* Card Number Badge */}
//                 <motion.div
//                   className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} mb-6`}
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 >
//                   <span className="text-white font-bold text-lg">{index + 1}</span>
//                 </motion.div>

//                 {/* AI Model Icon */}
//                 <div className="mb-6">
//                   <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${pillar.color}`}>
//                     <pillar.icon className="w-8 h-8 text-white" />
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {pillar.title}
//                 </h3>

//                 {/* Description */}
//                 <p className={`text-lg mb-6 ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>
//                   {pillar.description}
//                 </p>

//                 {/* Features List */}
//                 <div className="space-y-3">
//                   {pillar.features.map((feature, fidx) => (
//                     <motion.div
//                       key={fidx}
//                       className="flex items-center gap-3"
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
//                         <Check className="w-3.5 h-3.5 text-white" />
//                       </div>
//                       <span className={`text-sm font-medium ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}>
//                         {feature}
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Side - Visual/Video Placeholder */}
//               <div className="flex items-center justify-center">
//                 <motion.div 
//                   className={`w-full h-[400px] rounded-2xl overflow-hidden border-2 ${
//                     darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* Animated Background Gradient */}
//                   <motion.div
//                     className={`w-full h-full bg-gradient-to-br ${pillar.color} opacity-20 relative overflow-hidden`}
//                     animate={{
//                       background: [
//                         `linear-gradient(to bottom right, ${pillar.color})`,
//                         `linear-gradient(to top left, ${pillar.color})`,
//                         `linear-gradient(to bottom right, ${pillar.color})`
//                       ]
//                     }}
//                     transition={{ duration: 5, repeat: Infinity }}
//                   >
//                     {/* Animated Icon in Center */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <motion.div
//                         animate={{ 
//                           scale: [1, 1.2, 1],
//                           rotate: [0, 180, 360]
//                         }}
//                         transition={{ 
//                           duration: 10, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                       >
//                         <pillar.icon className={`w-32 h-32 ${
//                           darkMode ? 'text-gray-700' : 'text-gray-300'
//                         }`} />
//                       </motion.div>
//                     </div>

//                     {/* Floating Particles */}
//                     {Array.from({ length: 20 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${pillar.color}`}
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -100, 0],
//                           opacity: [0, 1, 0],
//                           scale: [0, 1.5, 0]
//                         }}
//                         transition={{
//                           duration: 3 + Math.random() * 2,
//                           repeat: Infinity,
//                           delay: Math.random() * 2,
//                         }}
//                       />
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Bottom Glow Effect */}
//             <motion.div
//               className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.color}`}
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </div>

//   {/* Scroll Indicator */}
//   <motion.div
//     className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     whileInView={{ opacity: 0 }}
//     viewport={{ amount: 0.8 }}
//     transition={{ delay: 1 }}
//   >
//     <motion.div
//       className={`px-6 py-3 rounded-full backdrop-blur-xl border ${
//         darkMode 
//           ? 'bg-gray-800/80 border-teal-400/50 text-gray-300' 
//           : 'bg-white/80 border-teal-400/50 text-gray-600'
//       }`}
//       animate={{ y: [0, 10, 0] }}
//       transition={{ duration: 2, repeat: Infinity }}
//     >
//       <span className="text-sm font-medium">↓ Scroll to explore pillars</span>
//     </motion.div>
//   </motion.div>
// </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400 shadow-xl shadow-teal-400/20'
//                       : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-400 shadow-xl shadow-teal-400/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400'
//                       : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full bg-teal-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-white hover:shadow-xl hover:shadow-teal-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowContactForm(true)}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-teal-400' : 'text-teal-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400/20'
//               : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full bg-teal-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                   "0 0 40px rgba(45, 212, 191, 0.6)",
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//               onClick={() => setShowContactForm(true)}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             backgroundImage: 'linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3)), linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>
     
//      {showContactForm && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowContactForm(false)}>
//           <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} onClick={(e) => e.stopPropagation()}>
//             <motion.button onClick={() => !isSubmitting && setShowContactForm(false)} className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} disabled={isSubmitting}>
//               <X className="w-6 h-6" />
//             </motion.button>

//             <div className="relative p-8 md:p-12">
//               <div className="text-center mb-8">
//                 <motion.div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 mb-4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
//                   <Mail className="w-10 h-10 text-white" />
//                 </motion.div>
//                 <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                   Get in <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Touch</span>
//                 </h2>
//                 <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tell us about your business needs and we'll get back to you within 24 hours</p>
//               </div>

//               {submitStatus && (
//                 <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${submitStatus === 'success' ? darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200' : darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
//                   {submitStatus === 'success' ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />}
//                   <div className="flex-1">
//                     <p className={`font-semibold ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{submitStatus === 'success' ? 'Success!' : 'Error'}</p>
//                     <p className={`text-sm ${submitStatus === 'success' ? darkMode ? 'text-green-400' : 'text-green-700' : darkMode ? 'text-red-400' : 'text-red-700'}`}>{submitMessage}</p>
//                   </div>
//                 </motion.div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Users className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
//                     <div className="relative">
//                       <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="1234567890" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Phone className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
//                     <div className="relative">
//                       <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your Company Inc." disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Building className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pillar of Interest</label>
//                     <select name="pillarInterest" value={formData.pillarInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
//                       <option value="">Select a pillar</option>
//                       <option value="Lead Hub">Lead Hub</option>
//                       <option value="Networking Hub">Networking Hub</option>
//                       <option value="Business Suite">Business Suite</option>
//                       <option value="Investor Connect">Investor Connect</option>
//                       <option value="AI Growth">AI Growth</option>
//                       <option value="All Pillars">All Pillars</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plan of Interest</label>
//                     <select name="planInterest" value={formData.planInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
//                       <option value="">Select a plan</option>
//                       <option value="Starter">Starter</option>
//                       <option value="Professional">Professional</option>
//                       <option value="Enterprise">Enterprise</option>
//                       <option value="Not Sure">Not Sure</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject <span className="text-red-500">*</span></label>
//                   <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="How can we help you?" disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${formErrors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                   {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message <span className="text-red-500">*</span></label>
//                   <div className="relative">
//                     <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us more about your requirements..." rows="5" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                     <MessageSquare className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
//                 </div>

//                 <motion.button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-teal-400 to-indigo-500 hover:shadow-xl hover:shadow-teal-400/50'} text-white`} whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
//                   {isSubmitting ? (
//                     <>
//                       <motion.div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5" />
//                       Send Message
//                     </>
//                   )}
//                 </motion.button>

//                 <p className={`text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>We'll respond within 24 hours. Your information is secure and confidential.</p>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SuperBusinessApp;








/////// enquire form add chessa + enquire form popup //////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// import { 
//   Search, Users, Briefcase, TrendingUp, Brain, 
//   Menu, X, Sun, Moon, Check, ArrowRight, Zap,
//   Target, Network, Rocket, Sparkles, ChevronDown,
//   Clock, Shield, DollarSign, Globe, Lightbulb, Award,
//   Mail, Phone, Building, MessageSquare, Send, CheckCircle2, AlertCircle
// } from 'lucide-react';

// // Mouse Follower Component
// const MouseFollower = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 200 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e) => {
//       cursorX.set(e.clientX - 200);
//       cursorY.set(e.clientY - 200);
//     };
//     window.addEventListener('mousemove', moveCursor);
//     return () => window.removeEventListener('mousemove', moveCursor);
//   }, []);

//   return (
//     <motion.div
//       className="pointer-events-none fixed z-30 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400/20 to-indigo-500/20 blur-3xl"
//       style={{ left: cursorXSpring, top: cursorYSpring }}
//     />
//   );
// };

// // Animated Network Background Component
// const AnimatedBackground = ({ darkMode }) => {
//   // Create more network nodes for denser network
//   const nodes = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 3 + 3,
//     duration: Math.random() * 30 + 20,
//     delay: Math.random() * 5
//   }));

//   // Create connections between nearby nodes - more connections
//   const connections = [];
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const distance = Math.sqrt(
//         Math.pow(nodes[i].x - nodes[j].x, 2) + 
//         Math.pow(nodes[i].y - nodes[j].y, 2)
//       );
//       // Increased connection distance for more visible network
//       if (distance < 30) {
//         connections.push({
//           from: nodes[i],
//           to: nodes[j],
//           id: `${i}-${j}`,
//           distance: distance
//         });
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden">
//       {/* Static Network Lines */}
//       <svg className="absolute inset-0 w-full h-full">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={darkMode ? "#2dd4bf" : "#14b8a6"} stopOpacity="0.15" />
//             <stop offset="50%" stopColor={darkMode ? "#6366f1" : "#4f46e5"} stopOpacity="0.25" />
//             <stop offset="100%" stopColor={darkMode ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.15" />
//           </linearGradient>
//         </defs>
//         {/* Static lines always visible */}
//         {connections.map((conn) => (
//           <line
//             key={`static-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke={darkMode ? "rgba(45, 212, 191, 0.1)" : "rgba(20, 184, 166, 0.15)"}
//             strokeWidth="1"
//           />
//         ))}
//         {/* Animated pulsing lines */}
//         {connections.map((conn, idx) => (
//           <motion.line
//             key={`pulse-${conn.id}`}
//             x1={`${conn.from.x}%`}
//             y1={`${conn.from.y}%`}
//             x2={`${conn.to.x}%`}
//             y2={`${conn.to.y}%`}
//             stroke="url(#lineGradient)"
//             strokeWidth="2"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ 
//               pathLength: [0, 1, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: idx * 0.15,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </svg>

//       {/* Animated Network Nodes */}
//       {nodes.map(node => (
//         <motion.div
//           key={`node-${node.id}`}
//           className="absolute"
//           style={{
//             left: `${node.x}%`,
//             top: `${node.y}%`,
//           }}
//           animate={{
//             x: [0, Math.random() * 30 - 15, 0],
//             y: [0, Math.random() * 30 - 15, 0],
//           }}
//           transition={{
//             duration: node.duration,
//             repeat: Infinity,
//             delay: node.delay,
//             ease: "easeInOut"
//           }}
//         >
//           {/* Node Core */}
//           <motion.div
//             className={`rounded-full shadow-lg ${darkMode ? 'bg-teal-400' : 'bg-teal-600'}`}
//             style={{
//               width: `${node.size}px`,
//               height: `${node.size}px`,
//               boxShadow: darkMode 
//                 ? '0 0 10px rgba(45, 212, 191, 0.6)' 
//                 : '0 0 10px rgba(20, 184, 166, 0.6)'
//             }}
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 1, 0.6],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//           {/* Node Outer Ring */}
//           <motion.div
//             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
//               darkMode ? 'border-teal-400/40' : 'border-teal-600/40'
//             }`}
//             style={{
//               width: `${node.size * 2.5}px`,
//               height: `${node.size * 2.5}px`,
//             }}
//             animate={{
//               scale: [1, 1.8, 1],
//               opacity: [0.8, 0, 0.8],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: node.delay,
//             }}
//           />
//         </motion.div>
//       ))}

//       {/* Data Packets Moving Through Network */}
//       {connections.slice(0, 15).map((conn, idx) => (
//         <motion.div
//           key={`packet-${conn.id}`}
//           className={`absolute w-2 h-2 rounded-full shadow-lg ${
//             darkMode ? 'bg-indigo-400' : 'bg-indigo-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 8px rgba(99, 102, 241, 0.8)' 
//               : '0 0 8px rgba(79, 70, 229, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
//             opacity: [0, 1, 1, 0],
//             scale: [0.5, 1.2, 0.5]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: idx * 0.5,
//             ease: "linear"
//           }}
//         />
//       ))}

//       {/* Larger Data Bursts */}
//       {connections.slice(15, 20).map((conn, idx) => (
//         <motion.div
//           key={`burst-${conn.id}`}
//           className={`absolute w-3 h-3 rounded-full ${
//             darkMode ? 'bg-purple-400' : 'bg-purple-600'
//           }`}
//           style={{
//             boxShadow: darkMode 
//               ? '0 0 12px rgba(139, 92, 246, 0.8)' 
//               : '0 0 12px rgba(124, 58, 237, 0.8)'
//           }}
//           animate={{
//             left: [`${conn.from.x}%`, `${conn.to.x}%`],
//             top: [`${conn.from.y}%`, `${conn.to.y}%`],
//             opacity: [0, 1, 0],
//             scale: [0.5, 1.5, 0.5]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: idx * 0.8,
//             ease: "easeOut"
//           }}
//         />
//       ))}

//       {/* Large Gradient Blobs for depth */}
//       <motion.div
//         className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-teal-400/5' : 'bg-teal-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-indigo-500/5' : 'bg-indigo-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.3, 1],
//           x: [0, -50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${
//           darkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
//         }`}
//         animate={{
//           scale: [1, 1.4, 1],
//           x: [-30, 30, -30],
//           y: [-20, 20, -20],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// };
// const SuperBusinessApp = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [hoveredPillar, setHoveredPillar] = useState(null);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);


//   // api integration for contact form
//   const [showContactForm, setShowContactForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     subject: '',
//     message: '',
//     pillarInterest: '',
//     planInterest: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [submitMessage, setSubmitMessage] = useState('');

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   // ADD THIS NEW useEffect HERE 👇
//   useEffect(() => {
//     // Auto-open contact form on first visit
//     const timer = setTimeout(() => {
//       const hasSubmitted = localStorage.getItem('bgt_contact_submitted');
//       const hasSeenPopup = sessionStorage.getItem('bgt_popup_shown');
      
//       // Show popup only if user hasn't submitted before AND hasn't seen it in this session
//       if (!hasSubmitted && !hasSeenPopup) {
//         setShowContactForm(true);
//         sessionStorage.setItem('bgt_popup_shown', 'true');
//       }
//     }, 2000); // Opens after 3 seconds

//     return () => clearTimeout(timer);
//   }, []); // Empty dependency array - runs only once on mount

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim() || formData.name.length < 2) {
//       errors.name = 'Name must be at least 2 characters';
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim() || !emailRegex.test(formData.email)) {
//       errors.email = 'Please provide a valid email';
//     }
//     if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
//       errors.phone = 'Please provide a valid 10-digit phone number';
//     }
//     if (!formData.subject.trim() || formData.subject.length < 5) {
//       errors.subject = 'Subject must be at least 5 characters';
//     }
//     if (!formData.message.trim() || formData.message.length < 10) {
//       errors.message = 'Message must be at least 10 characters';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${API_URL}/api/contacts`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setSubmitStatus('success');
//         setSubmitMessage(data.message || 'Thank you! Your enquiry has been submitted successfully.');

//         // ADD THESE TWO LINES 👇
//         localStorage.setItem('bgt_contact_submitted', 'true'); // ✅ Prevents auto-popup in future
//         sessionStorage.setItem('bgt_popup_shown', 'true'); // ✅ Prevents popup in same session
        
//         setFormData({
//           name: '', email: '', phone: '', company: '',
//           subject: '', message: '', pillarInterest: '', planInterest: ''
//         });
//         setTimeout(() => {
//           setShowContactForm(false);
//           setSubmitStatus(null);
//         }, 3000);
//       } else {
//         setSubmitStatus('error');
//         setSubmitMessage(data.message || 'Something went wrong. Please try again.');
//         if (data.errors && Array.isArray(data.errors)) {
//           const fieldErrors = {};
//           data.errors.forEach(err => {
//             fieldErrors[err.field] = err.message;
//           });
//           setFormErrors(fieldErrors);
//         }
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setSubmitStatus('error');
//       setSubmitMessage('Network error. Please check your connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (darkMode) {
//   //     document.documentElement.classList.add('dark');
//   //   } else {
//   //     document.documentElement.classList.remove('dark');
//   //   }
//   // }, [darkMode]);

//   const pillars = [
//     {
//       icon: Search,
//       title: "Lead Hub",
//       description: "B2B & B2C lead generation platform connecting buyers and sellers instantly",
//       color: "from-teal-400 to-cyan-500",
//       features: ["10M+ Businesses", "Real-time Leads", "Smart Matching"]
//     },
//     {
//       icon: Users,
//       title: "Networking Hub",
//       description: "Professional networking ecosystem for entrepreneurs and business leaders",
//       color: "from-indigo-500 to-purple-600",
//       features: ["Global Network", "Events & Meetups", "Referral System"]
//     },
//     {
//       icon: Briefcase,
//       title: "Business Suite",
//       description: "Complete CRM and project management tools for business operations",
//       color: "from-purple-600 to-pink-600",
//       features: ["CRM & Sales", "Project Manager", "Team Collaboration"]
//     },
//     {
//       icon: TrendingUp,
//       title: "Investor Connect",
//       description: "Bridge between startups and investors for funding opportunities",
//       color: "from-pink-600 to-rose-600",
//       features: ["Pitch Deck Builder", "Investor Database", "Funding Tracker"]
//     },
//     {
//       icon: Brain,
//       title: "AI Growth",
//       description: "AI-powered business assistant for strategy, insights, and automation",
//       color: "from-teal-400 to-indigo-500",
//       features: ["Smart Analytics", "Auto Marketing", "24/7 AI Assistant"]
//     }
//   ];

//   const advantages = [
//     {
//       icon: Clock,
//       title: "Save 20+ Hours Weekly",
//       description: "Automate repetitive tasks and streamline your workflow",
//       color: "from-teal-400 to-cyan-500"
//     },
//     {
//       icon: DollarSign,
//       title: "Reduce Costs by 60%",
//       description: "One subscription replaces multiple expensive tools",
//       color: "from-indigo-500 to-purple-600"
//     },
//     {
//       icon: Shield,
//       title: "Enterprise-Grade Security",
//       description: "Bank-level encryption and compliance standards",
//       color: "from-purple-600 to-pink-600"
//     },
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description: "Connect with businesses across 150+ countries",
//       color: "from-pink-600 to-rose-600"
//     },
//     {
//       icon: Lightbulb,
//       title: "AI-Powered Insights",
//       description: "Get actionable recommendations in real-time",
//       color: "from-rose-600 to-orange-600"
//     },
//     {
//       icon: Award,
//       title: "Proven Success",
//       description: "Join 50,000+ businesses growing faster",
//       color: "from-teal-400 to-indigo-500"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How is BGT different from using separate tools?",
//       answer: "BGT unifies five powerful platforms into one seamless ecosystem. Instead of managing separate subscriptions, logins, and data across multiple tools, everything is integrated and works together automatically. This means better data insights, faster workflows, and significant cost savings."
//     },
//     {
//       question: "Can I integrate my existing tools?",
//       answer: "Yes! BGT offers API access and pre-built integrations with popular tools. Our Professional and Enterprise plans include custom integration support to ensure a smooth transition from your current setup."
//     },
//     {
//       question: "What kind of support do you offer?",
//       answer: "All plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive a dedicated account manager and 24/7 phone support."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-level encryption, comply with GDPR and SOC 2 standards, and conduct regular security audits. Your data is stored in secure, redundant data centers with automatic backups."
//     },
//     {
//       question: "Can I switch plans later?",
//       answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you offer a free trial?",
//       answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start."
//     }
//   ];

//   const plans = [
//     {
//       name: "Starter",
//       price: "₹999",
//       period: "/month",
//       features: [
//         "Access to Lead Hub",
//         "Basic Networking Features",
//         "5 AI Queries/day",
//         "Email Support",
//         "1 User Account"
//       ],
//       popular: false
//     },
//     {
//       name: "Professional",
//       price: "₹2,999",
//       period: "/month",
//       features: [
//         "All 5 Pillars Access",
//         "Unlimited Networking",
//         "100 AI Queries/day",
//         "Priority Support",
//         "5 Team Members",
//         "Advanced Analytics",
//         "Custom Branding"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "₹9,999",
//       period: "/month",
//       features: [
//         "Everything in Professional",
//         "Unlimited AI Queries",
//         "Dedicated Account Manager",
//         "Unlimited Team Members",
//         "API Access",
//         "White Label Solution",
//         "Custom Integrations"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'
//     } relative`}>
//       <AnimatedBackground darkMode={darkMode} />
//       <MouseFollower />
      
//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${
//         darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div 
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div 
//                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Zap className="w-6 h-6 text-white" />
//               </motion.div>
//               <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                 BGT
//               </span>
//             </motion.div>

//             <div className="hidden md:flex items-center space-x-8">
//               {['Features', 'Pillars', 'Pricing', 'FAQs'].map((item, idx) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className={`${
//                     darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'
//                   } transition-colors`}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//               <motion.button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`p-2 rounded-lg ${
//                   darkMode ? 'bg-gray-800 text-gray-300 hover:text-teal-400' : 'bg-gray-100 text-gray-700 hover:text-teal-600'
//                 } transition-colors`}
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>
//               <motion.button 
//                 className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-400/50 transition-all"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowContactForm(true)}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? (
//                 <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               ) : (
//                 <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section with Laptop Mockup */}
//       <motion.section 
//         style={{ opacity, scale }}
//         className="relative pt-32 pb-20 px-4 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <div className="text-left space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.span 
//                   className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
//                     darkMode 
//                       ? 'bg-teal-400/10 border-teal-400/20 text-teal-400' 
//                       : 'bg-teal-50 border-teal-200 text-teal-700'
//                   }`}
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   5 Platforms. 1 Super App. Infinite Growth.
//                 </motion.span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className={`text-5xl md:text-7xl font-bold leading-tight ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}
//               >
//                 All Your Business Power
//                 <br />
//                 <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//                   In One Unified App
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className={`text-xl ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}
//               >
//                 Stop juggling multiple platforms. Get lead generation, networking, CRM, investor connections, and AI-powered growth tools—all unified in one powerful ecosystem.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <motion.button 
//                   className="group px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all flex items-center justify-center"
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowContactForm(true)}
//                 >
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button 
//                   className={`px-8 py-4 rounded-xl backdrop-blur-sm font-bold text-lg border transition-all ${
//                     darkMode 
//                       ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-teal-400' 
//                       : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-500'
//                   }`}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               {/* Floating Icons */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-4 pt-4"
//               >
//                 {pillars.slice(0, 5).map((pillar, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: [0, -10, 0],
//                     }}
//                     transition={{ 
//                       delay: 0.8 + idx * 0.1,
//                       y: {
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                         duration: 2 + idx * 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.2, rotate: 360 }}
//                   >
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right Side - Laptop Mockup with Scrolling Website */}
//             <motion.div
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//               className="relative"
//             >
//               {/* Laptop Frame */}
//               <div className="relative">
//                 {/* Laptop Screen */}
//                 <div className={`relative rounded-t-2xl border-8 overflow-hidden ${
//                   darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-white'
//                 }`} style={{ paddingTop: '62.5%' }}>
//                   {/* Screen Content - Scrolling Website */}
//                   <div className="absolute inset-0 p-2">
//                     <motion.div
//                       className={`w-full h-full rounded-lg overflow-hidden ${
//                         darkMode ? 'bg-gray-950' : 'bg-white'
//                       }`}
//                       style={{ 
//                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
//                       }}
//                     >
//                       {/* Mini Website Content */}
//                       <motion.div
//                         animate={{ y: [0, -2000, 0] }}
//                         transition={{ 
//                           duration: 20, 
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                         className="space-y-6 p-6"
//                       >
//                         {/* Mini Navbar */}
//                         <div className={`flex justify-between items-center p-3 rounded-lg ${
//                           darkMode ? 'bg-gray-800/80' : 'bg-gray-100'
//                         }`}>
//                           <div className="flex items-center gap-2">
//                             <Zap className="w-5 h-5 text-teal-400" />
//                             <span className={`text-xs font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>BGT</span>
//                           </div>
//                           <div className="flex gap-3 text-xs">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Features</span>
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Pricing</span>
//                           </div>
//                         </div>

//                         {/* Mini Hero */}
//                         <div className="text-center space-y-3 py-6">
//                           <h1 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             All Your Business
//                           </h1>
//                           <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                             In One Unified App
//                           </p>
//                           <p className={`text-xs px-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                             5 Platforms. 1 Super App. Infinite Growth.
//                           </p>
//                           <div className="flex gap-2 justify-center pt-3">
//                             <div className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold">
//                               Start Free
//                             </div>
//                             <div className={`px-4 py-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'}`}>
//                               Demo
//                             </div>
//                           </div>
//                         </div>

//                         {/* Five Pillars Section */}
//                         <div className="space-y-3">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Five Powerful <span className="text-teal-400">Pillars</span>
//                           </h2>
//                           <div className="grid grid-cols-1 gap-3">
//                             {pillars.map((pillar, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
//                                 animate={{ 
//                                   scale: [1, 1.02, 1],
//                                 }}
//                                 transition={{ 
//                                   duration: 2,
//                                   delay: i * 0.3,
//                                   repeat: Infinity
//                                 }}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0`}>
//                                     <pillar.icon className="w-5 h-5 text-white" />
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h3 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                       {pillar.title}
//                                     </h3>
//                                     <p className={`text-xs leading-tight ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                       {pillar.description}
//                                     </p>
//                                     <div className="flex flex-wrap gap-1 mt-2">
//                                       {pillar.features.map((feature, idx) => (
//                                         <span key={idx} className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
//                                           {feature}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Advantages Section */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Why Choose <span className="text-teal-400">BGT</span>
//                           </h2>
//                           <div className="grid grid-cols-2 gap-2">
//                             {advantages.slice(0, 4).map((adv, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}
//                               >
//                                 <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${adv.color} flex items-center justify-center mb-2`}>
//                                   <adv.icon className="w-4 h-4 text-white" />
//                                 </div>
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {adv.title}
//                                 </h4>
//                                 <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//                                   {adv.description}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Pricing Cards */}
//                         <div className="space-y-3 mt-8">
//                           <h2 className={`text-sm font-bold text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                             Simple <span className="text-teal-400">Pricing</span>
//                           </h2>
//                           <div className="grid grid-cols-3 gap-2">
//                             {plans.map((plan, i) => (
//                               <div
//                                 key={i}
//                                 className={`p-3 rounded-xl border ${
//                                   plan.popular
//                                     ? 'border-teal-400 bg-teal-400/10' 
//                                     : darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
//                                 }`}
//                               >
//                                 <h4 className={`text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                                   {plan.name}
//                                 </h4>
//                                 <div className="text-sm font-bold text-teal-400 mb-2">{plan.price}</div>
//                                 <div className="space-y-1">
//                                   {plan.features.slice(0, 3).map((feature, idx) => (
//                                     <div key={idx} className={`text-xs flex items-start gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                                       <Check className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
//                                       <span className="leading-tight">{feature}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Mini Footer */}
//                         <div className={`text-center text-xs mt-8 py-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
//                           © 2025 BGT. All rights reserved.
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   </div>
                  
//                   {/* Screen Glare Effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                     animate={{
//                       opacity: [0.1, 0.3, 0.1]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </div>

//                 {/* Laptop Base */}
//                 <div className={`h-4 rounded-b-2xl border-x-8 border-b-8 ${
//                   darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
//                 }`}></div>

//                 {/* Laptop Bottom */}
//                 <div className={`h-2 rounded-b-3xl mx-auto ${
//                   darkMode ? 'bg-gray-800' : 'bg-gray-300'
//                 }`} style={{ width: '80%' }}></div>

//                 {/* Glow Effect */}
//                 <motion.div
//                   className="absolute inset-0 -z-10 blur-3xl"
//                   animate={{
//                     background: [
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
//                       'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 70%)',
//                     ]
//                   }}
//                   transition={{ duration: 5, repeat: Infinity }}
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//       {/* Advantages Section with 3D Floating Cards */}
//       <section id="features" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Why Businesses <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Love BGT</span>
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Discover the powerful advantages that set us apart from traditional business tools
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {advantages.map((advantage, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: -90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.1 }}
//                 whileHover={{ 
//                   rotateY: 10,
//                   rotateX: 10,
//                   scale: 1.05,
//                   transition: { duration: 0.3 }
//                 }}
//                 className={`p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer perspective-1000 ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400' 
//                     : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <motion.div 
//                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <advantage.icon className="w-8 h-8 text-white" />
//                 </motion.div>
//                 <h3 className={`text-2xl font-bold mb-4 ${
//                   darkMode ? 'text-gray-100' : 'text-gray-900'
//                 }`}>
//                   {advantage.title}
//                 </h3>
//                 <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
//                   {advantage.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Five Pillars Section with Carousel Animation */}
//       <section id="pillars" className={`py-32 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-transparent to-gray-900/50' : 'bg-gradient-to-b from-white to-gray-50'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Five Powerful <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Pillars</span>
//               </h2>
//             </motion.div>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Each pillar is a complete platform. Together, they create an unstoppable business ecosystem.
//             </p>
//           </motion.div>

//           {/* Interactive Card Deck */}
//           <div className="relative h-[650px] flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 4 : (hoveredPillar - 1 + pillars.length) % pillars.length)}
//               className={`absolute left-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: -5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             <motion.button
//               onClick={() => setHoveredPillar(hoveredPillar === null ? 0 : (hoveredPillar + 1) % pillars.length)}
//               className={`absolute right-4 z-30 w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all ${
//                 darkMode 
//                   ? 'bg-gray-800/80 border-teal-400/50 hover:border-teal-400' 
//                   : 'bg-white/80 border-teal-400/50 hover:border-teal-400'
//               }`}
//               whileHover={{ scale: 1.1, x: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <ChevronDown className={`w-6 h-6 -rotate-90 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
//             </motion.button>

//             {/* Cards Stack */}
//             {pillars.map((pillar, idx) => {
//               const selectedIndex = hoveredPillar !== null ? hoveredPillar : 2;
//               const diff = idx - selectedIndex;
//               const absDiff = Math.abs(diff);
              
//               // Calculate position based on index relative to selected
//               let x = 0;
//               let y = 0;
//               let scale = 1;
//               let zIndex = 5;
//               let opacity = 1;
//               let rotateY = 0;

//               if (idx === selectedIndex) {
//                 // Center card
//                 x = 0;
//                 y = 0;
//                 scale = 1.1;
//                 zIndex = 20;
//                 opacity = 1;
//                 rotateY = 0;
//               } else if (diff < 0) {
//                 // Cards on the left
//                 x = -150 * absDiff - 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = -30;
//               } else {
//                 // Cards on the right
//                 x = 150 * absDiff + 100;
//                 y = 20 * absDiff;
//                 scale = 1 - (absDiff * 0.15);
//                 zIndex = 5 - absDiff;
//                 opacity = 0.6 - (absDiff * 0.2);
//                 rotateY = 30;
//               }
              
//               return (
//                 <motion.div
//                   key={idx}
//                   className="absolute cursor-pointer"
//                   style={{
//                     zIndex,
//                     perspective: '1000px'
//                   }}
//                   animate={{
//                     x,
//                     y,
//                     scale,
//                     opacity,
//                     rotateY,
//                   }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 30 
//                   }}
//                   onClick={() => setHoveredPillar(idx)}
//                   whileHover={idx !== selectedIndex ? { scale: scale * 1.05, y: y - 10 } : {}}
//                 >
//                   <motion.div
//                     className={`w-[450px] p-10 rounded-3xl backdrop-blur-xl border-2 shadow-2xl transition-all ${
//                       idx === selectedIndex
//                         ? darkMode 
//                           ? 'bg-gray-800/90 border-teal-400' 
//                           : 'bg-white border-teal-400'
//                         : darkMode
//                           ? 'bg-gray-800/60 border-gray-700'
//                           : 'bg-white/80 border-gray-300'
//                     }`}
//                     style={{
//                       transformStyle: 'preserve-3d'
//                     }}
//                   >
//                     {/* Active Card Effects */}
//                     {idx === selectedIndex && (
//                       <>
//                         {/* Animated Border Particles */}
//                         {Array.from({ length: 20 }).map((_, i) => (
//                           <motion.div
//                             key={i}
//                             className="absolute w-2 h-2 rounded-full bg-teal-400"
//                             style={{
//                               left: `${(i / 20) * 100}%`,
//                               top: i % 2 === 0 ? 0 : '100%',
//                             }}
//                             animate={{
//                               scale: [0, 1.5, 0],
//                               opacity: [0, 1, 0],
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               delay: i * 0.1,
//                             }}
//                           />
//                         ))}

//                         {/* Glowing Background */}
//                         <motion.div
//                           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} blur-2xl -z-10`}
//                           animate={{
//                             scale: [1, 1.2, 1],
//                             opacity: [0.2, 0.4, 0.2],
//                           }}
//                           transition={{ duration: 3, repeat: Infinity }}
//                         />

//                         {/* Floating Particles */}
//                         {Array.from({ length: 8 }).map((_, i) => (
//                           <motion.div
//                             key={`particle-${i}`}
//                             className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                             style={{
//                               left: `${Math.random() * 100}%`,
//                               top: `${Math.random() * 100}%`,
//                             }}
//                             animate={{
//                               y: [0, -50, 0],
//                               x: [0, Math.random() * 30 - 15, 0],
//                               opacity: [0, 1, 0],
//                               scale: [0, 2, 0],
//                             }}
//                             transition={{
//                               duration: 3,
//                               repeat: Infinity,
//                               delay: i * 0.4,
//                             }}
//                           />
//                         ))}
//                       </>
//                     )}

//                     {/* Card Number Badge */}
//                     <motion.div
//                       className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
//                       animate={idx === selectedIndex ? { 
//                         scale: [1, 1.2, 1],
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ 
//                         scale: { duration: 2, repeat: Infinity },
//                         rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//                       }}
//                     >
//                       {idx + 1}
//                     </motion.div>

//                     {/* Icon */}
//                     <motion.div 
//                       className={`${idx === selectedIndex ? 'w-24 h-24' : 'w-20 h-20'} mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
//                       animate={idx === selectedIndex ? { 
//                         rotate: [0, 360]
//                       } : {}}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                     >
//                       {idx === selectedIndex && (
//                         <motion.div
//                           className="absolute inset-0 border-4 border-white/30 rounded-2xl"
//                           animate={{
//                             scale: [1, 1.3, 1],
//                             opacity: [0.5, 0, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                       <pillar.icon className={`${idx === selectedIndex ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
//                     </motion.div>
                    
//                     <h3 className={`${idx === selectedIndex ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-center ${
//                       darkMode ? 'text-gray-100' : 'text-gray-900'
//                     }`}>
//                       {pillar.title}
//                     </h3>
                    
//                     <p className={`mb-6 text-center ${idx === selectedIndex ? 'text-base' : 'text-sm'} ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {pillar.description}
//                     </p>
                    
//                     {/* Features - Only show for selected card */}
//                     {idx === selectedIndex && (
//                       <div className="space-y-3">
//                         {pillar.features.map((feature, fidx) => (
//                           <motion.div 
//                             key={fidx} 
//                             className={`flex items-center text-sm ${
//                               darkMode ? 'text-gray-300' : 'text-gray-700'
//                             }`}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: fidx * 0.1 }}
//                           >
//                             <motion.div 
//                               className={`w-7 h-7 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center mr-3 flex-shrink-0`}
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 3, repeat: Infinity, delay: fidx * 0.2 }}
//                             >
//                               <Check className="w-3 h-3 text-white" />
//                             </motion.div>
//                             <span className="font-medium">{feature}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}

//             {/* Center Glow Effect */}
//             <motion.div
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//               animate={{
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Infinity }}
//             >
//               <div className={`w-96 h-96 rounded-full bg-gradient-to-r ${pillars[hoveredPillar !== null ? hoveredPillar : 2].color} blur-3xl opacity-20`} />
//             </motion.div>
//           </div>

//           {/* Navigation Dots */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1 }}
//             className="text-center mt-12"
//           >
//             <motion.p
//               className={`text-lg font-medium mb-6 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               ✨ Click any card or use arrows to explore
//             </motion.p>
//             <div className="flex justify-center gap-4">
//               {pillars.map((pillar, idx) => (
//                 <motion.button
//                   key={idx}
//                   onClick={() => setHoveredPillar(idx)}
//                   className={`group flex flex-col items-center gap-2 ${
//                     (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '' : 'opacity-50 hover:opacity-100'
//                   } transition-opacity`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
//                     <pillar.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <motion.div
//                     className={`h-1 rounded-full bg-gradient-to-r ${pillar.color}`}
//                     animate={{
//                       width: (hoveredPillar !== null ? hoveredPillar : 2) === idx ? '100%' : '0%',
//                     }}
//                     transition={{ duration: 0.3 }}
//                     style={{ width: '48px' }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Section with Flip Animation */}
//       <section id="pricing" className="py-20 px-4 relative">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Simple, <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transparent</span> Pricing
//             </h2>
//             <p className={`text-xl max-w-3xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Choose the plan that fits your business. All plans include access to our unified ecosystem.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, rotateY: 90 }}
//                 whileInView={{ opacity: 1, rotateY: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all cursor-pointer ${
//                   plan.popular
//                     ? darkMode 
//                       ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400 shadow-xl shadow-teal-400/20'
//                       : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-400 shadow-xl shadow-teal-400/20'
//                     : darkMode
//                       ? 'bg-gray-800/30 border-gray-700 hover:border-teal-400'
//                       : 'bg-white border-gray-200 hover:border-teal-400 shadow-lg'
//                 }`}
//               >
//                 {plan.popular && (
//                   <motion.div 
//                     className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white text-sm font-bold"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     Most Popular
//                   </motion.div>
//                 )}

//                 {plan.popular && (
//                   <>
//                     {Array.from({ length: 10 }).map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full bg-teal-400"
//                         style={{
//                           left: `${Math.random() * 100}%`,
//                           top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                           y: [0, -50, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.2,
//                         }}
//                       />
//                     ))}
//                   </>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className={`text-2xl font-bold mb-2 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {plan.name}
//                   </h3>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                       {plan.price}
//                     </span>
//                     <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       {plan.period}
//                     </span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, fidx) => (
//                     <motion.li 
//                       key={fidx} 
//                       className={`flex items-start ${
//                         darkMode ? 'text-gray-300' : 'text-gray-700'
//                       }`}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: fidx * 0.1 }}
//                     >
//                       <Check className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <motion.button 
//                   className={`w-full py-4 rounded-xl font-bold transition-all ${
//                     plan.popular
//                       ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-white hover:shadow-xl hover:shadow-teal-400/50'
//                       : darkMode
//                         ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowContactForm(true)}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>


//       {/* FAQ Section */}
//       <section id="faqs" className={`py-20 px-4 relative ${
//         darkMode ? 'bg-gradient-to-b from-gray-900/50 to-transparent' : 'bg-gradient-to-b from-gray-50 to-white'
//       }`}>
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to know about BGT
//             </p>
//           </motion.div>

//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`rounded-2xl overflow-hidden border ${
//                   darkMode 
//                     ? 'bg-gray-800/30 border-gray-700' 
//                     : 'bg-white border-gray-200 shadow-md'
//                 }`}
//               >
//                 <motion.button
//                   onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                   className={`w-full px-8 py-6 flex justify-between items-center text-left transition-colors ${
//                     darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
//                   }`}
//                   whileHover={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)' }}
//                 >
//                   <span className={`text-lg font-semibold pr-8 ${
//                     darkMode ? 'text-gray-100' : 'text-gray-900'
//                   }`}>
//                     {faq.question}
//                   </span>
//                   <motion.div
//                     animate={{ rotate: openFaq === idx ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronDown className={`w-6 h-6 flex-shrink-0 ${
//                       darkMode ? 'text-teal-400' : 'text-teal-600'
//                     }`} />
//                   </motion.div>
//                 </motion.button>
                
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: openFaq === idx ? 'auto' : 0,
//                     opacity: openFaq === idx ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className={`px-8 pb-6 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                     {faq.answer}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section with Pulsing Glow */}
//       <section className="py-20 px-4 relative">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className={`max-w-5xl mx-auto text-center p-12 rounded-3xl border relative overflow-hidden ${
//             darkMode 
//               ? 'bg-gradient-to-br from-teal-400/10 to-indigo-500/10 border-teal-400/20'
//               : 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-200'
//           }`}
//         >
//           <motion.div
//             className={`absolute inset-0 ${
//               darkMode ? 'opacity-50' : 'opacity-30'
//             }`}
//             animate={{
//               background: [
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
//                 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)',
//               ]
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//           />

//           {Array.from({ length: 15 }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 rounded-full bg-teal-400"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -100],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}

//           <div className="relative z-10">
//             <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
//               darkMode ? 'text-gray-100' : 'text-gray-900'
//             }`}>
//               Ready to <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Transform</span> Your Business?
//             </h2>
//             <p className={`text-xl mb-8 max-w-2xl mx-auto ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Join thousands of businesses already growing faster with our unified Super App platform.
//             </p>
//             <motion.button 
//               className="group px-10 py-5 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all inline-flex items-center"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               animate={{
//                 boxShadow: [
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                   "0 0 40px rgba(45, 212, 191, 0.6)",
//                   "0 0 0px rgba(45, 212, 191, 0)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//               onClick={() => setShowContactForm(true)}
//             >
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer with Wave Animation */}
//       <footer className={`relative border-t py-12 px-4 overflow-hidden ${
//         darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
//       }`}>
//         <motion.div
//           className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: 'reverse',
//           }}
//           style={{
//             backgroundImage: 'linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3)), linear-gradient(45deg, rgba(45, 212, 191, 0.3) 25%, transparent 25%, transparent 75%, rgba(45, 212, 191, 0.3) 75%, rgba(45, 212, 191, 0.3))',
//             backgroundSize: '60px 60px',
//             backgroundPosition: '0 0, 30px 30px',
//           }}
//         />

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <motion.div 
//                   className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Zap className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
//                   BGT
//                 </span>
//               </div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                 All your business power in one unified ecosystem.
//               </p>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Product
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Demo</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Company
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className={`font-bold mb-4 ${
//                 darkMode ? 'text-gray-100' : 'text-gray-900'
//               }`}>
//                 Legal
//               </h4>
//               <ul className={`space-y-2 text-sm ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className={`border-t pt-8 text-center text-sm ${
//             darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
//           }`}>
//             <p>© 2025 BGT. All rights reserved. Built with 💙 for businesses that dream big.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Floating Contact Button */}
// <motion.button
//   onClick={() => setShowContactForm(true)}
//   className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
//     darkMode 
//       ? 'bg-gradient-to-r from-teal-400 to-indigo-500' 
//       : 'bg-gradient-to-r from-teal-500 to-indigo-600'
//   } text-white hover:scale-110 transition-transform`}
//   whileHover={{ scale: 1.15, rotate: 90 }}
//   whileTap={{ scale: 0.95 }}
//   animate={{
//     boxShadow: [
//       "0 0 0 0 rgba(45, 212, 191, 0.7)",
//       "0 0 0 10px rgba(45, 212, 191, 0)",
//       "0 0 0 0 rgba(45, 212, 191, 0)"
//     ]
//   }}
//   transition={{
//     boxShadow: {
//       duration: 2,
//       repeat: Infinity
//     }
//   }}
// >
//   <MessageSquare className="w-7 h-7" />
// </motion.button>
     
//      {showContactForm && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowContactForm(false)}>
//           <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} onClick={(e) => e.stopPropagation()}>
//             <motion.button onClick={() => !isSubmitting && setShowContactForm(false)} className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} disabled={isSubmitting}>
//               <X className="w-6 h-6" />
//             </motion.button>

//             <div className="relative p-8 md:p-12">
//               <div className="text-center mb-8">
//                 <motion.div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 mb-4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
//                   <Mail className="w-10 h-10 text-white" />
//                 </motion.div>
//                 <h2 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
//                   Get in <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Touch</span>
//                 </h2>
//                 <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tell us about your business needs and we'll get back to you within 24 hours</p>
//               </div>

//               {submitStatus && (
//                 <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${submitStatus === 'success' ? darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200' : darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
//                   {submitStatus === 'success' ? <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />}
//                   <div className="flex-1">
//                     <p className={`font-semibold ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{submitStatus === 'success' ? 'Success!' : 'Error'}</p>
//                     <p className={`text-sm ${submitStatus === 'success' ? darkMode ? 'text-green-400' : 'text-green-700' : darkMode ? 'text-red-400' : 'text-red-700'}`}>{submitMessage}</p>
//                   </div>
//                 </motion.div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Users className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
//                     <div className="relative">
//                       <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="1234567890" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Phone className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                     {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
//                     <div className="relative">
//                       <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Your Company Inc." disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                       <Building className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pillar of Interest</label>
//                     <select name="pillarInterest" value={formData.pillarInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
//                       <option value="">Select a pillar</option>
//                       <option value="Lead Hub">Lead Hub</option>
//                       <option value="Networking Hub">Networking Hub</option>
//                       <option value="Business Suite">Business Suite</option>
//                       <option value="Investor Connect">Investor Connect</option>
//                       <option value="AI Growth">AI Growth</option>
//                       <option value="All Pillars">All Pillars</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Plan of Interest</label>
//                     <select name="planInterest" value={formData.planInterest} onChange={handleInputChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}>
//                       <option value="">Select a plan</option>
//                       <option value="Starter">Starter</option>
//                       <option value="Professional">Professional</option>
//                       <option value="Enterprise">Enterprise</option>
//                       <option value="Not Sure">Not Sure</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject <span className="text-red-500">*</span></label>
//                   <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="How can we help you?" disabled={isSubmitting} className={`w-full px-4 py-3 rounded-xl border transition-all ${formErrors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                   {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message <span className="text-red-500">*</span></label>
//                   <div className="relative">
//                     <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us more about your requirements..." rows="5" disabled={isSubmitting} className={`w-full px-4 py-3 pl-11 rounded-xl border transition-all resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-teal-400 focus:ring-teal-400/20' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'} focus:ring-4 outline-none disabled:opacity-50 disabled:cursor-not-allowed`} />
//                     <MessageSquare className={`absolute left-3 top-3.5 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   </div>
//                   {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
//                 </div>

//                 <motion.button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-teal-400 to-indigo-500 hover:shadow-xl hover:shadow-teal-400/50'} text-white`} whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
//                   {isSubmitting ? (
//                     <>
//                       <motion.div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5" />
//                       Send Message
//                     </>
//                   )}
//                 </motion.button>

//                 <p className={`text-sm text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>We'll respond within 24 hours. Your information is secure and confidential.</p>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SuperBusinessApp;






// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// // import LeadHub from './pages/LeadHub';
// // import NetworkingHub from './pages/NetworkingHub';
// // import BusinessSuite from './pages/BusinessSuite';
// // import InvestorConnect from './pages/InvestorConnect';
// // import AIGrowth from './pages/AIGrowth';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/lead-hub" element={<LeadHub />} />
//         <Route path="/networking-hub" element={<NetworkingHub />} />
//         <Route path="/business-suite" element={<BusinessSuite />} />
//         <Route path="/investor-connect" element={<InvestorConnect />} />
//         <Route path="/ai-growth" element={<AIGrowth />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LeadHub from './pages/LeadHub';
import NetworkingHub from './pages/NetworkingHub';
import BusinessSuite from './pages/BusinessSuite';
import InvestorConnect from './pages/InvestorConnect';
import AIGrowth from './pages/AIGrowth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lead-hub" element={<LeadHub />} />
        <Route path="/networking-hub" element={<NetworkingHub />} />
        <Route path="/business-suite" element={<BusinessSuite />} />
        <Route path="/investor-connect" element={<InvestorConnect />} />
        <Route path="/ai-growth" element={<AIGrowth />} />
      </Routes>
    </Router>
  );
}

export default App;