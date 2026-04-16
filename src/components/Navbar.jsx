// Updated Navbar.jsx with automatic festive greeting
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, BookOpen, Phone, ChevronDown, Bot, Building } from 'lucide-react';
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRobot,
  FaBed,
  FaWhatsapp,
  FaSignInAlt as FaSignIn
} from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Button from './AppButton';
import { contactInfoData, hostelData } from '../data/Data';
import logo from "../assets/images/acd.png";

const link = [
  { name: 'Home', link: '/', icon: Home, color: 'hover:text-red-700', action: 'home' },
  { name: 'About us', link: '/about', icon: Info, color: 'hover:text-red-700', action: 'navigate' },
  { name: 'Courses', link: '/course/1', icon: BookOpen, color: 'hover:text-yellow-700', action: 'navigate' },
  { name: 'Products', link: '/products', icon: Building, color: 'hover:text-green-600', action: 'navigate' },
  { name: 'AI Assistant', link: '/ai-chat', icon: Bot, color: 'hover:text-blue-600', action: 'navigate' },
  { name: 'Contact us', link: '/', icon: Phone, color: 'hover:text-red-700', action: 'scrollToFooter' },
];

// Function to calculate Islamic dates (Ramadan, Eid)
const getIslamicDate = (year) => {
  // Approximation for Islamic calendar (Hijri) to Gregorian
  // Actual dates may vary by 1-2 days based on moon sighting

  const islamicToGregorian = {
    2024: { ramadanStart: new Date(2024, 2, 11), ramadanEnd: new Date(2024, 3, 9) },
    2025: { ramadanStart: new Date(2025, 2, 1), ramadanEnd: new Date(2025, 2, 31) },
    2026: { ramadanStart: new Date(2026, 1, 18), ramadanEnd: new Date(2026, 2, 19) },
    2027: { ramadanStart: new Date(2027, 1, 8), ramadanEnd: new Date(2027, 2, 8) },
    2028: { ramadanStart: new Date(2028, 0, 28), ramadanEnd: new Date(2028, 1, 26) },
    2029: { ramadanStart: new Date(2029, 0, 16), ramadanEnd: new Date(2029, 1, 14) },
    2030: { ramadanStart: new Date(2030, 0, 6), ramadanEnd: new Date(2030, 1, 4) }
  };

  return islamicToGregorian[year] || islamicToGregorian[2025];
};

// Function to check if current date is within festive period
const getCurrentFestive = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDate = today.getDate();

  // Get Islamic dates for current year
  const islamicDates = getIslamicDate(currentYear);

  // Check Christmas (Dec 20-27)
  if (currentMonth === 12 && currentDate >= 20 && currentDate <= 27) {
    return {
      id: 'christmas',
      name: 'Christmas',
      greeting: 'Merry Christmas 🎄',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: '🎄',
      year: currentYear
    };
  }

  // Check New Year (Dec 28 - Jan 5)
  if (
    (currentMonth === 12 && currentDate >= 28) ||
    (currentMonth === 1 && currentDate <= 5)
  ) {
    return {
      id: 'newyear',
      name: 'New Year',
      greeting: 'Happy New Year 🎊',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '🎆',
      year: currentYear
    };
  }
  // Check Ramadan
  const ramadanStart = islamicDates.ramadanStart;
  const ramadanEnd = islamicDates.ramadanEnd;

  if (today >= ramadanStart && today <= ramadanEnd) {
    return {
      id: 'ramadan',
      name: 'Ramadan',
      greeting: 'Ramadan Mubarak 🌙',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: '🌙',
      year: currentYear
    };
  }

  // Check Eid al-Fitr (3 days after Ramadan)
  const eidAlFitrStart = new Date(ramadanEnd);
  eidAlFitrStart.setDate(eidAlFitrStart.getDate() + 1);
  const eidAlFitrEnd = new Date(eidAlFitrStart);
  eidAlFitrEnd.setDate(eidAlFitrEnd.getDate() + 2);

  if (today >= eidAlFitrStart && today <= eidAlFitrEnd) {
    return {
      id: 'eid',
      name: 'Eid al-Fitr',
      greeting: 'Eid Mubarak 🌙',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: '🌙',
      year: currentYear
    };
  }

  // Add more festivals as needed
  // Valentine's Day
  if (currentMonth === 2 && currentDate === 14) {
    return {
      id: 'valentine',
      name: "Valentine's Day",
      greeting: 'Happy Valentine\'s Day 💝',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      icon: '💝',
      year: currentYear
    };
  }

  // Easter (simplified - first Sunday after first full moon after March 21)
  const easterDate = new Date(currentYear, 2, 21); // Approximation
  const daysToAdd = (7 - easterDate.getDay()) % 7;
  easterDate.setDate(easterDate.getDate() + daysToAdd + 7);

  if (
    today.getMonth() === easterDate.getMonth() &&
    today.getDate() === easterDate.getDate()
  ) {
    return {
      id: 'easter',
      name: 'Easter',
      greeting: 'Happy Easter 🐣',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🐣',
      year: currentYear
    };
  }

  return null;
};

