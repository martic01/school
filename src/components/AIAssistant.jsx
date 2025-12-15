// src/components/AIAssistant.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaUser,
  FaSpinner,
  FaGraduationCap,
  FaMap,
  FaPause,
  FaArrowDown,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './AppButton';
import { getFakeAssistantResponse, getCurrentTutorState, updateTutorScrollProgress } from '../ai/fakeAssistant';
import { LIVE_AI_ENABLED, callLiveAssistant } from '../ai/liveAssistant';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm Acedu AI. How can I help you with courses, enrollment, or coding questions?\n\n💡 **Tip:** Say 'SHOW ME AROUND' for a guided tour of Acedu!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(LIVE_AI_ENABLED);
  
  // Tutor state - MIRRORS localStorage, doesn't control it
  const [tutorState, setTutorState] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const messagesEndRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync tutor state from localStorage on mount and location change
  useEffect(() => {
    const syncTutorState = () => {
      const state = getCurrentTutorState();
      setTutorState(state);
      if (state?.active && state.isAutoScrolling) {
        setIsAutoScrolling(true);
        setScrollProgress(state.scrollProgress || 0);
      } else {
        setIsAutoScrolling(false);
      }
    };
    
    syncTutorState();
    
    // Also sync when location changes
    const interval = setInterval(syncTutorState, 1000);
    
    return () => {
      clearInterval(interval);
      stopAutoScroll();
    };
  }, [location]);

  // Clean auto-scroll logic
  const startAutoScroll = useCallback(() => {
    stopAutoScroll(); // Clear any existing
    
    const scrollStep = 20;
    const scrollDelay = 100;
    
    autoScrollIntervalRef.current = setInterval(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll <= 0) {
        stopAutoScroll();
        return;
      }
      
      const currentScroll = window.scrollY;
      const nextScroll = currentScroll + scrollStep;
      
      // If we're near the bottom, stop
      if (nextScroll >= maxScroll - 5) {
        window.scrollTo({ top: maxScroll, behavior: 'smooth' });
        setScrollProgress(100);
        updateTutorScrollProgress(100);
        stopAutoScroll();
        return;
      }
      
      // Smooth scroll
      window.scrollTo({
        top: nextScroll,
        behavior: 'smooth'
      });
      
      // Calculate real progress
      const progress = Math.min(100, Math.round((nextScroll / maxScroll) * 100));
      setScrollProgress(progress);
      updateTutorScrollProgress(progress);
      
    }, scrollDelay);
    
    setIsAutoScrolling(true);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  }, []);

  // Helper function to scroll to a section
  const scrollToSection = useCallback((sectionId) => {
    if (!sectionId) return false;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      return true;
    }
    
    // If not found immediately, try again after delays
    const attempts = [300, 500, 1000, 1500];
    for (let i = 0; i < attempts.length; i++) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, attempts[i]);
    }
    
    return false;
  }, []);

  // Handle tutor response with improved navigation and scrolling
  const handleTutorResponse = useCallback((response) => {
    if (!response) return;
    
    // Add AI response to chat
    setMessages((prev) => [...prev, { role: 'assistant', content: response.text }]);
    
    // Handle navigation if needed
    if (response.navigateTo) {
      const currentPath = window.location.pathname;
      const targetPath = response.navigateTo;
      
      if (currentPath === targetPath) {
        // We're already on the page, just scroll to section
        if (response.scrollToSectionId) {
          setTimeout(() => {
            scrollToSection(response.scrollToSectionId);
          }, 300);
        }
      } else {
        // Navigate to different page
        navigate(response.navigateTo);
        
        // After navigation, scroll to section if needed
        if (response.scrollToSectionId) {
          setTimeout(() => {
            scrollToSection(response.scrollToSectionId);
          }, 1000);
        }
      }
      
      // Start auto-scroll if needed (for tutor mode)
      if (response.autoScroll) {
        setTimeout(() => {
          startAutoScroll();
        }, currentPath === targetPath ? 500 : 1500);
      }
    } else if (response.scrollToSectionId) {
      // If no navigation but we need to scroll on current page
      setTimeout(() => {
        scrollToSection(response.scrollToSectionId);
      }, 300);
    }
    
    // Stop auto-scroll if tutor is stopping
    if (response.stopTutor) {
      stopAutoScroll();
    }
  }, [navigate, startAutoScroll, stopAutoScroll, scrollToSection]);

  // Main submit handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if this is a tutor command first
      const response = getFakeAssistantResponse(input);
      
      // Add slight delay for better UX
      setTimeout(() => {
        handleTutorResponse(response);
        setIsLoading(false);
      }, 300);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
      setIsLoading(false);
    }
  };

  // Quick actions for tutor buttons
  const handleTutorAction = useCallback((action) => {
    setInput(action);
    // Process immediately without waiting for form
    const response = getFakeAssistantResponse(action);
    handleTutorResponse(response);
  }, [handleTutorResponse]);

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm Acedu AI. How can I help you today?",
      },
    ]);
    stopAutoScroll();
    setInput('');
  };

  const quickQuestions = [
    'Courses offered?',
    'React course price?',
    'Bootcamp duration?',
    'SHOW ME AROUND',
    'Scholarships available?',
    'Prerequisites?',
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600/90 backdrop-blur-sm text-white rounded-full shadow-xl hover:bg-red-700/90 transition-all duration-300 shadow-red-600/30 flex items-center gap-2 pl-3 pr-4 py-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Acedu AI Assistant"
      >
        <div className="relative">
          <FaRobot className="w-5 h-5" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        </div>
        <span className="text-sm font-medium">Acedu AI</span>
        {tutorState?.active && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
        )}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-red-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-red-900/95 text-white p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <FaRobot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Acedu AI Assistant</h3>
                      <p className="text-xs opacity-90">
                        {LIVE_AI_ENABLED && backendAvailable
                          ? 'Powered by DeepSeek AI'
                          : 'Acedu Smart Guide'}
                        {tutorState?.active && ' • Tutor Active'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-1 rounded transition-colors"
                    aria-label="Close chat"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Tutor Status Bar - Only shows when tutor is active */}
                {tutorState?.active && (
                  <div className="mt-2 bg-red-800/50 p-1.5 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <FaMap className="w-3 h-3 text-yellow-300" />
                        <span className="text-xs font-medium">
                          Tour: {['home', 'about', 'course', 'project', 'AIpage', 'Enroll'][tutorState.currentPage]?.toUpperCase() || 'Starting...'}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {isAutoScrolling ? (
                          <button
                            onClick={() => handleTutorAction('stop')}
                            className="flex items-center gap-1 px-2 py-0.5 bg-red-700 hover:bg-red-600 rounded text-xs"
                          >
                            <FaPause className="w-2.5 h-2.5" />
                            Pause
                          </button>
                        ) : (
                          <button
                            onClick={() => handleTutorAction('continue tutor')}
                            className="flex items-center gap-1 px-2 py-0.5 bg-green-700 hover:bg-green-600 rounded text-xs"
                          >
                            <FaArrowDown className="w-2.5 h-2.5" />
                            Resume
                          </button>
                        )}
                        <button
                          onClick={() => handleTutorAction('next')}
                          className="px-2 py-0.5 bg-blue-700 hover:bg-blue-600 rounded text-xs"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                    {isAutoScrolling && (
                      <div className="w-full bg-red-900/50 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${scrollProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="h-64 sm:h-72 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-2.5 ${
                        message.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div
                          className={`p-1 rounded ${
                            message.role === 'user' ? 'bg-white/20' : 'bg-red-100'
                          }`}
                        >
                          {message.role === 'user' ? (
                            <FaUser className="w-2.5 h-2.5" />
                          ) : (
                            <FaGraduationCap className="w-2.5 h-2.5 text-red-600" />
                          )}
                        </div>
                        <span className="text-xs font-semibold">
                          {message.role === 'user' ? 'You' : 'Acedu AI'}
                        </span>
                      </div>
                      <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-lg p-2.5 rounded-bl-sm shadow-xs max-w-[85%]">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="p-1 rounded bg-red-100">
                          <FaGraduationCap className="w-2.5 h-2.5 text-red-600" />
                        </div>
                        <span className="text-xs font-semibold">Acedu AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSpinner className="w-2.5 h-2.5 animate-spin text-red-600" />
                        <p className="text-xs">
                          {tutorState?.active 
                            ? (isAutoScrolling ? 'Auto-scrolling...' : 'Processing...') 
                            : 'Thinking...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 2 && (
                <div className="px-3 pt-1.5 pb-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1.5">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-colors border ${
                          question === 'SHOW ME AROUND'
                            ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200 font-medium'
                            : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tutorState?.active ? "Type commands like 'next' or 'stop'..." : "Ask about Acedu..."}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-3 py-2 min-w-[40px]"
                  >
                    {isLoading ? (
                      <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FaPaperPlane className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="text-xs text-gray-500 hover:text-red-600"
                  >
                    Clear Chat
                  </button>
                  <div className="flex items-center gap-1.5">
                    {tutorState?.active ? (
                      <span className="text-xs text-yellow-600 font-medium flex items-center gap-1">
                        <FaMap className="w-3 h-3" />
                        {isAutoScrolling ? 'Auto-Scrolling' : 'Tour Mode'}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        {LIVE_AI_ENABLED && backendAvailable ? 'Live AI' : 'Smart Guide'}
                      </span>
                    )}
                    <div
                      className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        tutorState?.active 
                          ? (isAutoScrolling ? 'bg-yellow-500' : 'bg-yellow-300')
                          : LIVE_AI_ENABLED && backendAvailable 
                            ? 'bg-green-500' 
                            : 'bg-blue-500'
                      }`}
                    ></div>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;