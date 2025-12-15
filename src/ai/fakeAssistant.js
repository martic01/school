// src/ai/fakeAssistant.js
import {
  coursesData,
  projectsData,
  ceoDatas,
  upcomingBootcampsData,
  alumniDatas,
  aboutContentData,
} from '../data/Data';

// ---------- Tutor System ----------
const TUTOR_STORAGE_KEY = 'acedu_tutor_state';
const TUTOR_TIMEOUT = 10 * 60 * 1000; // 10 minutes

const tutorPages = ['home', 'about', 'course', 'project', 'AIpage', 'Enroll'];

// Tutor state structure - SINGLE SOURCE OF TRUTH
let tutorState = null;

// Load tutor state from localStorage
function loadTutorState() {
  const saved = localStorage.getItem(TUTOR_STORAGE_KEY);
  if (!saved) return null;
  
  try {
    const state = JSON.parse(saved);
    const now = Date.now();
    
    // Check if state is expired (older than 10 minutes)
    if (now - state.lastUpdated > TUTOR_TIMEOUT) {
      localStorage.removeItem(TUTOR_STORAGE_KEY);
      return null;
    }
    
    tutorState = state;
    return state;
  } catch (e) {
    localStorage.removeItem(TUTOR_STORAGE_KEY);
    tutorState = null;
    return null;
  }
}

// Save tutor state to localStorage
function saveTutorState(state) {
  state.lastUpdated = Date.now();
  tutorState = state;
  localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(state));
}

// Reset tutor state
function resetTutorState() {
  tutorState = null;
  localStorage.removeItem(TUTOR_STORAGE_KEY);
  return {
    active: false,
    currentPage: 0,
    scrollProgress: 0,
    startedAt: null,
    lastUpdated: null,
    isAutoScrolling: false
  };
}

// Get route for page name
function getPageRoute(pageName) {
  switch(pageName) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'course': return '/course/1';
    case 'project': return '/projects';
    case 'AIpage': return '/ai-chat';
    case 'Enroll': return '/register';
    default: return '/';
  }
}

// Get descriptions for each page
function getPageDescription(pageName) {
  switch(pageName) {
    case 'home':
      return `🏠 **Home Page**\n\nWelcome to Acedu BootCamp! This is our main landing page where you can:\n• See our mission and vision\n• Explore available courses\n• View student projects\n• Check upcoming bootcamps\n• Learn about our alumni success\n• Meet our CEO and team\n• Find contact information`;
    
    case 'about':
      return `ℹ️ **About Page**\n\nLearn more about Acedu BootCamp:\n• Our story and mission\n• Why we chose the bootcamp model\n• Core values and principles\n• Team and leadership\n• Student success stories\n• Our approach to teaching`;
    
    case 'course':
      return `📚 **Courses Page**\n\nExplore all our available courses:\n• HTML & CSS Fundamentals\n• JavaScript Programming\n• React Development\n• Cybersecurity\n• Data Analysis\n• Detailed curriculum for each course\n• Pricing and duration information\n• Prerequisites and requirements`;
    
    case 'project':
      return `🚀 **Projects Page**\n\nSee what our students have built:\n• Real-world project portfolio\n• Web applications and mobile apps\n• Data analysis projects\n• Cybersecurity tools\n• Technology stacks used\n• Student testimonials\n• Project demos and code`;
    
    case 'AIpage':
      return `🤖 **AI Chat Page**\n\nChat with me (Acedu AI) anytime:\n• Ask questions about courses\n• Get enrollment guidance\n• Technical assistance\n• Career advice\n• This tutor system!\n• Available 24/7`;
    
    case 'Enroll':
      return `📝 **Enrollment Page**\n\nReady to join Acedu BootCamp?\n• Fill out enrollment form\n• Choose your preferred course\n• Select payment options\n• Apply for scholarships\n• Pick your schedule\n• Start your coding journey`;
    
    default:
      return `Exploring ${pageName} page`;
  }
}