const Navbar = ({ showHostel = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentFestive, setCurrentFestive] = useState(null);
  const [showFestiveGreeting, setShowFestiveGreeting] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for festive periods
  useEffect(() => {
    const checkFestive = () => {
      const festive = getCurrentFestive();
      setCurrentFestive(festive);

      // Check localStorage for dismissed greetings
      const dismissed = localStorage.getItem('dismissedFestive');
      if (dismissed === festive?.id) {
        setShowFestiveGreeting(false);
      } else {
        setShowFestiveGreeting(true);
      }
    };

    checkFestive();

    // Check every hour for festive period changes
    const interval = setInterval(checkFestive, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const mediaLink = contactInfoData;
  const contact = contactInfoData;
  // Track scroll position for navbar background
  const socialIcons = [
    { icon: FaYoutube, link: mediaLink.youtube, name: "YouTube", bgColor: "hover:bg-red-600" },
    { icon: FaFacebookF, link: mediaLink.facebook, name: "Facebook", bgColor: "hover:bg-blue-600" },
    { icon: FaLinkedinIn, link: mediaLink.linkedin, name: "LinkedIn", bgColor: "hover:bg-blue-700" },
    { icon: FaTwitter, link: mediaLink.twitter, name: "Twitter", bgColor: "hover:bg-sky-500" },
    { icon: FaWhatsapp, link: mediaLink.whatsapp, name: "WhatsApp", bgColor: "hover:bg-green-500" },
  ];

  const contactInfo = [
    { icon: FaPhone, text: contact.phone },
    { icon: FaEnvelope, text: contact.email },
    { icon: FaMapMarkerAlt, text: contact.country },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item) => {
    if (item.action === 'scrollToFooter') {
      scrollToFooter();
    } else if (item.action === 'navigate') {
      navigate(item.link);
      setIsMenuOpen(false);
    } else {
      // Home action
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  // Check if a link is active
  const isActive = (item) => {
    if (item.name === 'Home') {
      return location.pathname === '/';
    }
    if (item.name === 'Contact us') {
      return location.hash === '#footer' || location.pathname === '/contact';
    }
    if (item.name === 'Courses') {
      return location.pathname.startsWith('/course');
    }
    return location.pathname === item.link;
  };

  const handleDismissFestive = () => {
    setShowFestiveGreeting(false);
    if (currentFestive) {
      localStorage.setItem('dismissedFestive', currentFestive.id);
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const menuVariants = {
    closed: { x: '-100%' },
    open: { x: 0 }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const navbarVariants = {
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    top: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      backdropFilter: 'blur(0px)',
      boxShadow: 'none'
    }
  };

  // Responsive text sizes and spacing for nav links
  const getNavStyle = () => {
    if (windowWidth < 768) return 'hidden'; // Hide on mobile
    if (windowWidth < 900) return 'text-xs space-x-3'; // Small screens (768px - 899px)
    if (windowWidth < 1100) return 'text-sm space-x-4'; // Medium screens (900px - 1099px)
    return 'text-base space-x-6'; // Large screens (1100px+)
  };

  // Different animation delays for blinking effect
  const getBlinkDelay = (index) => {
    const delays = [0, 0.5, 1, 1.5, 2, 2.5]; // Different delays for each link
    return delays[index % delays.length];
  };

  // Helper functions for active states
  const getActiveColor = (item) => {
    switch (item.name) {
      case 'AI Assistant': return 'text-blue-600';
      case 'Products': return 'text-green-600';
      case 'Courses': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getIconActiveColor = (item) => {
    switch (item.name) {
      case 'AI Assistant': return 'text-blue-600';
      case 'Products': return 'text-green-600';
      case 'Courses': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getMobileActiveBg = (item) => {
    switch (item.name) {
      case 'AI Assistant': return 'bg-blue-50';
      case 'Products': return 'bg-green-50';
      case 'Courses': return 'bg-yellow-50';
      default: return 'bg-red-50';
    }
  };

  return (
    <>
      {/* Festive Greeting Banner */}
      <AnimatePresence>
        {currentFestive && showFestiveGreeting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full ${currentFestive.bgColor} border-b ${currentFestive.color.replace('text', 'border').replace('600', '200')} z-40`}
          >
            <div className="container mx-auto px-4 py-2 flex justify-between items-center relative">
              <motion.div
                className="flex items-center gap-2 text-sm font-medium"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <span className="text-lg">{currentFestive.icon}</span>
                <span>{currentFestive.greeting}</span>
                <span className="text-xs opacity-70">@ACEDU</span>
              </motion.div>

              <div className="flex items-center gap-3">
                <span className="text-xs opacity-60 hidden sm:block">
                  {currentFestive.year} • {currentFestive.name}
                </span>
                <button
                  onClick={handleDismissFestive}
                  className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                  aria-label="Dismiss greeting"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-[400px]:hidden flex justify-between items-center w-full h-10 bg-linear-to-r from-gray-200 to-transparent px-4 md:px-8">
        {/* Social Icons */}
        <div className="flex items-center h-full">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.link || '#'}
              className={`flex items-center justify-center h-full px-3 cursor-pointer transition-colors ${item.bgColor} group`}
              aria-label={item.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon className="text-gray-800 group-hover:text-white w-4 h-4 transition-colors" />
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="hidden md:flex items-center gap-2 text-xs lg:text-sm text-gray-800 hover:text-(--text3-c) transition-colors"
            >
              <item.icon className="w-3 h-3" />
              <span className="whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.nav
        className="flex w-full h-17 sticky top-0 z-50 md:h-20 justify-between items-center border-b border-red-200 px-4 md:px-8"
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Logo with festive indicator */}
        <div className='flex flex-col items-center gap-3 relative'>
          <div
            className='text-2xl md:text-3xl font-bold text-red-600 cursor-pointer'
            onClick={() => handleNavClick({ action: 'home' })}
          >
            <img
              src={logo}
              alt="ACEDU Coding BootCamp Logo"
              className='w-32 md:w-40 object-contain cursor-pointer'
            />
          </div>
          {/* Festive indicator next to logo for desktop */}
          {currentFestive && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex ml-3"
            >
              <div className={`text-xs font-medium ${currentFestive.color} flex items-center gap-1`}>
                <motion.span
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  {currentFestive.icon}
                </motion.span>
                <span>{currentFestive.greeting}</span>
              </div>
            </motion.div>
          )}

        </div>

        {/* Desktop Navigation - Responsive with shrinking text */}
        <div className={`hidden md:flex items-center ${getNavStyle()}`}>
          {link.map((item, index) => {
            const active = isActive(item);
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-1 font-medium transition-all duration-300 relative group ${item.color} whitespace-nowrap ${active ? getActiveColor(item) : 'text-gray-700'
                  }`}
              >
                {item.name === 'AI Assistant' ? (
                  <div className="relative">
                    <FaRobot className={`w-3.5 h-3.5 ${active ? 'text-blue-600' : ''}`} />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                ) : item.name === 'Products' ? (
                  <Building className={`w-3.5 h-3.5 ${active ? 'text-green-600' : ''}`} />
                ) : (
                  <item.icon className={`w-3.5 h-3.5 ${active ? getIconActiveColor(item) : ''}`} />
                )}
                <span className={active ? getActiveColor(item) : ''}>
                  {item.name}
                </span>

                {/* Active indicator - blinking animation with different delays */}
                {active && (
                  <motion.span
                    className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full ${item.name === 'AI Assistant' ? 'bg-blue-600' :
                      item.name === 'Products' ? 'bg-green-600' :
                        item.name === 'Courses' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: getBlinkDelay(index),
                      ease: "easeInOut"
                    }}
                    style={{ animationDelay: `${getBlinkDelay(index)}s` }}
                  />
                )}

                {/* Underline effect */}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${item.name === 'AI Assistant' ? 'bg-blue-600' :
                  item.name === 'Products' ? 'bg-green-600' :
                    item.name === 'Courses' ? 'bg-yellow-600' : 'bg-red-600'
                  } ${active ? 'w-full' : ''}`}></span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className='w-6 h-6 text-gray-700' />
        </button>

        {/* Desktop CTA Button - Responsive */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            className={`gap-2 font-medium ${windowWidth < 900 ? 'py-5 px-4 text-sm' : 'py-6 px-6'
              }`}
            onClick={() => navigate('/login')}
            icon="login"
          >

            Login
          </Button>
        </div>
      </motion.nav>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className='bg-white/10 flex gap-3 items-center backdrop-blur-lg shadow-lg  h-10 absolute md-top-30 right-8 z-2 font-semibold text-md text-white/70 transition-all duration-200 hover:text-white p-3'>
          <FaSignIn className="w-5 h-5" />
          Login

      </motion.div> */}

      {/* Floating Hostel Button - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-21 right-3 z-70"
      >
        <Button
          className={`${showHostel ? "hidden" : "block"} bg-blue-900 hover:bg-blue-700 py-2 px-2 text-white shadow-lg shadow-blue-600/30`}
          onClick={() => navigate('/hostel')}
          icon="bed"
          disabled={!hostelData.status} // set hosteldata.status to true to enable everything concerning hostel in data.js
        >
          <FaBed className="mr-2" />
          View Our Hostel
        </Button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 md:hidden flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex flex-col">
                  <img
                    src={logo}
                    alt="ACEDU Coding BootCamp Logo"
                    className='w-32 object-contain cursor-pointer'
                  />
                  {currentFestive && (
                    <div className={`mt-2 text-xs ${currentFestive.color} flex items-center gap-1`}>
                      <span>{currentFestive.icon}</span>
                      <span>{currentFestive.greeting}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-1 grow">
                {link.map((item, index) => {
                  const active = isActive(item);
                  return (
                    <motion.button
                      key={index}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between w-full p-4 rounded-lg transition-all duration-300 relative ${active ? getMobileActiveBg(item) : 'hover:bg-gray-50'
                        } ${item.color}`}
                      onClick={() => handleNavClick(item)}
                    >
                      <div className="flex items-center space-x-3">
                        {item.name === 'AI Assistant' ? (
                          <div className="relative">
                            <FaRobot className={`w-5 h-5 ${active ? 'text-blue-600' : ''}`} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        ) : item.name === 'Products' ? (
                          <Building className={`w-5 h-5 ${active ? 'text-green-600' : ''}`} />
                        ) : (
                          <item.icon className={`w-5 h-5 ${active ? getIconActiveColor(item) : ''}`} />
                        )}
                        <span className={`font-medium ${active ? getActiveColor(item) : ''
                          }`}>
                          {item.name}
                          {item.name === 'AI Assistant' && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Active indicator for mobile */}
                      {active && (
                        <motion.div
                          className={`w-2 h-2 rounded-full ${item.name === 'AI Assistant' ? 'bg-blue-600' :
                            item.name === 'Products' ? 'bg-green-600' :
                              item.name === 'Courses' ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: getBlinkDelay(index),
                            ease: "easeInOut"
                          }}
                        />
                      )}

                      {item.action === 'scrollToFooter' && !active ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : item.name === 'AI Assistant' && !active ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>

              {/* Menu Footer CTA */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    className="w-full py-3.5 font-medium"
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    icon="edit"
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;