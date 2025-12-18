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
  ExternalLink
} from 'lucide-react';
import Button from '../components/AppButton';
import { productsData,cleverSchoolData } from '../data/Data';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    switch(iconName) {
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
    if (moduleName.includes('Notification')) return <Bell className="w-5 h-5" />;
    if (moduleName.includes('Result')) return <TrendingUp className="w-5 h-5" />;
    if (moduleName.includes('Security')) return <Shield className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Clever School Focus */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${cleverSchoolData.product.heroImage})`,
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {cleverSchoolData.product.name}
            </h1>
            
            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-blue-300 mb-8 font-light max-w-4xl mx-auto">
              {cleverSchoolData.product.tagline}
            </p>

            {/* Challenge Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm px-8 py-3 rounded-full mb-12 border border-white/20"
            >
              <h2 className="text-xl md:text-2xl font-bold">
                {cleverSchoolData.product.question}
              </h2>
            </motion.div>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {cleverSchoolData.valueProps.map((prop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <div className="text-3xl mb-4">✨</div>
                  <h3 className="text-lg font-bold">{prop}</h3>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl shadow-blue-600/30"
              >
                <School className="w-6 h-6" />
                View Live Portal
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              
              <motion.button
                onClick={handleGetInTouch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 border-2 border-white/30"
              >
                <Phone className="w-5 h-5" />
                Request Demo
              </motion.button>
            </div>

            {/* Success Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {Object.entries(cleverSchoolData.successMetrics).map(([key, value], index) => (
                <div key={key} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {value}{key.includes('Rate') ? '%' : key.includes('studentsServed') ? '+' : ''}
                  </div>
                  <div className="text-sm text-blue-200 uppercase tracking-wider font-medium">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-6">
                <School className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-purple-700">MAIN PRODUCT</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Complete School Management Solution
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {cleverSchoolData.product.fullDescription}
              </p>

              {/* Target Users */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Built For:</h3>
                <div className="flex flex-wrap gap-3">
                  {cleverSchoolData.targetUsers.map((user, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full font-medium border border-blue-100"
                    >
                      {user}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cleverSchoolData.benefitsToSchools.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
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
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <Settings className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">21 Powerful Modules</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {cleverSchoolData.modules.slice(0, 8).map((module, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                        {getModuleIcon(module)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{module}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-200">
                <p className="text-gray-600 text-center">
                  Plus {cleverSchoolData.modules.length - 8} more modules
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Managed Schools Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-bold mb-4">
              TRUSTED PARTNERS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Schools We Manage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we're transforming educational institutions across Nigeria
            </p>
          </motion.div>

          {/* School Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {cleverSchoolData.managedSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{school.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                            {school.type}
                          </span>
                          <span className="text-white/80 text-sm">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {school.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{school.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <blockquote className="text-gray-700 text-lg italic mb-6 border-l-4 border-blue-500 pl-4">
                    "{school.testimonial}"
                  </blockquote>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Key Improvements:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {school.improvements.map((improvement, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 rounded-full text-sm font-medium border border-green-100"
                        >
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {school.yearsActive} years with us
                    </div>
                    <Award className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-2">Transforming Education Together</h3>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Join the growing list of institutions that trust CleverSchools.NET for their management needs
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">{cleverSchoolData.successMetrics.schoolsManaged}+</div>
                <div className="text-blue-200">Schools Managed</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{cleverSchoolData.successMetrics.studentsServed.toLocaleString()}+</div>
                <div className="text-blue-200">Students Served</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{cleverSchoolData.successMetrics.successRate}%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{cleverSchoolData.successMetrics.satisfactionRate}%</div>
                <div className="text-blue-200">Satisfaction Rate</div>
              </div>
            </div>
            
            <div className="mt-8">
              <a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-bold text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Explore CleverSchools Portal
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full text-sm font-bold mb-4">
              OTHER SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Additional Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond school management, we offer other technology solutions
            </p>
          </motion.div>

          {/* Other Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${product.textColor} bg-white shadow-sm`}>
                      {getIcon(product.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{product.description}</p>

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleGetInTouch}
                    className={`w-full bg-gradient-to-r ${product.bgColor} hover:opacity-90 text-white border-0`}
                  >
                    {product.ctaText}
                  </Button>
                </div>

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Digitize Your School?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of schools already using CleverSchools.NET to streamline their operations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={cleverSchoolData.product.portalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl"
              >
                <School className="w-6 h-6" />
                Visit Portal
                <ExternalLink className="w-5 h-5" />
              </a>
              
              <Button
                className="px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 border-0 font-bold text-lg"
                onClick={handleGetInTouch}
              >
                Get Free Consultation
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-400">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5" />
                  <span>{cleverSchoolData.company.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>{cleverSchoolData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
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