// Start or continue tutor
function handleTutorCommand(input) {
  const lower = input.toLowerCase().trim();
  
  // Load current state
  const currentState = loadTutorState();
  
  // Check for stop commands
  const stopRegex = /(stop|pause|break|halt|end|finish|quit|exit|cancel)/;
  if (stopRegex.test(lower)) {
    if (currentState) {
      currentState.active = false;
      currentState.isAutoScrolling = false;
      saveTutorState(currentState);
    }
    return {
      text: "✅ Tutor paused. I've saved your progress.\n\nSay **'continue tutor'** to resume where you left off, or **'restart tutor'** to start over.\n\nYou can also ask me specific questions about courses or enrollment!",
      navigateTo: null,
      startTutor: false,
      continueTutor: false,
      autoScroll: false,
      stopTutor: true
    };
  }
  
  // Check for continue command
  if (/(continue|resume|keep going)/.test(lower)) {
    if (currentState && !currentState.active) {
      currentState.active = true;
      currentState.isAutoScrolling = true;
      saveTutorState(currentState);
      
      const currentPageName = tutorPages[currentState.currentPage];
      return {
        text: `▶️ **Resuming Tutor**\n\n${getPageDescription(currentPageName)}\n\nI'll continue auto-scrolling through this page. Say **"next"** when ready for next page.`,
        navigateTo: getPageRoute(currentPageName),
        startTutor: false,
        continueTutor: true,
        autoScroll: true,
        pageName: currentPageName
      };
    }
  }
  
  // Restart tutor
  if (/(restart|start over|begin again|fresh start)/.test(lower)) {
    const newState = resetTutorState();
    newState.active = true;
    newState.isAutoScrolling = true;
    newState.startedAt = Date.now();
    saveTutorState(newState);
    
    const firstPage = tutorPages[0];
    return {
      text: `🎬 **Welcome to Acedu Tutor Mode!** 🎬\n\nI'll guide you through our website page by page:\n\n1. Home Page 🏠\n2. About Page ℹ️\n3. Courses 📚\n4. Projects 🚀\n5. AI Chat 🤖\n6. Enrollment 📝\n\nI'll automatically scroll through each page from top to bottom.\n\nSay **"next"** to go to the next page, or **"stop"** to pause at any time.\n\nLet's begin with the Home Page!`,
      navigateTo: getPageRoute(firstPage),
      startTutor: true,
      continueTutor: false,
      autoScroll: true,
      pageName: firstPage
    };
  }
  
  // Start new tutor
  if (/(show me around|give me a tour|guide me|tutor me|tell me about acedu|explain the site)/.test(lower)) {
    // Check if there's an existing state
    if (currentState) {
      return {
        text: `📚 **Welcome back to Acedu Tutor!**\n\nI found your previous progress.\n\nSay:\n• **"continue tutor"** to resume where you left off\n• **"restart tutor"** to start fresh\n• **"stop tutor"** to cancel`,
        navigateTo: null,
        startTutor: false,
        continueTutor: false,
        autoScroll: false
      };
    }
    
    // Start new tutor
    const newState = {
      active: true,
      currentPage: 0,
      scrollProgress: 0,
      startedAt: Date.now(),
      lastUpdated: Date.now(),
      isAutoScrolling: true
    };
    saveTutorState(newState);
    
    const firstPage = tutorPages[0];
    return {
      text: `🎬 **Welcome to Acedu Tutor Mode!** 🎬\n\nI'll guide you through our website page by page:\n\n1. Home Page 🏠\n2. About Page ℹ️\n3. Courses 📚\n4. Projects 🚀\n5. AI Chat 🤖\n6. Enrollment 📝\n\nI'll automatically scroll through each page from top to bottom.\n\nSay **"next"** to go to the next page, or **"stop"** to pause at any time.\n\nLet's begin with the Home Page!`,
      navigateTo: getPageRoute(firstPage),
      startTutor: true,
      continueTutor: false,
      autoScroll: true,
      pageName: firstPage
    };
  }
  
  // Next page command
  if (/^(next|continue tutor|go next|next page)/.test(lower)) {
    if (currentState && currentState.active) {
      // Move to next page
      currentState.currentPage++;
      currentState.scrollProgress = 0;
      currentState.isAutoScrolling = true;
      
      // Check if we've finished all pages
      if (currentState.currentPage >= tutorPages.length) {
        resetTutorState();
        return {
          text: `🎉 **Tutor Complete!** 🎉\n\nYou've successfully explored all of Acedu BootCamp!\n\nWhat you've seen:\n✅ Home Page - Our main landing\n✅ About Page - Our story & mission\n✅ Courses Page - All available courses\n✅ Projects Page - Student portfolio\n✅ AI Chat Page - Interactive assistant\n✅ Enrollment Page - Join our bootcamp\n\nNow you can:\n• Ask me specific questions\n• Visit any page again\n• Start the enrollment process\n• Explore courses in detail\n\nThank you for taking the tour! 🙏`,
          navigateTo: null,
          startTutor: false,
          continueTutor: false,
          autoScroll: false,
          tutorComplete: true
        };
      }
      
      saveTutorState(currentState);
      
      const nextPageName = tutorPages[currentState.currentPage];
      return {
        text: `➡️ **Moving to ${nextPageName.toUpperCase()} Page**\n\n${getPageDescription(nextPageName)}\n\nI'll now auto-scroll through this page. Say **"next"** when ready for next page, or **"stop"** to pause.`,
        navigateTo: getPageRoute(nextPageName),
        startTutor: false,
        continueTutor: true,
        autoScroll: true,
        pageName: nextPageName
      };
    }
  }
  
  return null;
}

