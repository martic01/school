import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaBook,
    FaChevronRight,
    FaLaptopCode,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/AppButton"; // fixed path
import { coursesData } from "../data/coursesData";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const CoursePage = () => {
    const { id } = useParams(); // /course/:id
    const navigate = useNavigate();
    const contentRef = useRef(null);

    // Helper to find course by id (string-safe)
    const findCourseById = (courseId) =>
        coursesData.find((course) => String(course.id) === String(courseId));

    // Initial selected course from URL param
    const [selectedCourse, setSelectedCourse] = useState(() => {
        if (id) {
            const c = findCourseById(id);
            if (c) return c;
        }
        return coursesData[0];
    });

    // Track URL changes and update selected course
    useEffect(() => {
        if (!id) return;
        const course = findCourseById(id);
        if (course && course.id !== selectedCourse.id) {
            //   setSelectedCourse(course);
        }
    }, [id, selectedCourse.id]);

    const handleCourseChange = (course) => {
        // Only navigate with ID, no state (avoids DataCloneError)
        navigate(`/course/${course.id}`, { replace: true });
        setSelectedCourse(course);
    };

    // Scroll animation effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-slide-in");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll(".course-section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [selectedCourse]);

    // Infinity animations
    useEffect(() => {
        const elements = document.querySelectorAll(".infinity-animate");

        elements.forEach((el, index) => {
            if (!el.style.animation) {
                el.style.animation = `float ${3 + index * 0.5}s infinite ease-in-out`;
            }
        });

        return () => {
            elements.forEach((el) => {
                el.style.animation = "";
            });
        };
    }, [selectedCourse]);

    const handleChatAdvisor = () => {
        alert(`Connecting you to ${selectedCourse.name} advisor...`);
    };

    // Fallback icon if course.icon is not defined in data
    const SelectedIcon = selectedCourse.icon || FaLaptopCode;


    return (
        <>

            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Course Header */}
                <div className="bg-white border border-gray-200 shadow-lg mb-8 relative overflow-hidden">
                    {/* Top BG image strip */}
                    <div
                        className="w-full h-28 md:h-72 relative overflow-hidden"
                        style={{
                            backgroundImage: `url(${selectedCourse.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
                    </div>

                    {/* Existing header content */}
                    <div className="p-6 md:p-8 relative">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                                        <SelectedIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black text-black">
                                            {selectedCourse.name}
                                        </h2>
                                        <p className="text-gray-600">Master the skills that matter</p>
                                    </div>
                                </div>

                                {/* Infinity Animated Element */}
                                <motion.div
                                    animate={{
                                        x: [0, 100, 0],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"
                                    key={`bg-animation-${selectedCourse.id}`}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-red-600">
                                            {selectedCourse.duration}
                                        </div>
                                        <div className="text-sm text-gray-600">Duration</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-black">
                                            {selectedCourse.time}
                                        </div>
                                        <div className="text-sm text-gray-600">Per session</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-black">
                                            {selectedCourse.stages.length}
                                        </div>
                                        <div className="text-sm text-gray-600">Stages</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Layout */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Available Courses */}
                        <div className="lg:w-1/4">
                            <div className="bg-white border border-gray-200 shadow-lg sticky top-24">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-black text-black">
                                        Available Courses
                                    </h3>
                                </div>

                                <div className="p-2">
                                    {coursesData.map((course) => {
                                        const CourseIcon = course.icon || FaLaptopCode;
                                        return (
                                            <motion.button
                                                key={course.id}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleCourseChange(course)}
                                                className={`w-full text-left p-3 mb-1 rounded-none transition-all duration-300 ${selectedCourse.id === course.id
                                                    ? "bg-red-600 text-white border-l-4 border-black"
                                                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <CourseIcon className="w-4 h-4" />
                                                    <span className="font-medium">{course.name}</span>
                                                    {selectedCourse.id === course.id && (
                                                        <FaChevronRight className="w-3 h-3 ml-auto" />
                                                    )}
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Sidebar Stats */}
                                <div className="p-4 border-t border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                        Quick Stats
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Duration</span>
                                                <span className="font-bold text-black">
                                                    {selectedCourse.duration}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-1.5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 1 }}
                                                    className="h-full bg-red-600"
                                                    key={`duration-${selectedCourse.id}`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Time required per week days</span>
                                                <span className="font-bold text-black">
                                                    {selectedCourse.time}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-1.5">
                                                <div
                                                    className="h-full bg-red-600"
                                                    style={{ width: "80%" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {/* Course Header */}

                            {/* Course Details */}
                            <div ref={contentRef} className="space-y-8">
                                {/* Description Section */}
                                <motion.div
                                    key={`desc-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="course-section bg-white border border-gray-200 shadow-lg p-6 md:p-8 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                                    <h3 className="text-xl font-black text-black mb-4 pl-3">
                                        Course Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed pl-3">
                                        {selectedCourse.longDescription}
                                    </p>
                                </motion.div>

                                {/* Stages Section */}
                                <motion.div
                                    key={`stages-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="course-section bg-white border border-gray-200 shadow-lg p-6 md:p-8"
                                >
                                    <h3 className="text-xl font-black text-black mb-6">
                                        Course Stages
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedCourse.stages.map((stage, index) => (
                                            <motion.div
                                                key={`${selectedCourse.id}-stage-${index}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center gap-4 p-4 border border-gray-200 hover:border-red-600 transition-colors group"
                                            >
                                                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-black group-hover:text-red-600 transition-colors">
                                                        {stage}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Complete hands-on projects
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Advice Section */}
                                <motion.div
                                    key={`advice-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="course-section bg-white border border-gray-200 shadow-lg p-6 md:p-8 relative"
                                >
                                    <div className="absolute -top-3 left-6 bg-red-600 text-white px-4 py-1 text-sm font-bold">
                                        Important
                                    </div>
                                    <h3 className="text-xl font-black text-black mb-4">
                                        Course Advice
                                    </h3>
                                    <div className="bg-red-50 border-l-4 border-red-600 p-4">
                                        <p className="text-gray-800">
                                            {selectedCourse.advice || selectedCourse.courseAdvice}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Teaching Approach */}
                                <motion.div
                                    key={`approach-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="course-section bg-white border border-gray-200 shadow-lg p-6 md:p-8"
                                >
                                    <h3 className="text-xl font-black text-black mb-4">
                                        Teaching Approach
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mt-1 shrink-0">
                                                <FaBook className="w-4 h-4 text-white" />
                                            </div>
                                            <p className="text-gray-700">
                                                {selectedCourse.teachingApproach}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Benefits Section */}
                                <motion.div
                                    key={`benefits-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="course-section bg-white border border-gray-200 shadow-lg p-6 md:p-8"
                                >
                                    <h3 className="text-xl font-black text-black mb-4">
                                        Future Benefits
                                    </h3>
                                    <div className="bg-linear-to-r from-red-600/5 to-transparent p-6 border border-red-600/20">
                                        <p className="text-gray-800">
                                            {selectedCourse.benefits ||
                                                selectedCourse.futureBenefit}
                                        </p>

                                        {/* Animated Stats */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                            {[
                                                { label: "Global Demand", value: "95%" },
                                                { label: "Salary Range", value: "$70K-$120K" },
                                                { label: "Growth Rate", value: "22%" },
                                                { label: "Remote Jobs", value: "High" },
                                            ].map((stat, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="text-center p-3 bg-white border border-gray-200"
                                                >
                                                    <div className="text-xl font-black text-red-600 mb-1">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {stat.label}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Chat Advisor Button */}
                                <motion.div
                                    key={`chat-${selectedCourse.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="course-section text-center"
                                >
                                    <Button
                                        onClick={handleChatAdvisor}
                                        className="px-8 py-4 text-lg font-bold rounded-none mx-auto infinity-animate"
                                    >
                                        <span className="flex items-center gap-3">
                                            Chat with {selectedCourse.name} Advisor
                                            <FaChevronRight className="w-5 h-5" />
                                        </span>
                                    </Button>

                                    <p className="text-gray-600 mt-3 text-sm">
                                        Get personalized guidance from our course experts
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Footer />
                </div>
                {/* CSS Animations */}
                <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        .infinity-animate {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
            </div>
        </>
    );

};

export default CoursePage;

