// src/components/ProductsShowcase.jsx
import { motion } from 'framer-motion';
import { ArrowRight, School, Code, Globe, ExternalLink } from 'lucide-react';
import Button from './AppButton';
import { cleverSchoolData, productsData } from '../data/Data'; 
import { useNavigate } from 'react-router-dom';

const ProductsShowcase = () => {
  const navigate = useNavigate();
  
  // Show Clever School as featured and other products
  const featuredProducts = [
    {
      id: 'clever-school',
      name: cleverSchoolData.product.shortName,
      fullName: cleverSchoolData.product.name,
      tagline: cleverSchoolData.product.tagline,
      description: cleverSchoolData.product.description,
      features: cleverSchoolData.features.slice(0, 3),
      icon: 'school',
      color: 'bg-gradient-to-br from-blue-50 to-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      isMain: true,
      stats: {
        schools: cleverSchoolData.successMetrics.schoolsManaged,
        students: cleverSchoolData.successMetrics.studentsServed.toLocaleString()
      }
    },
    ...productsData.slice(0, 2) // Show only 2 other products
  ];

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'school': return <School className="w-6 h-6" />;
      case 'code': return <Code className="w-6 h-6" />;
      case 'globe': return <Globe className="w-6 h-6" />;
      default: return <School className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <School className="w-4 h-4" />
            Our Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Products & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions for educational institutions and businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8 mb-12">
          {/* Clever School - Main Product (Full Width on mobile, first on desktop) */}
          <motion.div
            key="clever-school"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Content */}
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl text-white">
                    <School className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {featuredProducts[0].fullName}
                    </h3>
                    <p className="text-purple-600 font-medium">{featuredProducts[0].tagline}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {featuredProducts[0].description}
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl text-center border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {featuredProducts[0].stats.schools}+
                    </div>
                    <div className="text-sm text-gray-600">Schools Managed</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {featuredProducts[0].stats.students}+
                    </div>
                    <div className="text-sm text-gray-600">Students Served</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-800 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {featuredProducts[0].features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/70 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={cleverSchoolData.product.portalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Portal
                  </a>
                  <Button
                    className="bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50"
                    onClick={() => navigate('/products')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/3">
                <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
                  <img
                    src={cleverSchoolData.product.image}
                    alt={featuredProducts[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm font-bold text-gray-900">Trusted by schools nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Products Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {featuredProducts.slice(1).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                className={`${product.color} rounded-2xl p-6 border ${product.borderColor} hover:shadow-xl transition-all duration-300 h-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${product.textColor} bg-white shadow-sm`}>
                    {getIcon(product.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2 mb-6">
                  {product.benefits?.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="h-40 mb-4 rounded-lg overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  onClick={() => navigate('/products')}
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We specialize in creating tailored software solutions for your specific needs. Whether it's a school management system, custom business software, or web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => navigate('/products')}
                icon="arrow-right"
              >
                <span>Explore All Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50"
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsShowcase;