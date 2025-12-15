import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter, 
  FaTiktok, 
  FaYoutube, 
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPaintBrush,
  FaHeart,
  FaGraduationCap
} from "react-icons/fa";

// Pre-generate floating dot positions & durations once (outside render)
const floatingDots = Array.from({ length: 8 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 3 + Math.random() * 2,
}));

// Pre-calc current year once (optional but also keeps render pure)
const CURRENT_YEAR = new Date().getFullYear();

const Footer = ({show = true}) => {
  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", color: "hover:bg-blue-600", link: "https://facebook.com" },
    { icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-700", link: "https://linkedin.com" },
    { icon: FaTwitter, label: "Twitter", color: "hover:bg-blue-400", link: "https://twitter.com" },
    { icon: FaTiktok, label: "TikTok", color: "hover:bg-black", link: "https://tiktok.com" },
    { icon: FaYoutube, label: "YouTube", color: "hover:bg-red-600", link: "https://youtube.com" },
    { icon: FaInstagram, label: "Instagram", color: "hover:bg-linear-to-r from-purple-600 via-pink-600 to-yellow-500", link: "https://instagram.com" }
  ];

  return (
    <footer id="footer" className={` ${show ? 'block' : 'hidden'}  w-full bg-white text-gray-800 relative overflow-hidden border-t border-gray-200`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-black rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* What We Stand For Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shrink-0">
                <FaGraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  <span className="text-red-600">What We</span> Stand For
                </h3>
                <div className="w-16 h-1 bg-red-600 mb-4"></div>
              </div>
            </div>
            
            <div className="bg-linear-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-red-100 relative overflow-hidden shadow-sm">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600"></div>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                Just as <span className="font-bold text-red-600">ACEDU</span> provides security and ornaments when built around a castle, 
                we at <span className="font-bold text-red-600">ACEDU Boot Camp</span> seek to beautify and secure businesses using Information Technology. 
                With <span className="font-bold text-red-600">quality</span> and <span className="font-bold text-red-600">security</span> in mind, 
                as reflected in our color scheme representing stability and excellence.
              </p>
              
              {/* Icon Row */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-red-700">Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FaPaintBrush className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-red-700">Beautify</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FaGraduationCap className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-red-700">Education</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Us Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                <span className="text-red-600">Contact</span> Us
              </h3>
              <div className="w-16 h-1 bg-red-600 mb-6"></div>
            </div>
            
            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <FaMapMarkerAlt className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    5, Matanity busstop, off college road,<br />
                    ogba, Ikeja (10893),<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <FaPhone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                  <a 
                    href="tel:+2344012928235" 
                    className="text-red-600 hover:text-red-700 transition-colors text-lg font-semibold"
                  >
                    (+234) 8018691235
                  </a>
                </div>
              </div>
            </div>

            {/* ACEDU Boot Camp Logo/Badge */}
            <div className="mt-8 p-4 bg-linear-to-r from-red-50 to-gray-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <FaGraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">ACEDU Boot Camp</h4>
                  <p className="text-sm text-gray-600">Excellence in IT Education</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium mr-2">Follow ACEDU Boot Camp:</span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 ${social.color} hover:text-white border border-gray-300 hover:border-transparent`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d126839.06821658298!2d3.3488896!3d6.5568768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x103b917dd312f1cd%3A0x2490eb1ec589e652!2s77%20Yaya%20Abatan%20Rd%2C%20Ogba%2C%20Lagos%20101232%2C%20Lagos!3m2!1d6.635971!2d3.3353303!5e0!3m2!1sen!2sng!4v1765799813310!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center md:text-right"
            >
              <div className="flex items-center justify-center md:justify-end gap-2 text-gray-500 mb-1">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaHeart className="w-4 h-4 text-red-500" />
                </motion.div>
                <span>by ACEDU Boot Camp</span>
              </div>
              <p className="text-sm text-gray-600">
                Copyright © 2011 - {CURRENT_YEAR}{" "}
                <span className="font-bold text-red-600">ACEDU Boot Camp</span>. All rights reserved.
              </p>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-red-600 transition-colors font-medium">Privacy Policy</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="#" className="hover:text-red-600 transition-colors font-medium">Terms of Service</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="#" className="hover:text-red-600 transition-colors font-medium">Careers</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="#" className="hover:text-red-600 transition-colors font-medium">FAQ</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <a href="#" className="hover:text-red-600 transition-colors font-medium">Blog</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-2 bg-linear-to-r from-red-600 via-red-500 to-red-600"></div>
    </footer>
  );
};

export default Footer;