// Check if input is a tutor navigation command
function isTutorNavigationCommand(input) {
  const lower = input.toLowerCase().trim();
  return /^(next|continue|keep going|more|show me more|stop|pause|restart|start over|continue tutor|restart tutor|stop tutor|go next|next page)/.test(lower);
}

// ---------- Existing helpers ----------
const coursePriceMap = {
  1: '₦190,000', // HTML & CSS
  2: '₦200,000', // JavaScript
  3: '₦300,000', // React
  5: '₦300,000', // Cybersecurity
  6: '₦370,000', // Data Analysis
};

const courseKeywords = [
  { id: 1, keywords: ['html & css', 'html css', 'html', 'css', 'frontend basics'] },
  { id: 2, keywords: ['javascript', 'java script', 'js'] },
  { id: 3, keywords: ['react', 'reactjs', 'react.js'] },
  { id: 4, keywords: ['c#', 'c sharp', 'csharp'] },
  { id: 5, keywords: ['cybersecurity', 'cyber security', 'security'] },
  { id: 6, keywords: ['data analysis', 'data analytics', 'data analyst'] },
];

function findCourseMatch(textLower) {
  for (const entry of courseKeywords) {
    for (const kw of entry.keywords) {
      if (textLower.includes(kw)) {
        return entry.id;
      }
    }
  }
  return null;
}

function buildCoursesOverview(includePrices = true) {
  const lines = coursesData.map((course) => {
    const price = includePrices ? coursePriceMap[course.id] : null;
    const parts = [course.name];
    if (course.duration) parts.push(`(${course.duration})`);
    if (price) parts.push(`– ${price}`);
    return `• ${parts.join(' ')}`;
  });

  return `Here are the main courses we offer right now:\n\n${lines.join(
    '\n',
  )}\n\nYou can click each course card on the page to see full details and curriculum.`;
}

