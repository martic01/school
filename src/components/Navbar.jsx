import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"; // ⬅ add useLocation
import { Menu, X, Home, Info, BookOpen, Phone, Edit, ChevronDown } from 'lucide-react';
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
}  from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Button from './AppButton';

const link = [
  { name: 'Home', link: '/', icon: Home, color: 'hover:text-red-700', action: 'home' },
  { name: 'About us', link: '/about', icon: Info, color: 'hover:text-red-700', action: 'navigate' },
  { name: 'Course modules', link: '/course/1', icon: BookOpen, color: 'hover:text-yellow-700', action: 'navigate' },
  { name: 'Contact us', link: '/', icon: Phone, color: 'hover:text-red-700', action: 'scrollToFooter' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ⬅ current route

  // Track scroll position for navbar background
  const socialIcons = [
    { icon: FaYoutube, name: "YouTube", bgColor: "hover:bg-red-600" },
    { icon: FaFacebookF, name: "Facebook", bgColor: "hover:bg-blue-600" },
    { icon: FaLinkedinIn, name: "LinkedIn", bgColor: "hover:bg-blue-700" },
    { icon: FaTwitter, name: "Twitter", bgColor: "hover:bg-sky-500" },
  ];

  const contactInfo = [
    { icon: FaPhone, text: "+234 899 10101" },
    { icon: FaEnvelope, text: "aced@welcome.com" },
    { icon: FaMapMarkerAlt, text: "Lagos Nigeria" },
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
        // If we're not on home, navigate to home
        navigate('/');
      } else {
        // If already on home, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
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

  return (
    <>
      <div className="max-[400px]:hidden flex justify-between items-center w-full h-10 bg-linear-to-r from-gray-200 to-transparent px-4 md:px-8">
        {/* Social Icons */}
        <div className="flex items-center h-full">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center justify-center h-full px-3 cursor-pointer transition-colors ${item.bgColor} group`}
              aria-label={item.name}
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
        {/* Logo */}
        <div className='flex items-center'>
          <div
            className='text-2xl md:text-3xl font-bold text-red-600 cursor-pointer'
            onClick={() => handleNavClick({ action: 'home' })}
          >
            ACEDU BC
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          {link.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className={`text-gray-700 font-medium transition-all duration-300 hover:text-red-600 relative group ${item.color}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className='w-6 h-6 text-gray-700' />
        </button>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex">
          <Button className="gap-2 px-6 py-2.5 font-medium" onClick={() => console.log('Enroll clicked')}>
            <Edit size={18} />
            Enroll Now
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
                <h2 className="text-xl font-bold text-red-600">Moat Academy</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-1 grow">
                {link.map((item, index) => (
                  <motion.button
                    key={index}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between w-full p-4 rounded-lg hover:bg-red-50 transition-all duration-300 ${item.color}`}
                    onClick={() => handleNavClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.action === 'scrollToFooter' && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Menu Footer CTA */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="w-full py-3.5 font-medium"
                    onClick={() => {
                      console.log('Enroll clicked from mobile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Edit size={18} />
                    Enroll Now
                  </Button>
                </motion.div>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Transforming IT Education
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;