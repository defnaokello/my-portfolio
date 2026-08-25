import './ChatBot.css';   // <-- Import the new chatbot CSS
import myPhoto from './assets/logo.png';
import React, { useState, useEffect, useRef } from 'react';
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
  MessageCircle
} from 'lucide-react';

// ========== FAQ CHATBOT COMPONENT ==========
const ChatBot = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ---------- FAQ LIST ----------
    const faqs = [
  { question: "Who are you?",answer: "I'm Okello Righan, a Full-Stack Developer & Graphic Designer. I build websites and apps under my brand, Infinity.OR." },
  {question: "What do you do?",answer: "I design and build web apps. React, TypeScript, Node.js, Tailwind, Next.js — the modern stack. I also handle UI/UX design."},
  { question: "What have you built?", answer: "Voice of Power, Intex Construction, a real-time analytics dashboard, and this portfolio site."},
  {question: "Are you available for hire?", answer: "Yes — freelance, contract, or full-time. Drop me a message and let's talk." },
  {question: "How much experience do you have?",answer: "2+ years, 12+ projects, 8+ happy clients."},
  {question: "How do I reach you?",answer: "Email me at okellorighan3@gmail.com or use the contact form. I reply within 24 hours."},
  {question: "How much do you charge?", answer: "Depends on the project. Fixed price for small jobs, hourly for ongoing work. Tell me what you need and I'll send a quote."},
  {question: "What is Infinity.OR?",answer: "My brand. It stands for limitless creativity — blending code and design into one."},
  {question: "How long does a project take?",answer: "Landing page: 2–3 weeks. Full app: 5–8 weeks. I'll give you a clear timeline after we discuss the scope."},
  {question: "Do you offer support after launch?",answer: "Yes. I offer maintenance packages to keep everything running smoothly."},
  {question: "Can you redesign my existing site?", answer: "Absolutely. I'll modernize the look, speed it up, and keep your content intact." },
  {question: "What's your process?",answer: "Discovery → Planning → Design → Development → Testing → Launch → Support. You stay in the loop at every step."},
  {question: "Do you work with startups?", answer: "Yes. I love working with startups and small teams to turn ideas into real products."},
  { question: "Do you use CMS platforms?", answer: "I can. I'm familiar with Strapi and Contentful, but I also build custom backends with Node.js and MongoDB."},
  {question: "Why should I hire you?",answer: "I code *and* design. That means your project looks great and works great — no gaps between the two."},
  {question: "Can I see your work?",answer: "Sure. Check the Projects section above for live demos and links."},
  {question: "How do we get started?",answer: "Email me or fill out the contact form. We'll jump on a quick call and take it from there."}
];
  

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const findAnswer = (userMessage) => {
    const cleanMsg = userMessage.trim().toLowerCase();
    return faqs.find(faq => faq.question.toLowerCase() === cleanMsg);
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text, timestamp: getTime() }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text, timestamp: getTime() }]);
  };

  const handleFaqClick = (question) => {
    addUserMessage(question);
    const match = findAnswer(question);
    if (match) {
      addBotMessage(match.answer);
    } else {
      addBotMessage("I'm not sure about that. Please pick a question from the list.");
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    addUserMessage(text);
    const match = findAnswer(text);
    if (match) {
      addBotMessage(match.answer);
    } else {
      addBotMessage("I can only answer specific questions. Please choose one from the list or type exactly:");
    }
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(" Welcome! Pick a question below or type one exactly as shown.");
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Tailwind fallbacks for layouts (width/height/flex) are preserved,
  // but colors are now mainly controlled by our custom CSS classes.
  const msgBgUser = 'chatbot-user-message';   // custom class
  const msgBgBot = 'chatbot-bot-message';     // custom class

  return (
    <div className="chatbot-wrapper fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
          isOpen ? 'bg-gray-800 text-white' : 'text-white'
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
            className="chatbot-panel absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-140px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="chatbot-header px-5 py-4 border-b">
              <h3 className="font-semibold text-sm">Infinity.OR ChatAssistant</h3>
              <p className="text-xs">Click a question or type exactly</p>
            </div>

            {/* Messages */}
            <div className="chatbot-messages flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' ? msgBgUser : msgBgBot
                  } ${msg.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md'} shadow-sm`}>
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* FAQ Buttons */}
            <div className="chatbot-quick-replies px-4 py-2">
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaqClick(faq.question)}
                    className="chatbot-faq-btn whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t chatbot-quick-replies">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a FAQ question exactly..."
                  className="chatbot-input flex-1 px-4 py-2.5 text-sm outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`chatbot-send-btn w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                    !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
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
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skillVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};

// ---------- DATA ----------
const skills = [
  { name: "HTML5", icon: <Terminal size={24} />, level: 90, color: "bg-blue-600" },
  { name: "Next.js", icon: <Code2 size={24} />, level: 70, color: "bg-blue-600" },
  { name: "React.js", icon: <Code2 size={24} />, level: 75, color: "bg-blue-500" },
  { name: "CSS3", icon: <Palette size={24} />, level: 88, color: "bg-purple-500" },
  { name: "Tailwind CSS", icon: <Palette size={24} />, level: 70, color: "bg-purple-500" },
 { name: "Python", icon: <Star size={24} />, level: 76, color: "bg-teal-500" },
  { name: "Node.js", icon: <Database size={24} />, level: 85, color: "bg-green-500" },
  { name: "FastAPI", icon: <Database size={24} />, level: 81, color: "bg-green-500" },
];

