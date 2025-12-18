// src/pages/ProductsPage.jsx
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Code, 
  Globe, 
  School, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import Button from '../components/AppButton';
import { productsData } from '../data/Data';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'graduation-cap': return <GraduationCap className="w-8 h-8" />;
      case 'code': return <Code className="w-8 h-8" />;
      case 'globe': return <Globe className="w-8 h-8" />;
      case 'school': return <School className="w-8 h-8" />;
      default: return <CheckCircle className="w-8 h-8" />;
    }
  };

  const handleGetInTouch = () => {
    navigate('/');
    // Scroll to contact section after navigation
    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image and Gradient */}
      <section className="relative py-16 md:py-40 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-700/80 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ACEDU <span className="text-black">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Comprehensive solutions for education, technology, and school management
            </p>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-10 h-1 bg-red-300"></div>
              <div className="w-4 h-4 border-2 border-red-900 rounded-full"></div>
              <div className="w-10 h-1 bg-red-300"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {productsData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${product.color} rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full`}
              >
                {/* Product Content - Top Part */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${product.textColor} bg-white`}>
                      {getIcon(product.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Full Description */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                      <p className="text-gray-700">{product.fullDescription}</p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {product.benefits?.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reasons to Use */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Why Choose ACEDU</h4>
                      <ul className="space-y-2">
                        {product.reasonsToUse?.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Special Section for Clever School Portal */}
                    {product.name === "Clever School Portal" && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <School className="w-6 h-6 text-purple-600" />
                          <h4 className="text-xl font-bold text-gray-900">Clever School Portal</h4>
                        </div>
                        
                        {/* Features */}
                        <div className="mb-6">
                          <h5 className="font-semibold text-gray-800 mb-3">Features Include:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {product.features?.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Success Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {product.successMetrics?.schoolsManaged}
                            </div>
                            <div className="text-sm text-gray-600">Schools Managed</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {product.successMetrics?.studentsServed.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Students Served</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {product.successMetrics?.successRate}%
                            </div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {product.successMetrics?.satisfactionRate}%
                            </div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                          </div>
                        </div>

                        {/* Managed Schools */}
                        <div className="mb-6">
                          <h5 className="font-semibold text-gray-800 mb-3">Schools We Manage</h5>
                          <div className="space-y-4">
                            {product.managedSchools?.map((school, i) => (
                              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h6 className="font-bold text-gray-900">{school.name}</h6>
                                    <p className="text-sm text-gray-600">{school.type} • {school.location}</p>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="ml-1 font-bold">{school.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 italic mb-2">"{school.testimonial}"</p>
                                <div className="flex flex-wrap gap-2">
                                  {school.improvements?.map((imp, idx) => (
                                    <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                      {imp}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Portal Link */}
                        <a
                          href={product.portalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Visit Clever School Portal
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Image - Bottom Part - Fixed Height */}
                <div className="relative h-64 overflow-hidden mt-auto">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  
                  {/* For Website Development & Management card, add more content below image */}
                  {product.name === "Website Development & Management" && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600/90 to-transparent p-4">
                      <div className="text-white">
                        <h4 className="font-bold text-lg mb-2">Complete Solution</h4>
                        <p className="text-sm text-gray-200">From design to deployment and ongoing maintenance</p>
                        <div className="flex items-center gap-2 mt-2">
                          <CheckCircle className="w-4 h-4 text-green-300" />
                          <span className="text-xs">SEO Optimized</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-300" />
                          <span className="text-xs">Mobile Responsive</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-300" />
                          <span className="text-xs">24/7 Support</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your <span className="text-red-600">Institution</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you need tech education, custom software, or school management solutions, ACEDU has you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-3"
                onClick={handleGetInTouch}
              >
                Get In Touch
              </Button>
              <Button
                className="px-8 py-3 bg-white text-red-600 border border-red-600 hover:bg-red-50"
                onClick={() => window.location.href = '/register'}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;