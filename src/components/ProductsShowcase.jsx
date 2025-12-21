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
            description: "All-in-one school management platform with 21+ modules",
            icon: 'school',
            color: 'bg-gradient-to-br from-blue-50 to-purple-50',
            textColor: 'text-purple-600',
            borderColor: 'border-purple-200',
            stats: {
                schools: cleverSchoolData.successMetrics.schoolsManaged,
                students: cleverSchoolData.successMetrics.studentsServed.toLocaleString()
            }
        },
        ...productsData.slice(0, 2) // Show only 2 other products
    ];

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'school': return <School className="w-5 h-5" />;
            case 'code': return <Code className="w-5 h-5" />;
            case 'globe': return <Globe className="w-5 h-5" />;
            default: return <School className="w-5 h-5" />;
        }
    };

    return (
        <section className="py-12 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-3">
                        <School className="w-3 h-3" />
                        Our Solutions
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        Products & Services
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
                        Comprehensive technology solutions for educational institutions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Clever School - Main Product */}
                    <motion.div
                        key="clever-school"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 flex flex-col justify-around  bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg text-white shrink-0">
                                <School className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <h3 className="md:text-4xl text-xl font-bold text-gray-900">
                                    {featuredProducts[0].fullName}
                                </h3>
                                <p className="text-purple-600 text-sm md:text-md  font-medium mt-1">{featuredProducts[0].tagline}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4 text-sm md:text-2xl">
                            {featuredProducts[0].description}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-white px-3  py-9 rounded-lg text-center border border-purple-100">
                                <div className="text-2xl font-bold text-purple-600">
                                    {featuredProducts[0].stats.schools}+
                                </div>
                                <div className="text-xs text-gray-600">Schools</div>
                            </div>
                            <div className="bg-white px-3  py-9 rounded-lg text-center border border-purple-100">
                                <div className="text-2xl font-bold text-purple-600">
                                    {featuredProducts[0].stats.students}+
                                </div>
                                <div className="text-xs text-gray-600">Students</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                          
                            <button
                                onClick={() => navigate('/products')}
                                className="text-sm flex-1 border border-purple-200 text-purple-600 hover:text-purple-700 font-medium px-3 py-2 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                                Learn more →
                            </button>
                              <a
                                href={cleverSchoolData.product.portalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all  justify-center"
                            >
                                <ExternalLink className="w-3 h-3" />
                                View Portal
                            </a>
                        </div>
                    </motion.div>

                    {/* Other Products */}
                    <div className="space-y-6">
                        {featuredProducts.slice(1).map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                className={`${product.color} rounded-xl p-5 border ${product.borderColor} hover:shadow-lg transition-all duration-300`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg ${product.textColor} bg-white shadow-sm`}>
                                        {getIcon(product.icon)}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="space-y-1.5 mb-4">
                                    {product.benefits?.slice(0, 2).map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                                            <span className="text-xs text-gray-700 line-clamp-1">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/products')}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center py-2 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    Learn more →
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Single CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                >
                    <Button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm md:text-base"
                        onClick={() => navigate('/products')}
                    >
                        <span>View All Products & Services</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-gray-500 mt-3">
                        Custom solutions available for your specific needs
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductsShowcase;