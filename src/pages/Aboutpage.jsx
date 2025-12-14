// src/pages/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { ScanEye } from "lucide-react";
import {
  FaBullseye,
  FaGraduationCap,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";
import Button from "../components/AppButton";
import { aboutContentData } from "../data/Data";

// Use single data array
const aboutContent = [...aboutContentData];

// Build a lookup object by type for easy access
const contentByType = aboutContent.reduce((acc, section) => {
  acc[section.type] = section;
  return acc;
}, {});

// Icons for the 3 goals cards, in order
const goalsIcons = [FaBullseye, FaHandshake, FaRocket];

const AboutPage = () => {
  const heroContent = contentByType.hero;
  const introSection = contentByType.intro;
  const whyBootcampSection = contentByType.whyBootcamp;
  const goalsSection = contentByType.goals;
  const coreValuesSection = contentByType.coreValues;
  const finalCta = contentByType.cta;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url("${heroContent.backgroundImage}")` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            {heroContent.titleMain}{" "}
            <span className="text-red-600">{heroContent.titleHighlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 font-medium"
          >
            {heroContent.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white border border-red-100 shadow-lg rounded-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">
                {introSection.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-red-600">{introSection.highlight}</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                {introSection.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === introSection.paragraphs.length - 1
                        ? "font-semibold text-black"
                        : ""
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Bootcamp Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-black mb-4"
              >
                <span className="text-red-600">Why</span> Bootcamp?
              </motion.h2>
              <div className="w-24 h-1 bg-red-600 mx-auto" />
            </div>

            <div className="bg-white border border-red-100 rounded-xl shadow-lg p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-lg">
                  <FaGraduationCap className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">
                    {whyBootcampSection.question}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {whyBootcampSection.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-black mb-4"
              >
                What We Want to{" "}
                <span className="text-red-600">Achieve</span> With You
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {goalsSection.introText}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {goalsSection.cards.map((goal, idx) => {
                const Icon = goalsIcons[idx] || FaBullseye;
                return (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                    className="bg-red-50 border border-red-200 rounded-xl p-8 text-center shadow-lg"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600 mb-4">
                      {goal.title}
                    </h3>
                    <p className="text-gray-700">{goal.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-black mb-4"
              >
                Our Core <span className="text-red-600">Values</span>
              </motion.h2>
              <div className="w-24 h-1 bg-red-600 mx-auto" />
            </div>

            <div className="bg-white border border-red-100 rounded-xl shadow-lg overflow-hidden">
              {/* DIGITAL Header */}
              <div className="bg-red-900 py-6 px-8">
                <h3 className="text-3xl font-bold text-white text-center tracking-widest">
                  {coreValuesSection.header.acronym}
                </h3>
              </div>

              {/* Values Grid */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {coreValuesSection.values.map((value) => (
                    <div
                      key={value.letter + value.title}
                      className={`space-y-4 ${value.fullWidth
                        ? "md:col-span-2 lg:col-span-3 max-w-2xl mx-auto text-center"
                        : ""
                        }`}
                    >
                      <h4
                        className={`text-2xl font-bold text-red-600 ${value.fullWidth ? "text-center" : ""
                          }`}
                      >
                        <span className="text-black">{value.letter} -</span>{" "}
                        {value.title}
                      </h4>
                      <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
                        <p
                          className={`text-gray-700 italic ${value.fullWidth ? "text-center" : ""
                            }`}
                        >
                          "{value.text}"
                        </p>
                        <p
                          className={`text-black font-semibold mt-2 ${value.fullWidth ? "text-center" : ""
                            }`}
                        >
                          - {value.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-red-950">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              {finalCta.title}
            </motion.h2>
            <p className="text-xl text-red-100 mb-8">{finalCta.text}</p>
            <div className="flex justify-center">
              <a
                href={finalCta.buttonHref}
              >
                <Button 
                 className="bg-white flex gap-2 text-red-600 hover:bg-gray-100 font-bold py-3 px-8  transition duration-300 shadow-lg"
                 >
                  <ScanEye />
                  {finalCta.buttonText}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;