const projects = [
  {
    id: 1,
    title: "Voice of Power",
    description: "Hand-picked motivational speeches from the world's most influential voices, ready to inspire your next breakthrough.",
    tech: ["React.js", "Node.js", "MongoDB"],
    image: "/gold mic.png",
    github: "https://defna.netlify.app",
    live: "/gold mic.png"
  },
  {
    id: 2,
    title: "Intexclo",
    description: "A dynamic construction company website with interactive features and responsive design.",
    tech: ["React.js", "Node.js", "Tailwind CSS", "MongoDB"],
    image: "/intex.png",
    github: "https://intexclo.netlify.app",
    live: "/intex.png"
  },
  {
    id: 3,
    title: "Real-time Analytics Dashboard",
    description: "Interactive data visualization dashboard with WebSocket updates and custom charts.",
    tech: ["React.js", "D3.js", "WebSocket", "Redis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 4,
    title: "Infinity.OR",
    description: "My own portfolio website showcasing my projects and skills.",
    tech: ["React.js", "Tailwind CSS", "Node.js"],
    image: "/logo2.png",
    github: "https://righan.netlify.app",
    live: "/logo2.png"
  }
];

// ---------- COMPONENTS ----------
const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors"
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img src="/logo2.png" alt="Infinity.OR" className="h-10 w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Infinity.OR
            </span>
          </motion.div>

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
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
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
            className={`md:hidden border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
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
    darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
  }`}>
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center">
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Available for Hire
          </span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Okello Righan</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Full-Stack Developer & Web Designer crafting beautiful digital experiences
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105">
            View My Work
          </a>
          <a href="#contact" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all">
            Contact Me
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 flex justify-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/righan-okello-874072405/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-700'}`}>
            <Linkedin size={28} />
          </a>
          <a href="mailto:okellorighan3@gmail.com" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}>
            <Mail size={28} />
          </a>
        </motion.div>
      </motion.div>
    </div>

    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <ChevronDown size={32} className={`transition-colors ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
    </motion.div>
  </section>
);

const About = ({ darkMode }) => (
  <section id="about" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden shadow-xl">
              <img src={myPhoto} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
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
            I'm a full-stack developer with a passion for creating intuitive, dynamic user experiences. 
            With expertise in modern JavaScript frameworks and a keen eye for design, I bridge the gap 
            between engineering and aesthetics.
          </p>
          <p className={`mb-8 leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
            projects, or sharing knowledge with the developer community.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold text-blue-600">12+</div>
              <div className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects Completed</div>
            </div>
            <div className={`p-4 rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold text-blue-600">8+</div>
              <div className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h3 className={`text-2xl font-bold text-center mb-8 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center text-white mb-4 mx-auto`}>
                {skill.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-center mb-2">{skill.name}</h4>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className={`h-2 rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-1">{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Projects = ({ darkMode }) => (
  <section id="projects" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4" />
        <p className={`max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          A selection of my recent work, showcasing my expertise in full-stack development and UI/UX design.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden h-64">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
        <a 
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          <Github size={20} />
          View More on GitHub
        </a>
      </motion.div>
    </div>
  </section>
);

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
      await emailjs.send('service_rbhim6b', 'template_ipdww9r', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }, 'TXGg_wpdXi8JY8Zm9');
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again.");
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
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Let's Talk</h3>
            <p className={`mb-8 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Feel free to reach out for projects, collaborations, or opportunities.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Mail size={22} /></div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                  <a href="mailto:okellorighan3@gmail.com" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>okellorighan3@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Linkedin size={22} /></div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/righan-okello-874072405/" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>View Profile</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Github size={22} /></div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>GitHub</h4>
                  <a href="https://github.com/defna2018" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>github.com/defna2018</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
              {submitted && <div className="p-4 bg-green-100 text-green-700 rounded-lg">Message sent! Check your email for confirmation.</div>}
              <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange}
                className={`w-full p-3 border rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`} />
              <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange}
                className={`w-full p-3 border rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`} />
              <textarea name="message" rows="5" placeholder="Your Message" required value={formData.message} onChange={handleChange}
                className={`w-full p-3 border rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'}`} />
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2">
                {isSubmitting ? "Sending..." : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Infinity.OR
          </div>
          <p className="text-gray-400 mt-2">Building digital experiences that matter.</p>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/defna2018" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all hover:scale-110">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/righan-okello-874072405/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="mailto:okellorighan3@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-red-500 hover:text-white transition-all hover:scale-110">
            <Mail size={20} />
          </a>
          <a href="https://www.instagram.com/am_alphii/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-green-500 hover:text-white transition-all hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>© 2025 Okello Righan. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// ---------- MAIN APP ----------
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer />
      <ChatBot darkMode={darkMode} />
    </div>
  );
};

export default App;