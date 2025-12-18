// src/pages/HostelPage.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Home, 
  Wifi, 
  Shield, 
  Users, 
  MapPin, 
  BookOpen,
  Volume2,
  Star,
  CheckCircle,
  VolumeX
} from 'lucide-react';
import Button from '../components/AppButton';
import { hostelData } from '../data/Data';

const HostelPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const sectionRefs = useRef([]);
  const speechRef = useRef(null);
  const isTourActiveRef = useRef(false);

  // Initialize speech synthesis and load voices
  useEffect(() => {
    speechRef.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const voices = speechRef.current.getVoices();
      setAvailableVoices(voices);
      
      // Try to find a female voice
      const femaleVoices = voices.filter(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('samantha') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('google uk english female') ||
        voice.name.toLowerCase().includes('microsoft zira') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('ava') ||
        voice.name.toLowerCase().includes('tessa')
      );
      
      if (femaleVoices.length > 0) {
        // Prefer female voices
        setSelectedVoice(femaleVoices[0]);
      } else if (voices.length > 0) {
        // Fallback to any available voice
        setSelectedVoice(voices[0]);
      }
    };
    
    // Load voices when they become available
    if (speechRef.current.getVoices().length > 0) {
      loadVoices();
    } else {
      speechRef.current.addEventListener('voiceschanged', loadVoices);
    }
    
    // Load state from localStorage
    const savedState = localStorage.getItem('hostelTourState');
    if (savedState) {
      try {
        const { section, progress: savedProgress } = JSON.parse(savedState);
        setCurrentSection(section || 0);
        setProgress(savedProgress || 0);
        // Don't auto-play when loading from storage
        setIsPlaying(false);
        isTourActiveRef.current = false;
      } catch (error) {
        console.error('Error loading tour state:', error);
      }
    }

    // Cleanup function
    return () => {
      stopTour();
      if (speechRef.current) {
        speechRef.current.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  // Stop speech on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTour();
      }
    };

    // Stop speech before page unload
    const handleBeforeUnload = () => {
      stopTour();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopTour();
    };
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const state = { section: currentSection, progress };
    localStorage.setItem('hostelTourState', JSON.stringify(state));
  }, [currentSection, progress]);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    setCurrentSection(index);
    setProgress((index / (hostelData.sections.length - 1)) * 100);
  };

  const playSection = (index) => {
    const section = hostelData.sections[index];
    if (!section || !isTourActiveRef.current) return;

    scrollToSection(index);

    const textToSpeak = `${section.title}. ${section.description}. ${section.features ? 'Features include: ' + section.features.join(', ') : ''}`;

    // Cancel any ongoing speech
    if (speechRef.current && speechRef.current.speaking) {
      speechRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice settings for female-like voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Adjust voice parameters for better female voice
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Higher pitch for female voice
    utterance.volume = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      
      // Only proceed to next section if tour is still active
      if (!isTourActiveRef.current) return;

      const nextIndex = index + 1;
      if (nextIndex < hostelData.sections.length) {
        // Small delay before next section for better UX
        setTimeout(() => {
          if (isTourActiveRef.current) {
            playSection(nextIndex);
          }
        }, 1000);
      } else {
        // Tour completed
        stopTour();
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      stopTour();
    };

    try {
      speechRef.current.speak(utterance);
    } catch (error) {
      console.error('Failed to speak:', error);
      stopTour();
    }
  };

  const startTour = () => {
    if (isPlaying || isTourActiveRef.current) return;

    isTourActiveRef.current = true;
    setIsPlaying(true);
    playSection(currentSection);
  };

  const pauseTour = () => {
    if (speechRef.current) {
      speechRef.current.pause();
    }
    isTourActiveRef.current = false;
    setIsPlaying(false);
  };

  const stopTour = () => {
    isTourActiveRef.current = false;
    setIsPlaying(false);
    setIsSpeaking(false);

    if (speechRef.current) {
      if (speechRef.current.speaking) {
        speechRef.current.cancel();
      }
      if (speechRef.current.paused) {
        speechRef.current.cancel();
      }
    }
  };

  const resetTour = () => {
    stopTour();
    setCurrentSection(0);
    setProgress(0);
    scrollToSection(0);
    localStorage.removeItem('hostelTourState');
  };

  const getSectionIcon = (title) => {
    if (title.includes('Welcome')) return <Home className="w-6 h-6" />;
    if (title.includes('Accommodation')) return <Home className="w-6 h-6" />;
    if (title.includes('Study')) return <BookOpen className="w-6 h-6" />;
    if (title.includes('Amenities')) return <Wifi className="w-6 h-6" />;
    if (title.includes('Security')) return <Shield className="w-6 h-6" />;
    if (title.includes('Community')) return <Users className="w-6 h-6" />;
    if (title.includes('Location')) return <MapPin className="w-6 h-6" />;
    return <Home className="w-6 h-6" />;
  };

  // Function to manually select a voice
  const selectFemaleVoice = () => {
    const voices = speechRef.current?.getVoices() || [];
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('samantha') || 
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('google uk english female') ||
      voice.name.toLowerCase().includes('microsoft zira') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('ava') ||
      voice.name.toLowerCase().includes('tessa')
    );
    
    if (femaleVoices.length > 0) {
      setSelectedVoice(femaleVoices[0]);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 relative overflow-hidden">
      {/* Conic linear Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Fixed Play Button - Redesigned */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-24 z-40 md:left-6 md:top-32"
      >
        <div className="flex flex-col gap-2">
          <motion.button
            onClick={isPlaying ? pauseTour : startTour}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isPlaying 
                ? 'bg-black border-2 border-red-500 hover:bg-gray-900' 
                : 'bg-black border-2 border-red-600 hover:bg-gray-900'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glowing effect when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
            
            {/* Pulsing dot when speaking */}
            {isSpeaking && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            )}
            
            {isPlaying ? (
              <Pause className="w-6 h-6 text-red-400" />
            ) : (
              <Play className="w-6 h-6 text-red-400 ml-0.5" />
            )}
          </motion.button>

          {/* Voice Status Indicator */}
          <AnimatePresence>
            {selectedVoice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className= "bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-red-100"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-red-600" />
                    <span className="text-xs text-gray-700 font-medium">
                        <p>Let Zara give you a tour...</p>
                    </span>
                  </div>
                  {!selectedVoice.name.toLowerCase().includes('female') && (
                    <button
                      onClick={selectFemaleVoice}
                      className="hidden text-xs text-red-600 hover:text-red-700 font-medium px-1"
                      title="Try to find female voice"
                    >
                      Try Female
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mt-4 bg-white/7 backdrop-blur-sm  p-4 shadow-2xl w-64 border-2 border-red-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">
                  Section {currentSection + 1} of {hostelData.sections.length}
                </span>
                <div className="flex items-center gap-1">
                  {isSpeaking && (
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                  <span className="text-sm font-bold text-red-600">{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-linear-to-r from-red-500 to-red-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600 font-medium truncate mr-2">
                  {hostelData.sections[currentSection]?.title}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={pauseTour}
                    className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded"
                  >
                    Pause
                  </button>
                  <button
                    onClick={resetTour}
                    className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Voice Selection Panel (Collapsible) */}
      <AnimatePresence>
        {availableVoices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" hidden fixed right-4 top-24 z-30 md:right-6 md:top-32"
          >
            <div className= "bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-red-100 max-w-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">Voice Settings</h3>
                <button
                  onClick={selectFemaleVoice}
                  className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded"
                >
                  👩 Female
                </button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {availableVoices.slice(0, 5).map((voice, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVoice(voice)}
                    className={`w-full text-left p-2 rounded text-xs transition-colors ${
                      selectedVoice?.name === voice.name
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {voice.name.toLowerCase().includes('female') ? '👩' : '👤'}
                      <span className="truncate">
                        {voice.name.replace('Microsoft ', '').replace('Google ', '')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedVoice && (
                <div className="mt-3 pt-3 border-t border-red-100">
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Selected: </span>
                    <span className="text-red-600">{selectedVoice.name}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            <div className="inline-block mb-6">
              <div className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold mb-4 inline-block">
                ACEDU Student Hostel
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Home Away From <span className="text-red-600">Home</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              {hostelData.overview.description}
            </p>
            
            {/* Voice Guide Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full"
            >
              <Volume2 className="w-4 h-4 text-red-600" />
              <span className="text-sm text-gray-700 font-medium">
                Audio tour available with female voice narration
              </span>
            </motion.div>
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white mt-8"
          >
            <img
              src={hostelData.overview.mainImage}
              alt="ACEDU Hostel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
            
            {/* Floating elements on image */}
            <motion.div
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-gray-800">High-speed WiFi</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-gray-800">24/7 Security</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rest of the component remains the same... */}
      {/* Tour Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {hostelData.sections.map((section, index) => (
          <motion.section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mb-16 p-6 md:p-8 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
              currentSection === index 
                ? 'bg-white/95 shadow-2xl border-4 border-red-300' 
                : 'bg-white/90 shadow-xl border-2 border-red-100'
            }`}
          >
            {/* Current section indicator */}
            {currentSection === index && isPlaying && (
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Volume2 className="w-3 h-3 text-white" />
              </motion.div>
            )}
            
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Content */}
              <div className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl shadow-lg ${
                    currentSection === index 
                      ? 'bg-linear-to-br from-red-500 to-red-600 text-white' 
                      : 'bg-linear-to-br from-red-100 to-red-200'
                  }`}>
                    {getSectionIcon(section.title)}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                    {currentSection === index && isPlaying && (
                      <motion.div
                        className="text-sm text-red-600 font-medium mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          Now Playing
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{section.description}</p>

                {section.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {section.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 bg-linear-to-r from-red-50 to-white p-3 rounded-lg border border-red-100"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border-2 border-white"
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  
                  {/* Image overlay with section title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{section.title}</h3>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Benefits Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-2 bg-red-600 text-white rounded-full text-sm font-bold mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience the <span className="text-red-600">ACEDU Advantage</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostelData.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-red-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-linear-to-br from-red-100 to-red-200 rounded-xl mb-4">
                    <Star className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-white to-red-50 rounded-3xl p-8 shadow-2xl border-2 border-red-200"
          >
            <div className="inline-block px-6 py-2 bg-red-600 text-white rounded-full text-sm font-bold mb-6">
              Book Now & Save
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Affordable <span className="text-red-600">Living</span> Options
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose the perfect accommodation for your learning journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 border-2 border-red-200 rounded-2xl bg-white hover:border-red-300 transition-all"
              >
                <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">Shared Room</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">{hostelData.pricing.sharedRoom}</div>
                <p className="text-gray-600 mb-6">Perfect for making friends and saving costs</p>
                <div className="flex flex-col items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">2-3 students per room</span>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 border-2 border-red-600 rounded-2xl bg-linear-to-br from-red-50 to-white hover:border-red-700 transition-all relative"
              >
                <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Premium
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">Private Room</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">{hostelData.pricing.privateRoom}</div>
                <p className="text-gray-600 mb-6">Enjoy your privacy and personal space</p>
                <div className="flex flex-col items-center gap-2">
                  <Home className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">Single occupancy</span>
                </div>
              </motion.div>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-4">All Plans Include:</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {hostelData.pricing.includes.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 bg-linear-to-r from-red-50 to-white px-4 py-2 rounded-full border border-red-100"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              className="px-8 py-4 text-lg bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30"
              onClick={() => window.location.href = '/register'}
            >
              Book Your Spot Now
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Limited spots available • Reserve yours today!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HostelPage;

