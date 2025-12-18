// src/pages/ProductsPage.jsx
import { motion } from 'framer-motion';
import {
  School,
  Users,
  Settings,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  CreditCard,
  Award,
  TrendingUp,
  Shield,
  Globe,
  Code,
  Building,
  Phone,
  Mail,
  ExternalLink,
  GraduationCap,
  Clock,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/AppButton';
import { cleverSchoolData, productsData } from '../data/Data';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'school': return <School className="w-8 h-8" />;
      case 'code': return <Code className="w-8 h-8" />;
      case 'globe': return <Globe className="w-8 h-8" />;
      default: return <CheckCircle className="w-8 h-8" />;
    }
  };

  const handleGetInTouch = () => {
    navigate('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1400);
  };

  const getModuleIcon = (moduleName) => {
    if (moduleName.includes('Staff')) return <Users className="w-5 h-5" />;
    if (moduleName.includes('Lesson')) return <BookOpen className="w-5 h-5" />;
    if (moduleName.includes('Test')) return <Settings className="w-5 h-5" />;
    if (moduleName.includes('Fees')) return <CreditCard className="w-5 h-5" />;
    if (moduleName.includes('Attendance')) return <Calendar className="w-5 h-5" />;
    if (moduleName.includes('Notification')) return <Clock className="w-5 h-5" />;
    if (moduleName.includes('Result')) return <TrendingUp className="w-5 h-5" />;
    if (moduleName.includes('Security')) return <ShieldCheck className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section - Clever School Focus */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center py-43"
        style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('${cleverSchoolData.product.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8"
            >
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">{cleverSchoolData.company.name}</span>
              <span className="text-xs opacity-75">RC: {cleverSchoolData.company.rc}</span>
            </motion.div>

            {/* Main Product Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent px-2">
              {cleverSchoolData.product.name}
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-300 mb-8 font-light max-w-4xl mx-auto px-4">
              {cleverSchoolData.product.tagline}
            </p>

            {/* Challenge Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-linear-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-full mb-8 sm:mb-12 border border-white/20"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold px-2">
                {cleverSchoolData.product.question}
              </h2>
            </motion.div>

          
          {/* Value Propositions - 2x2 on mobile, 4 in row on desktop */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto mb-10 sm:mb-12 px-4">
  {cleverSchoolData.valueProps.map((prop, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="text-2xl sm:text-3xl mb-3">✨</div>
        <h3 className="text-sm sm:text-base font-bold whitespace-normal break-words leading-tight">
          {prop}
        </h3>
      </div>
    </motion.div>
  ))}
</div>

            {/* CTA Buttons */}
            <div className="flex  sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-16 px-4">
              <motion.a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-3 shadow-2xl shadow-blue-600/30 w-full sm:w-auto justify-center"
              >
                <School className="w-5 h-5 sm:w-6 sm:h-6" />
                Portal
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>

              <motion.a
                href={cleverSchoolData.contact.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-3 border-2 border-white/30 w-full sm:w-auto justify-center"
              >
                <Phone className="w-5 h-5" />
                Enquiries
              </motion.a>
            </div>

            {/* Success Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
            >
              {Object.entries(cleverSchoolData.successMetrics).map(([key, value], index) => (
                <div key={key} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                    {value}{key.includes('Rate') ? '%' : key.includes('studentsServed') ? '+' : ''}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200 uppercase tracking-wider font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* About Clever School */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="px-2 sm:px-0"
            >
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <School className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="text-xs sm:text-sm font-bold text-purple-700">MAIN PRODUCT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Complete School Management Solution
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {cleverSchoolData.product.fullDescription}
              </p>

              {/* Target Users */}
              <div className="mb-6 sm:mb-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Built For:</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {cleverSchoolData.targetUsers.map((user, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium border border-blue-100 whitespace-nowrap"
                    >
                      {user}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Key Benefits:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {cleverSchoolData.benefitsToSchools.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Modules Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">21 Powerful Modules</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {cleverSchoolData.modules.slice(0, 8).map((module, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex-shrink-0">
                        {getModuleIcon(module)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800 break-words">
                        {module}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-200">
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Plus {cleverSchoolData.modules.length - 8} more modules
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     {/* All Modules Section - 3x3 on smaller screens */}
<section className="py-10 sm:py-14 md:py-16 bg-linear-to-b from-white to-blue-50">
  <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-6 sm:mb-10"
    >
      <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3">
        21 Powerful Modules
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Everything Your School Needs
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto px-2">
        Comprehensive modules covering every aspect of school management
      </p>
    </motion.div>

    {/* Grid: 3 columns on mobile, 4 on tablet, 5 on desktop */}
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 px-1">
      {cleverSchoolData.modules.map((module, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-white p-2 sm:p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all duration-150 min-w-0"
        >
          <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
            <div className="p-1.5 sm:p-2 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg text-blue-600">
              {getModuleIcon(module)}
            </div>
            <span className="text-[10px] xs:text-xs sm:text-xs font-medium text-gray-800 break-all leading-tight line-clamp-2">
              {module}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Managed Schools & Reviews */}
      <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Trusted By Schools
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Schools We Manage
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              See how we're transforming educational institutions across Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
            {cleverSchoolData.managedSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-blue-100"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                      {school.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
                        {school.type}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        {school.location}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {school.yearsActive} years
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <span className="text-lg sm:text-xl font-bold text-gray-900">{school.rating}</span>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-gray-700 italic mb-4 sm:mb-6 border-l-3 sm:border-l-4 border-blue-500 pl-3 sm:pl-4">
                  "{school.testimonial}"
                </blockquote>

                <div>
                  <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Key Improvements:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {school.improvements.map((improvement, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-linear-to-r from-green-50 to-blue-50 text-green-700 rounded-full text-xs sm:text-sm font-medium border border-green-100"
                      >
                        {improvement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Metrics - Fixed responsive text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white mx-2 sm:mx-0"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-8 px-2 sm:px-0">
              Transforming Education Together
            </h3>
            <p className="text-sm sm:text-base text-blue-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
              Join the growing list of institutions that trust CleverSchools.NET for their management needs
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {cleverSchoolData.successMetrics.schoolsManaged}+
                </div>
                <div className="text-xs sm:text-sm text-blue-200">Schools Managed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {cleverSchoolData.successMetrics.studentsServed.toLocaleString()}+
                </div>
                <div className="text-xs sm:text-sm text-blue-200">Students Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {cleverSchoolData.successMetrics.successRate}%
                </div>
                <div className="text-xs sm:text-sm text-blue-200">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {cleverSchoolData.successMetrics.satisfactionRate}%
                </div>
                <div className="text-xs sm:text-sm text-blue-200">Satisfaction Rate</div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="whitespace-nowrap">Explore Portal</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Products Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-linear-to-r from-gray-600 to-gray-800 text-white rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              OTHER SERVICES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Additional Solutions
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
              Beyond school management, we offer other technology solutions
            </p>
          </motion.div>

          {/* Other Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0">
            {productsData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`${product.color} rounded-2xl overflow-hidden border ${product.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                {/* Product Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 rounded-lg ${product.textColor} bg-white shadow-sm`}>
                      {getIcon(product.icon)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{product.description}</p>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Key Features:</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleGetInTouch}
                    className={`w-full bg-linear-to-r ${product.bgColor} hover:opacity-90 text-white border-0 text-sm sm:text-base`}
                  >
                    {product.ctaText}
                  </Button>
                </div>

                {/* Product Image */}
                <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
              Ready to Digitize Your School?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
              Join hundreds of schools already using CleverSchools.NET to streamline their operations
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all shadow-2xl w-full sm:w-auto justify-center"
              >
                <School className="w-5 h-5 sm:w-6 sm:h-6" />
                Visit Portal
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <Button
                className="px-6 sm:px-8 md:px-10 py-3 bg-white text-gray-900 hover:bg-gray-100 border-0 font-bold text-sm sm:text-base md:text-lg w-full sm:w-auto"
                onClick={handleGetInTouch}
              >
                Get Free Consultation
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-center sm:text-left">{cleverSchoolData.company.address}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{cleverSchoolData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{cleverSchoolData.contact.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;