// ---------- MAIN FUNCTION ----------
export function getFakeAssistantResponse(userInput) {
  const input = userInput || '';
  const lower = input.toLowerCase().trim();
  
  // First, handle tutor commands
  const tutorResponse = handleTutorCommand(input);
  if (tutorResponse) return tutorResponse;
  
  // Check if this is a tutor navigation command while tutor is active
  const currentState = loadTutorState();
  if (currentState?.active && isTutorNavigationCommand(input)) {
    if (/^(next|continue|keep going|more|show me more)/.test(lower)) {
      return handleTutorCommand('next');
    }
  }
  
  // Continue with existing responses...
  // 0) Greetings 👋
  if (/^(hi|hello|hey|yo)\b/.test(lower) || /(good (morning|afternoon|evening))/.test(lower)) {
    return {
      text:
        "Hey there! 👋 I'm Acedu's friendly AI guide.\n\n" +
        "I can help you:\n" +
        "• Pick the right course 🎯\n" +
        "• Understand prices & duration 💰⏱️\n" +
        "• See real student projects 🚀\n" +
        "• Learn how to register 🙋‍♂️\n\n" +
        "💡 **New Feature:** Say **'SHOW ME AROUND'** or **'TELL ME ABOUT ACEDU'** for a guided tour of our website!\n\n" +
        "What would you like to know first?",
    };
  }

  // 0b) Appreciation / thank you 🙏
  if (/(thank you|thanks|appreciate|you helped|you\'re the best)/.test(lower)) {
    return {
      text:
        "You're very welcome! 🙏😊\n\n" +
        "If you'd like, I can now:\n" +
        "• Suggest a course based on your background\n" +
        "• Show you our upcoming bootcamps\n" +
        "• Or guide you to the registration page to get started.\n\n" +
        "You can also say **'show me around'** for a quick tour of Acedu.",
    };
  }

  if (/(bye|later|ok)/.test(lower)) {
    return {
      text:
        "Always here for you 😊\n\n" +
        "Alright 😊\n"
    };
  }

  // 0c) Distress / confusion 🧠❤️
  if (
    /(confused|lost|stuck|overwhelmed|frustrated|hard|difficult|don\'t understand|dont understand|help me|scared|anxious)/.test(
      lower
    )
  ) {
    return {
      text:
        "It's okay to feel that way — learning tech can be overwhelming at first ❤️\n\n" +
        "You're not alone. Many of our students started exactly where you are and are now working in great jobs.\n\n" +
        "Start small:\n" +
        "• If you're a complete beginner, begin with HTML & CSS 🧱\n" +
        "• Then move into JavaScript, then React 🚀\n\n" +
        "If you'd like to talk to a human advisor, you can reach us via the contact section at the bottom of the homepage.",
      navigateTo: '/',
      scrollToSectionId: 'footer-section',
    };
  }

  // 1) Registration / Enrollment 📝
  if (/(register|enrol|enroll|apply|sign ?up|join)/.test(lower)) {
    return {
      text:
        "Great choice! 🎉 You can register directly online.\n\n" +
        "I've opened the registration page for you. If you're not sure which course to pick, tell me your background (e.g. *absolute beginner*, *some HTML*, *some Python*) and your goal (e.g. *frontend*, *data*, *cybersecurity*).",
      navigateTo: '/register',
    };
  }

  // 2) Student projects / portfolio 🚀
  if (/(project|portfolio|showcase|demo|capstone)/.test(lower)) {
    const sampleProject = projectsData[0];
    return {
      text:
        `We showcase real student projects like **${sampleProject.projectName}** – ${sampleProject.reason} 🚀\n\n` +
        "I've opened the Projects page so you can explore more of what our students have built.",
      navigateTo: '/projects',
    };
  }

  // 3) CEO / Founder specifically - scroll to CEO section on homepage
  if (/(ceo|founder|owner|leadership|who started|who created)/.test(lower)) {
    return {
      text:
        `Our founder and CEO, **${ceoDatas.name}**, has over ${ceoDatas.stats?.find((s) => s.label === 'Years Experience')?.value || 'many years'
        } of experience and has mentored ${ceoDatas.stats?.find((s) => s.label === 'Students Mentored')?.value || 'thousands of'
        } students globally.\n\n` +
        "I've scrolled to our CEO section so you can learn more about our leadership and vision.",
      navigateTo: '/',
      scrollToSectionId: 'about-ceo-section',
    };
  }

  // 4) About Acedu / Bootcamp / Program - navigate to About page
  if (
    /(about acedu|about the program|about the bootcamp|about this program|about this bootcamp|what is acedu|who are you|tell me about acedu|about your company)/.test(lower) ||
    (/^about$/.test(lower) && !/(ceo|founder|owner)/.test(lower))
  ) {
    return {
      text:
        "Great question! Let me show you all about Acedu BootCamp 🚀\n\n" +
        "I've opened our About page where you can learn:\n\n" +
        "• Our story and mission 📖\n" +
        "• Why we chose the bootcamp model 🎯\n" +
        "• Core values and principles ❤️\n" +
        "• Our teaching approach 🧑‍🏫\n" +
        "• Student success stories 🏆\n\n" +
        "Feel free to ask me specific questions after exploring!",
      navigateTo: '/about',
    };
  }

  // 5) Values / Vision / Mission - navigate to about page
  if (/(values|vision|mission|core values|principles)/.test(lower) && !/(ceo|founder)/.test(lower)) {
    return {
      text: "Our core values and mission are detailed on our About page. I'll take you there now!",
      navigateTo: '/about',
    };
  }

  // 6) Bootcamp model / methodology - navigate to about page
  if (/(bootcamp model|methodology|approach|how we teach|teaching method)/.test(lower)) {
    return {
      text:
        "Our bootcamp model focuses on hands-on, project-based learning that gets you job-ready fast! 💻\n\n" +
        "I'll navigate you to our About page where you can see our full methodology and approach.",
      navigateTo: '/about',
    };
  }

  // 7) Upcoming bootcamps / next batch / schedule 📅
  if (
    /(upcoming|next batch|start date|when does.*bootcamp|bootcamp date|schedule)/.test(
      lower
    )
  ) {
    const summaries = upcomingBootcampsData
      .map(
        (b) =>
          `• **${b.name}** – ${b.place}, ${b.date} (${b.duration})\n  ${b.benefit}`
      )
      .join('\n\n');

    return {
      text:
        "Here are some upcoming bootcamps 📅:\n\n" +
        `${summaries}\n\n` +
        "I've highlighted them for you. When you're ready, you can click *Register* to secure a spot.",
      navigateTo: '/',
      scrollToSectionId: 'bootcamps-section',
    };
  }

  // 8) Alumni / jobs / success stories 💼
  if (/(alumni|graduate|graduates|success story|got job|hired|placement)/.test(lower)) {
    const sampleAlumni = alumniDatas.slice(0, 3);
    const lines = sampleAlumni
      .map((a) => `• **${a.name}** – ${a.skill} at ${a.company} (${a.location})`)
      .join('\n');

    return {
      text:
        "Our alumni have gone on to work at top companies around the world 🌍:\n\n" +
        `${lines}\n\n` +
        "You'll build real projects, get interview prep, and ongoing career support so you can follow a similar path.",
      navigateTo: '/',
      scrollToSectionId: 'alumni-section',
    };
  }

  // 9) Contact / email / phone 📞
  if (/(contact|phone|email|reach|call|whats?app|support)/.test(lower)) {
    return {
      text:
        "You can reach us anytime 📞📧\n\n" +
        "• Email: **acedu@gmail.com**\n" +
        "• Or use the contact form and links in the footer section.\n\n" +
        "I've scrolled you down so you can see all the contact options clearly.",
      navigateTo: '/',
      scrollToSectionId: 'footer-section',
    };
  }

  // 10) "Why this course" / who is it for ❓
  if (/(why this course|who is this for|is this path right for me|why acedu)/.test(lower)) {
    return {
      text:
        "Great question! 🎯 Our bootcamp is perfect for:\n\n" +
        "• Beginners who want a structured path into tech 👶💻\n" +
        "• Career changers moving from non-tech fields 🔁\n" +
        "• Freelancers who want to offer dev services worldwide 🌍\n" +
        "• Founders & entrepreneurs building their own products 🚀\n\n" +
        "I've scrolled you to the *Why this Course* section so you can see more details.",
      navigateTo: '/',
      scrollToSectionId: 'why-course-section',
    };
  }

  const mentionsCourseWord =
    lower.includes('course') || lower.includes('courses') || lower.includes('program');

  const matchedCourseId = findCourseMatch(lower);

  // 11) Specific course (JavaScript, React, etc.) 📚
  if (matchedCourseId) {
    const course = coursesData.find((c) => c.id === matchedCourseId);
    const price = coursePriceMap[matchedCourseId];

    let line =
      `Here's a quick overview of our **${course.name}** course 📘:\n\n` +
      `• Duration: ${course.duration}\n` +
      `• Class time: ~${course.time} per session\n\n` +
      `${course.description}\n\n`;

    if (price) {
      line += `💰 Tuition for this course is **${price}**.\n\n`;
    }

    line +=
      "I've opened the detailed course page for you so you can see the full curriculum, stages, and more information.";

    return {
      text: line,
      navigateTo: `/course/${matchedCourseId}`,
    };
  }

  // 12) Course questions (no specific match)
  if (mentionsCourseWord) {
    const overview = buildCoursesOverview(true);
    return {
      text:
        "These are the courses we currently offer — more are coming soon 😊.\n\n" +
        overview,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 13) Tech domains (frontend, data, cyber, etc.) 🧭
  if (/(frontend|front end)/.test(lower)) {
    return {
      text:
        "If you're interested in **Frontend Development**, a great path is:\n\n" +
        "1️⃣ Start with **HTML & CSS** (layout, responsive design)\n" +
        "2️⃣ Move into **JavaScript** (logic and interactivity)\n" +
        "3️⃣ Then learn **React** (modern frontend framework used by big companies)\n\n" +
        "Start with HTML & CSS if you're a complete beginner, then step up into JS and React. I've highlighted the courses section for you.",
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  if (/(data|data analysis|analytics|analyst)/.test(lower)) {
    const dataCourse = coursesData.find((c) => c.name.toLowerCase().includes('data'));
    return {
      text:
        "If you like working with numbers, business questions, or insights, our **Data Analysis** course is a strong fit 📊.\n\n" +
        `${dataCourse?.description || ''}\n\n` +
        "You'll work with Python, SQL, and visualization tools to turn raw data into clear decisions.",
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  if (/(cyber|security)/.test(lower)) {
    const cyberCourse = coursesData.find((c) =>
      c.name.toLowerCase().includes('cyber')
    );
    return {
      text:
        "Interested in **Cybersecurity**? 🔐 Our course focuses on both ethical hacking (offense) and defense in safe labs.\n\n" +
        `${cyberCourse?.description || ''}\n\n` +
        "You'll understand how real attacks work and how to build more secure systems.",
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 14) Very general fallback with tutor promotion
  return {
    text:
      "I'm Acedu's smart guide 🤝\n\n" +
      "I can help you with:\n" +
      "• Course recommendations & pricing 💰\n" +
      "• Enrollment & registration 📝\n" +
      "• Upcoming bootcamps 📅\n" +
      "• Student projects 🚀\n\n" +
      "💡 **Try our guided tour!** Say **'SHOW ME AROUND'** or **'TELL ME ABOUT ACEDU'** for a step-by-step website tour.\n\n" +
      "Or ask something like:\n" +
      "• 'Which course is best for beginners?'\n" +
      "• 'Tell me about React course'\n" +
      "• 'How do I enroll?'",
    navigateTo: undefined,
  };
}

// Export helper functions for component to use
export function getCurrentTutorState() {
  return loadTutorState();
}

export function updateTutorScrollProgress(progress) {
  const state = loadTutorState();
  if (state) {
    state.scrollProgress = progress;
    saveTutorState(state);
  }
}