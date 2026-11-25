import './ChatBot.css';
import myPhoto from './assets/logo.png';
import CustomCursor from './components/CustomCursor';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Terminal, 
  Database,
  ChevronDown,
  Send,
  Menu,
  X,
  Star,
  Sun,
  Moon,
  MessageCircle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowUp
} from 'lucide-react';

// ========== FAQ CHATBOT COMPONENT ==========
const ChatBot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const faqs = [
    { 
      question: "Who are you?", 
      keywords: ["who", "name", "okello", "righan", "about", "yourself"],
      answer: "I'm Okello Righan, a Full-Stack Developer & Graphic Designer. I build websites and apps under my brand, Infinity.OR." 
    },
    { 
      question: "What do you do?", 
      keywords: ["do", "stack", "skills", "tech", "technologies", "build", "services"],
      answer: "I design and build web apps using React, TypeScript, Next.js, Node.js, FastAPI, and Tailwind CSS — handling both UI/UX design and engineering." 
    },
    { 
      question: "What have you built?", 
      keywords: ["built", "projects", "portfolio", "examples", "apps", "websites"],
      answer: "Voice of Power, Intexclo Construction, a Real-Time Analytics Dashboard, and this Infinity.OR portfolio." 
    },
    { 
      question: "Are you available for hire?", 
      keywords: ["hire", "available", "freelance", "job", "contract", "work", "open"],
      answer: "Yes — I'm available for freelance, contract, or full-time roles. Drop me a message below and let's talk!" 
    },
    { 
      question: "How much experience do you have?", 
      keywords: ["experience", "years", "long", "background", "clients"],
      answer: "2+ years of hands-on experience, 12+ completed projects, and 8+ happy clients." 
    },
    { 
      question: "How do I reach you?", 
      keywords: ["reach", "contact", "email", "phone", "message", "talk"],
      answer: "Email me at okellorighan3@gmail.com or use the contact form on this page. I usually reply within 24 hours." 
    },
    { 
      question: "How much do you charge?", 
      keywords: ["charge", "cost", "price", "pricing", "rate", "rates", "quote", "budget"],
      answer: "It depends on the scope. I offer fixed pricing for well-defined projects and hourly rates for ongoing work. Share your idea and I'll send a quote!" 
    },
    { 
      question: "What is Infinity.OR?", 
      keywords: ["infinity", "brand", "meaning", "logo"],
      answer: "Infinity.OR is my creative studio brand. It represents limitless creativity — blending clean code and thoughtful design into one." 
    },
    { 
      question: "How long does a project take?", 
      keywords: ["timeline", "time", "duration", "fast", "weeks", "deadline"],
      answer: "Landing pages typically take 1–2 weeks, while full-stack web apps take 4–8 weeks. You'll get a clear milestone schedule upfront." 
    },
    { 
      question: "Do you offer support after launch?", 
      keywords: ["support", "maintenance", "after", "launch", "updates", "hosting"],
      answer: "Yes! I offer post-launch maintenance and support packages to keep your site fast, secure, and up to date." 
    }
  ];

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Smart keyword + exact matching instead of strict exact-only matching
  const findBestAnswer = (userMessage) => {
    const cleanMsg = userMessage.trim().toLowerCase().replace(/[?!.,]/g, '');
    
    // 1. Check exact match first
    const exact = faqs.find(f => f.question.toLowerCase().replace(/[?!.,]/g, '') === cleanMsg);
    if (exact) return exact.answer;

    // 2. Score by keyword overlap
    const words = cleanMsg.split(/\s+/);
    let bestMatch = null;
    let highestScore = 0;

    faqs.forEach(faq => {
      let score = 0;
      faq.keywords.forEach(kw => {
        if (words.includes(kw)) score += 2;
        else if (cleanMsg.includes(kw)) score += 1;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    return highestScore >= 2 ? bestMatch.answer : null;
  };

  const triggerBotReply = (userText) => {
    setIsTyping(true);
    const answer = findBestAnswer(userText);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: answer || "I didn't quite catch that! Try picking one of the quick questions below, or ask about my **skills**, **pricing**, **projects**, or **availability**.",
          timestamp: getTime()
        }
      ]);
    }, 450);
  };

  const handleFaqClick = (question) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: question, timestamp: getTime() }]);
    triggerBotReply(question);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text, timestamp: getTime() }]);
    setInputValue('');
    triggerBotReply(text);
  };

  const handleReset = () => {
    setMessages([
      { id: Date.now(), sender: 'bot', text: "Chat cleared! Ask me anything or tap a topic below.", timestamp: getTime() }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: Date.now(), sender: 'bot', text: "Hi there! 👋 I'm Okello's virtual assistant. Ask me a question or pick a prompt below.", timestamp: getTime() }
      ]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chatbot-wrapper fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
          isOpen ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`chatbot-panel absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-32px)] h-[530px] max-h-[calc(100vh-120px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {/* Header */}
            <div className="chatbot-header px-5 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="font-semibold text-sm">Infinity.OR Assistant</h3>
                </div>
                <p className="text-xs text-blue-100 mt-0.5">Ask about projects, stack, or rates</p>
              </div>
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className={`chatbot-messages flex-1 overflow-y-auto p-4 space-y-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : darkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}>
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <span className={`text-[10px] mt-1 block ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className={`px-4 py-3 rounded-2xl rounded-bl-sm text-xs flex gap-1 items-center ${
                    darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500 border border-gray-100'
                  }`}>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className={`px-3 py-2 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaqClick(faq.question)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                    }`}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className={`p-3 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className={`flex-1 px-3.5 py-2 text-sm rounded-xl border outline-none transition-colors ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className={`w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-opacity ${
                    !inputValue.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------- ANIMATION VARIANTS ----------
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

// ---------- DATA ----------
const skills = [
  { name: "HTML5", icon: <Terminal size={24} />, level: 90, color: "bg-blue-600" },
  { name: "Next.js", icon: <Code2 size={24} />, level: 70, color: "bg-indigo-600" },
  { name: "React.js", icon: <Code2 size={24} />, level: 75, color: "bg-blue-500" },
  { name: "CSS3", icon: <Palette size={24} />, level: 88, color: "bg-purple-500" },
  { name: "Tailwind CSS", icon: <Palette size={24} />, level: 70, color: "bg-cyan-500" },
  { name: "Python", icon: <Star size={24} />, level: 76, color: "bg-teal-500" },
  { name: "Node.js", icon: <Database size={24} />, level: 85, color: "bg-green-500" },
  { name: "FastAPI", icon: <Database size={24} />, level: 81, color: "bg-emerald-600" },
];

const projects = [
  {
    id: 1,
    title: "Voice of Power",
    category: "Full-Stack",
    description: "Hand-picked motivational speeches from the world's most influential voices, ready to inspire your next breakthrough.",
    tech: ["React.js", "Node.js", "MongoDB"],
    image: "/gold mic.png",
    github: "https://github.com",
    live: "https://defna.netlify.app"
  },
  {
    id: 2,
    title: "Intexclo",
    category: "Full-Stack",
    description: "A dynamic construction company website with interactive project showcases and responsive design.",
    tech: ["React.js", "Node.js", "Tailwind CSS", "MongoDB"],
    image: "/intex.png",
    github: "https://github.com",
    live: "https://intexclo.netlify.app"
  },
  {
    id: 3,
    title: "Real-time Analytics Dashboard",
    category: "Frontend",
    description: "Interactive data visualization dashboard with live WebSocket updates and custom D3.js charts.",
    tech: ["React.js", "D3.js", "WebSocket", "Redis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 4,
    title: "Infinity.OR Portfolio",
    category: "Frontend",
    description: "My personal brand portfolio website showcasing web engineering, UI/UX design, and interactive components.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    image: "/logo2.png",
    github: "https://github.com",
    live: "https://righan.netlify.app"
  }
];

// ---------- COMPONENTS ----------
const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setDarkMode(!darkMode)}
    className={`p-2 rounded-full transition-colors ${
      darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
    aria-label="Toggle dark mode"
  >
    <AnimatePresence mode="wait">
      {darkMode ? (
        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <Sun size={20} />
        </motion.div>
      ) : (
        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <Moon size={20} />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800' 
          : 'bg-white/90 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src="/logo2.png" alt="Infinity.OR" className="h-10 w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Infinity.OR
            </span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors font-medium ${
                  darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button 
              className={`p-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 transition-colors ${
                  darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ darkMode }) => (
  <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
    darkMode ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
  }`}>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full filter blur-3xl animate-blob ${darkMode ? 'opacity-20' : 'opacity-40 mix-blend-multiply'}`} />
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000 ${darkMode ? 'opacity-20' : 'opacity-40 mix-blend-multiply'}`} />
      <div className={`absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full filter blur-3xl animate-blob animation-delay-4000 ${darkMode ? 'opacity-15' : 'opacity-40 mix-blend-multiply'}`} />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center">
        <motion.div variants={fadeInUp} className="mb-6">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            darkMode ? 'bg-blue-950/80 text-blue-300 border border-blue-800' : 'bg-blue-100 text-blue-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            Available for Hire
          </span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Okello Righan</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Full-Stack Developer & Web Designer crafting fast, accessible, and visually striking digital experiences
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105">
            View My Work
          </a>
          <a 
            href="#contact" 
            className={`px-8 py-4 border-2 rounded-full font-semibold transition-all ${
              darkMode 
                ? 'border-gray-700 text-gray-200 hover:border-blue-500 hover:text-blue-400' 
                : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
            }`}
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 flex justify-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`transition-transform hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/righan-okello-874072405/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`transition-transform hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-700'}`}>
            <Linkedin size={28} />
          </a>
          <a href="mailto:okellorighan3@gmail.com" aria-label="Email" className={`transition-transform hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}>
            <Mail size={28} />
          </a>
        </motion.div>
      </motion.div>
    </div>

    <motion.a 
      href="#about"
      aria-label="Scroll to About"
      animate={{ y: [0, 10, 0] }} 
      transition={{ repeat: Infinity, duration: 2 }} 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <ChevronDown size={32} className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
    </motion.a>
  </section>
);

const About = ({ darkMode }) => (
  <section id="about" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="relative">
            <div className={`w-full h-96 rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}>
              <img src={myPhoto} alt="Okello Righan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">2+</div>
                <div className="text-sm">Years Exp.</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Passionate about building products that make a difference
          </h3>
          <p className={`mb-6 leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm a Full-Stack Developer & Graphic Designer with a passion for creating intuitive, dynamic user experiences. 
            With expertise in modern JavaScript frameworks, Python backends, and a keen eye for visual hierarchy, I bridge the gap 
            between engineering and aesthetics.
          </p>
          <p className={`mb-8 leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            When I'm not coding, you'll find me exploring new technologies, refining brand identities under Infinity.OR, 
            or contributing to open-source projects.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border transition-colors duration-300 ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
              <div className="text-2xl font-bold text-blue-600">12+</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects Completed</div>
            </div>
            <div className={`p-4 rounded-xl border transition-colors duration-300 ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
              <div className="text-2xl font-bold text-purple-600">8+</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Technical Skills - Dark Mode Fixed & 4-col grid */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h3 className={`text-2xl font-bold text-center mb-8 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`p-6 rounded-xl shadow-md hover:shadow-xl transition-all border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto shadow-sm`}>
                {skill.icon}
              </div>
              <h4 className={`font-semibold text-center mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h4>
              <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <motion.div 
                  className={`h-2 rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <p className={`text-center text-xs mt-2 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Projects = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Full-Stack', 'Frontend'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4" />
          <p className={`max-w-2xl mx-auto mb-8 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A selection of my recent work, showcasing my expertise in full-stack development and UI/UX design.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <div className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border h-full flex flex-col ${
                  darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
                }`}>
                  <div className="relative overflow-hidden h-64">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                      <div className="flex gap-3">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Source Code" className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                      <p className={`mb-4 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode ? 'bg-blue-950/80 text-blue-300 border border-blue-900' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 rounded-full font-semibold transition-all ${
              darkMode
                ? 'border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
            }`}
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = ({ darkMode }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await emailjs.sendForm('service_rbhim6b', 'template_2ygw24p', formRef.current, 'TXGg_wpdXi8JY8Zm9');
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className={`text-4xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-3 mb-4" />
          <p className={`max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Let's Talk</h3>
            <p className={`mb-8 leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you need a full-stack web application, a brand refresh, or a dedicated frontend engineer, feel free to reach out.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                  <a href="mailto:okellorighan3@gmail.com" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    okellorighan3@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Linkedin size={22} />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/righan-okello-874072405/" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Okello Righan
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-950 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Github size={22} />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GitHub</h4>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    github.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl border shadow-lg space-y-5 ${
              darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  darkMode
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  darkMode
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors resize-none ${
                  darkMode
                    ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            {submitted && (
              <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 px-4 py-3 rounded-xl">
                <CheckCircle2 size={18} />
                Message sent! I'll get back to you within 24 hours.
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ darkMode }) => (
  <footer className={`py-8 border-t transition-colors duration-300 ${
    darkMode ? 'bg-gray-950 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
  }`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Infinity.OR</span> — Okello Righan. All rights reserved.
      </p>
      <a
        href="#home"
        aria-label="Back to top"
        className={`p-2.5 rounded-full border transition-colors ${
          darkMode ? 'border-gray-800 hover:border-blue-500 text-gray-400 hover:text-white' : 'border-gray-300 hover:border-blue-600 text-gray-600 hover:text-blue-600'
        }`}
      >
        <ArrowUp size={18} />
      </a>
    </div>
  </footer>
);

// ---------- MAIN APP ----------
export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-900'}>
      <CustomCursor />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
      <ChatBot darkMode={darkMode} />
    </div>
  );
}