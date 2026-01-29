// src/pages/AIChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  FaRobot,
  FaPaperPlane,
  FaGraduationCap,
  FaQuestionCircle,
  FaBolt,
  FaClock,
  FaShieldAlt,
  FaUser,
  FaSpinner,
} from 'react-icons/fa';
import { getFakeAssistantResponse } from '../ai/fakeAssistant';
import { contactInfoData } from '../data/Data';
const AIChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "👋 Hi there! I'm your Acedu AI guide.\n\nAsk me anything about our courses, bootcamps, enrollment, or career paths and I’ll walk you through it step by step.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contact = contactInfoData;
  // Ref for the scrollable chat container (not the whole page)
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const el = chatContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const { text } = getFakeAssistantResponse(input);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
      setIsLoading(false);
    }, 500);
  };

  const quickPrompts = [
    'What courses do you offer?',
    'How much is the React course?',
    'How long is the bootcamp?',
    'Do you offer scholarships?',
    'What jobs can I get after JavaScript?',
    'I am a complete beginner, where should I start?',
  ];

  const handleQuickPromptClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black py-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          {/* Top Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-3 bg-red-700/20 border border-red-600/60 text-red-100 px-3 py-1 rounded-full mb-3">
                <FaRobot className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Acedu AI Assistant
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Chat with <span className="text-red-400">Acedu AI</span>
              </h1>
              <p className="text-sm md:text-base text-gray-200/90 max-w-xl">
                Ask questions about our bootcamps, courses, pricing, schedule, or your learning
                path. I’ll give you clear, practical answers based on   ACEDU Coding BootCamp information.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs text-gray-200/80">
              <div className="bg-black/70 border border-red-900/60 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-red-700/30">
                  <FaBolt className="w-3.5 h-3.5 text-red-300" />
                </div>
                <div>
                  <p className="font-semibold text-white">Instant answers</p>
                  <p>Course & enrollment info</p>
                </div>
              </div>
              <div className="bg-black/70 border border-red-900/60 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-red-700/30">
                  <FaShieldAlt className="w-3.5 h-3.5 text-red-300" />
                </div>
                <div>
                  <p className="font-semibold text-white">Safe guidance</p>
                  <p>Beginner‑friendly advice</p>
                </div>
              </div>
              <div className="bg-black/70 border border-red-900/60 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-red-700/30">
                  <FaClock className="w-3.5 h-3.5 text-red-300" />
                </div>
                <div>
                  <p className="font-semibold text-white">Always on</p>
                  <p>Ask questions anytime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-6 items-start">
            {/* Chat Panel */}
            <div className="bg-black/80 border border-red-900 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden flex flex-col h-[520px]">
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-red-900/80 bg-gradient-to-r from-red-950 to-black flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-700/40 flex items-center justify-center border border-red-500/80">
                    <FaRobot className="w-4.5 h-4.5 text-red-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Acedu AI</p>
                    <p className="text-[10px] text-green-300 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Online • Smart Guide Mode
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-200">
                  <span className="px-2 py-0.5 rounded-full border border-red-800 bg-black/80">
                    No login required
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-red-800 bg-black/80">
                    Uses Acedu course data
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.12),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(0,0,0,0.9),_transparent_60%)] ai-chat-scroll"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-xs sm:text-sm ${
                        message.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-sm'
                          : 'bg-zinc-900/90 text-gray-50 border border-red-900/70 rounded-bl-sm'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div
                          className={`p-1 rounded ${
                            message.role === 'user' ? 'bg-white/20' : 'bg-red-700/30'
                          }`}
                        >
                          {message.role === 'user' ? (
                            <FaUser className="w-3 h-3" />
                          ) : (
                            <FaGraduationCap className="w-3 h-3 text-red-200" />
                          )}
                        </div>
                        <span className="text-[11px] font-semibold opacity-80">
                          {message.role === 'user' ? 'You' : 'Acedu AI'}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap leading-snug">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl px-3 py-2.5 bg-zinc-900/90 text-gray-50 border border-red-900/70 rounded-bl-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="p-1 rounded bg-red-700/30">
                          <FaGraduationCap className="w-3 h-3 text-red-200" />
                        </div>
                        <span className="text-[11px] font-semibold opacity-80">Acedu AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSpinner className="w-3 h-3 animate-spin text-red-300" />
                        <p className="text-xs text-gray-200">Thinking…</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-red-900/80 bg-black/90 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about Acedu’s courses, bootcamps, or career paths…"
                    className="flex-1 bg-black border border-red-900/70 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition-colors ${
                      isLoading || !input.trim()
                        ? 'bg-red-900 text-gray-300 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-500 text-white'
                    }`}
                  >
                    {isLoading ? (
                      <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FaPaperPlane className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Capabilities */}
              <div className="bg-black/80 border border-red-900 rounded-2xl shadow-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaQuestionCircle className="w-4 h-4 text-red-300" />
                  What Acedu AI can help you with
                </h2>

                <div className="space-y-3 text-sm text-gray-100/90">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-red-700/30">
                      <FaGraduationCap className="w-3.5 h-3.5 text-red-200" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-0.5">Course & Bootcamp Info</p>
                      <p className="text-gray-300 text-xs">
                        HTML & CSS, JavaScript, React, Cybersecurity, Data Analysis – pricing,
                        content, duration, and who each one is best for.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-red-700/30">
                      <FaQuestionCircle className="w-3.5 h-3.5 text-red-200" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-0.5">Enrollment Guidance</p>
                      <p className="text-gray-300 text-xs">
                        Fees, scholarships, schedules, and which path to pick based on your
                        background and goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 rounded-full bg-red-700/30">
                      <FaBolt className="w-3.5 h-3.5 text-red-200" />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-0.5">Technical & Career Support</p>
                      <p className="text-gray-300 text-xs">
                        Beginner‑level coding explanations, project ideas, and how your skills map
                        to real job roles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="bg-black/80 border border-red-900 rounded-2xl shadow-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Quick questions to try</h3>
                <p className="text-xs text-gray-300 mb-3">
                  Tap any of these to fill the chat box, then hit send or edit them to personalize.
                </p>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickPromptClick(prompt)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm bg-black hover:bg-red-900/30 text-gray-100 hover:text-red-100 border border-red-900/70 hover:border-red-500 transition-colors"
                    >
                      “{prompt}”
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="text-[11px] text-gray-200/90 bg-black/80 border border-red-900 rounded-2xl px-4 py-3">
                Acedu AI gives guidance based on the bootcamp information provided. For anything
                sensitive (payments, special cases, sponsorships), you can also reach us directly at{' '}
                <span className="font-semibold text-red-200">{contact.email}</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatPage;