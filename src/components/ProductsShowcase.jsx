// src/components/ProductsShowcase.jsx
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Code, Globe, School } from 'lucide-react';
import Button from './AppButton';
import { productsData } from '../data/Data'; 
import { useNavigate } from 'react-router-dom';

const ProductsShowcase = () => {
  const navigate = useNavigate();
  const featuredProducts = productsData.slice(0, 3);

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'graduation-cap': return <GraduationCap className="w-6 h-6" />;
      case 'code': return <Code className="w-6 h-6" />;
      case 'globe': return <Globe className="w-6 h-6" />;
      case 'school': return <School className="w-6 h-6" />;
      default: return <GraduationCap className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl f1 cent items-center justify-self-center py-4 md:text-4xl font-bold flex justify-center gap-2.5 text-black mb-4">
           Products & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beyond education - we provide comprehensive tech solutions for individuals and institutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${product.color} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${product.textColor} bg-white`}>
                  {getIcon(product.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="space-y-2 mb-6">
                {product.benefits?.slice(0, 3).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" />
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            className="px-8 py-3"
            onClick={() => navigate('/products')}
            icon="arrow-right"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsShowcase;