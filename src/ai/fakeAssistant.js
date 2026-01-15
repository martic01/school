// src/ai/fakeAssistant.js
import {
  coursesData,
  projectsData,
  ceoDatas,
  upcomingBootcampsData,
  alumniDatas,
  aboutContentData,
  productsData,
  hostelData,
  getCoursesByCategory,
  getCourseCategories
} from '../data/Data';

// ---------- Enhanced Tutor System ----------
const TUTOR_STORAGE_KEY = 'acedu_tutor_state';
const TUTOR_TIMEOUT = 30 * 60 * 1000; // 30 minutes (extended)

// Updated tutor pages to include new sections
const tutorPages = ['home', 'about', 'course', 'projects', 'products', 'hostel', 'AIpage', 'Enroll'];

// Tutor state structure
let tutorState = null;

// Load tutor state from localStorage
function loadTutorState() {
  const saved = localStorage.getItem(TUTOR_STORAGE_KEY);
  if (!saved) return null;
  
  try {
    const state = JSON.parse(saved);
    const now = Date.now();
    
    // Check if state is expired
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
    isAutoScrolling: false,
    completedPages: []
  };
}

// Get route for page name
function getPageRoute(pageName) {
  const routes = {
    'home': '/',
    'about': '/about',
    'course': '/course/1',
    'projects': '/projects',
    'products': '/products',
    'hostel': '/hostel',
    'AIpage': '/ai-chat',
    'Enroll': '/register'
  };
  return routes[pageName] || '/';
}

// Get descriptions for each page with new data
function getPageDescription(pageName) {
  const descriptions = {
    'home': `🏠 Home Page\n\nWelcome to ACEDU Coding Bootcamp! This is our main landing page where you can:\n• See our vision to train 5,000+ IT experts yearly\n• Explore all ${coursesData.length} available courses across ${getCourseCategories().length} categories\n• View real student projects with live demos\n• Check upcoming bootcamps including free cybersecurity training\n• Learn about our alumni success stories\n• Meet our founder and team\n• Find contact information and location`,
    
    'about': `ℹ️ About Page\n\nLearn more about ACEDU Coding Bootcamp:\n• Our story and mission to produce globally competitive IT experts\n• Why we chose the bootcamp model over traditional education\n• Our A.C.E.D.U core values\n• Team and leadership\n• Student success stories\n• Our hands-on apprenticeship approach`,
    
    'course': `📚 Courses Page\n\nExplore all our ${coursesData.length} courses across ${getCourseCategories().length} categories:\n• Frontend Development (HTML, CSS, JS, React)\n• Backend Development (C# .NET)\n• Data Analytics (Excel, Power BI, SQL)\n• Product Design (UI/UX)\n• Cybersecurity (Beginner to Advanced)\n• Computer Applications (Microsoft Office)\n• Mobile Development (React Native)\n• Detailed curriculum, duration, and pricing for each`,
    
    'projects': `🚀 Projects Page\n\nSee what our students have built:\n${projectsData.slice(0, 3).map(p => `• ${p.projectName} - ${p.reason}`).join('\n')}\n• Technology stacks: React, Vue, Node.js, Firebase, etc.\n• Real student portfolios with live demos`,
    
    'products': `🛒 Products Page\n\nDiscover ACEDU's comprehensive solutions:\n${productsData.map(p => `• ${p.name} - ${p.description}`).join('\n')}\n• Clever School Portal for educational institutions\n• Custom software development\n• Website development and management`,
    
    'hostel': `🏠 Hostel Page\n\nExplore our student accommodation facilities:\n• Comfortable hostel accommodation for full-time students\n• ${hostelData.sections.length} key sections including study areas, amenities, and security\n• Interactive audio tour with female voice narration\n• Affordable pricing options (${hostelData.pricing.sharedRoom} - ${hostelData.pricing.privateRoom})\n• All plans include: ${hostelData.pricing.includes.join(', ')}`,
    
    'AIpage': `🤖 AI Chat Page\n\nChat with me (ACEDU AI) anytime:\n• Ask questions about all ${coursesData.length} courses\n• Get enrollment guidance and pricing\n• Technical assistance and career advice\n• Learn about our location and facilities\n• Information about our A.C.E.D.U values\n• Available 24/7 for support`,
    
    'Enroll': `📝 Enrollment Page\n\nReady to join ACEDU Coding Bootcamp?\n• Fill out enrollment form\n• Choose from ${coursesData.length} available courses\n• Select payment options (4-week or 6-week plans available)\n• Pick your schedule (Mon-Fri or thrice weekly)\n• Access hostel accommodation for full-time students\n• Start your IT journey from beginner to expert`
  };
  
  return descriptions[pageName] || `Exploring ${pageName} page`;
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
      text: "✅ Tutor paused. I've saved your progress.\n\nSay 'continue tutor' to resume where you left off, or 'restart tutor' to start over.\n\nYou can also ask me specific questions about courses, products, or hostel accommodation!",
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
        text: `▶️ Resuming Tutor\n\n${getPageDescription(currentPageName)}\n\nI'll continue auto-scrolling through this page. Say "next" when ready for next page.`,
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
      text: `🎬 Welcome to ACEDU Tutor Mode! 🎬\n\nI'll guide you through our website page by page:\n\n1. Home Page 🏠\n2. About Page ℹ️\n3. Courses 📚\n4. Projects 🚀\n5. Products 🛒\n6. Hostel 🏠\n7. AI Chat 🤖\n8. Enrollment 📝\n\nI'll automatically scroll through each page from top to bottom.\n\nSay "next" to go to the next page, or "stop" to pause at any time.\n\nLet's begin with the Home Page!`,
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
        text: `📚 Welcome back to ACEDU Tutor!\n\nI found your previous progress. You were on page ${currentState.currentPage + 1} of ${tutorPages.length}.\n\nSay:\n• "continue tutor" to resume where you left off\n• "restart tutor" to start fresh\n• "stop tutor" to cancel`,
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
      isAutoScrolling: true,
      completedPages: []
    };
    saveTutorState(newState);
    
    const firstPage = tutorPages[0];
    return {
      text: `🎬 Welcome to ACEDU Tutor Mode! 🎬\n\nI'll guide you through our website page by page:\n\n1. Home Page 🏠\n2. About Page ℹ️\n3. Courses 📚\n4. Projects 🚀\n5. Products 🛒\n6. Hostel 🏠\n7. AI Chat 🤖\n8. Enrollment 📝\n\nI'll automatically scroll through each page from top to bottom.\n\nSay "next" to go to the next page, or "stop" to pause at any time.\n\nLet's begin with the Home Page!`,
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
      // Mark current page as completed
      if (!currentState.completedPages) currentState.completedPages = [];
      currentState.completedPages.push(tutorPages[currentState.currentPage]);
      
      // Move to next page
      currentState.currentPage++;
      currentState.scrollProgress = 0;
      currentState.isAutoScrolling = true;
      
      // Check if we've finished all pages
      if (currentState.currentPage >= tutorPages.length) {
        const completionTime = Math.round((Date.now() - currentState.startedAt) / 1000 / 60);
        resetTutorState();
        return {
          text: `🎉 Tutor Complete! 🎉\n\nYou've successfully explored all of ACEDU Coding Bootcamp in ${completionTime} minutes!\n\nWhat you've seen:\n✅ Home Page - Our main landing with vision to train 5,000+ IT experts yearly\n✅ About Page - Our A.C.E.D.U values and mission\n✅ Courses Page - All ${coursesData.length} courses across ${getCourseCategories().length} categories\n✅ Projects Page - Real student portfolio with live demos\n✅ Products Page - Comprehensive tech solutions for businesses and schools\n✅ Hostel Page - Student accommodation with interactive audio tour\n✅ AI Chat Page - Interactive assistant (that's me!)\n✅ Enrollment Page - Join our bootcamp with flexible options\n\nNow you can:\n• Ask me specific questions about any course or product\n• Visit any page again for more details\n• Start the enrollment process\n• Explore hostel accommodation options\n• Schedule a campus tour\n\nThank you for taking the tour! 🙏`,
          navigateTo: null,
          startTutor: false,
          continueTutor: false,
          autoScroll: false,
          tutorComplete: true
        };
      }
      
      saveTutorState(currentState);
      
      const nextPageName = tutorPages[currentState.currentPage];
      const progress = Math.round((currentState.currentPage / tutorPages.length) * 100);
      
      return {
        text: `➡️ Moving to Page ${currentState.currentPage + 1}/${tutorPages.length} (${progress}% Complete)\n\n${getPageDescription(nextPageName)}\n\nI'll now auto-scroll through this page. Say "next" when ready for next page, or "stop" to pause.`,
        navigateTo: getPageRoute(nextPageName),
        startTutor: false,
        continueTutor: true,
        autoScroll: true,
        pageName: nextPageName
      };
    }
  }
  
  // Previous page command
  if (/^(previous|back|go back)/.test(lower)) {
    if (currentState && currentState.active && currentState.currentPage > 0) {
      currentState.currentPage--;
      currentState.scrollProgress = 0;
      saveTutorState(currentState);
      
      const prevPageName = tutorPages[currentState.currentPage];
      return {
        text: `⬅️ Going back to ${prevPageName.toUpperCase()} Page\n\n${getPageDescription(prevPageName)}\n\nI'll auto-scroll through this page again. Say "next" to continue.`,
        navigateTo: getPageRoute(prevPageName),
        startTutor: false,
        continueTutor: true,
        autoScroll: true,
        pageName: prevPageName
      };
    }
  }
  
  // Jump to specific page
  const pageMatch = lower.match(/(go to|show|open) (home|about|courses?|projects?|products?|hostel|ai|enroll)/);
  if (pageMatch) {
    const pageName = pageMatch[2];
    const pageIndex = tutorPages.findIndex(p => p.toLowerCase().includes(pageName.toLowerCase()));
    
    if (pageIndex !== -1) {
      const state = currentState || resetTutorState();
      state.currentPage = pageIndex;
      state.scrollProgress = 0;
      state.active = true;
      state.isAutoScrolling = true;
      saveTutorState(state);
      
      return {
        text: `🎯 Jumping to ${tutorPages[pageIndex].toUpperCase()} Page\n\n${getPageDescription(tutorPages[pageIndex])}\n\nI'll auto-scroll through this page. Say "next" to continue the tour.`,
        navigateTo: getPageRoute(tutorPages[pageIndex]),
        startTutor: false,
        continueTutor: true,
        autoScroll: true,
        pageName: tutorPages[pageIndex]
      };
    }
  }
  
  return null;
}

// Check if input is a tutor navigation command
function isTutorNavigationCommand(input) {
  const lower = input.toLowerCase().trim();
  return /^(next|previous|back|continue|keep going|more|show me more|stop|pause|restart|start over|continue tutor|restart tutor|stop tutor|go next|next page|go to|show|open)/.test(lower);
}

// ---------- Enhanced Course System ----------
// Build course price map dynamically from coursesData
function buildCoursePriceMap() {
  const priceMap = {};
  coursesData.forEach(course => {
    priceMap[course.id] = course.cost || 'Contact for pricing';
  });
  return priceMap;
}

// Build course keywords dynamically
function buildCourseKeywords() {
  const keywords = [];
  coursesData.forEach(course => {
    const keywordSet = [course.name.toLowerCase()];
    
    // Add category keywords
    if (course.category) {
      keywordSet.push(course.category.toLowerCase());
    }
    
    // Add specific tech keywords
    if (course.name.includes('HTML') || course.name.includes('CSS')) {
      keywordSet.push('html', 'css', 'frontend', 'web development', 'website');
    }
    if (course.name.includes('JavaScript') || course.name.includes('JS')) {
      keywordSet.push('javascript', 'js', 'frontend', 'programming');
    }
    if (course.name.includes('React')) {
      keywordSet.push('react', 'reactjs', 'frontend', 'ui', 'framework');
    }
    if (course.name.includes('C#')) {
      keywordSet.push('c#', 'c sharp', 'csharp', 'dotnet', '.net', 'backend', 'server');
    }
    if (course.name.includes('Data')) {
      keywordSet.push('data', 'analytics', 'analysis', 'excel', 'power bi', 'sql', 'database');
    }
    if (course.name.includes('Product Design') || course.name.includes('UI/UX')) {
      keywordSet.push('design', 'ui', 'ux', 'product design', 'figma', 'prototype', 'wireframe');
    }
    if (course.name.includes('Cybersecurity')) {
      keywordSet.push('cybersecurity', 'security', 'cyber', 'hacking', 'splunk', 'siem', 'ethical hacking');
    }
    if (course.name.includes('Computer Applications') || course.name.includes('Microsoft Office')) {
      keywordSet.push('office', 'microsoft', 'word', 'excel', 'powerpoint', 'ms office', 'computer basics');
    }
    if (course.name.includes('React Native')) {
      keywordSet.push('react native', 'mobile', 'app', 'android', 'ios', 'mobile development');
    }
    
    keywords.push({
      id: course.id,
      keywords: [...new Set(keywordSet)]
    });
  });
  return keywords;
}

// Get course price map and keywords
const coursePriceMap = buildCoursePriceMap();
const courseKeywords = buildCourseKeywords();

function findCourseMatch(textLower) {
  for (const entry of courseKeywords) {
    for (const kw of entry.keywords) {
      if (textLower.includes(kw.toLowerCase())) {
        return entry.id;
      }
    }
  }
  return null;
}

function buildCoursesOverview(includePrices = true) {
  const categories = {};
  
  // Organize courses by category
  coursesData.forEach((course) => {
    if (!categories[course.category]) {
      categories[course.category] = [];
    }
    categories[course.category].push(course);
  });
  
  let overview = `Here are all our ${coursesData.length} courses organized by ${Object.keys(categories).length} categories:\n\n`;
  
  Object.entries(categories).forEach(([category, courses]) => {
    overview += `**${category}** 📚\n`;
    
    courses.forEach((course) => {
      const price = includePrices ? coursePriceMap[course.id] : null;
      const parts = [course.name];
      if (course.duration) parts.push(`(${course.duration})`);
      if (price) parts.push(`– ${price}`);
      overview += `• ${parts.join(' ')}\n`;
    });
    
    overview += '\n';
  });
  
  overview += `\n**Total:** ${coursesData.length} courses across ${Object.keys(categories).length} categories\n`;
  overview += "\nYou can click each course card on the Courses page to see full details, curriculum, and enrollment options.";
  
  return overview;
}

// Get specific course details
function getCourseDetails(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return null;
  
  const price = coursePriceMap[courseId];
  
  let details = `**${course.name}**\n`;
  details += `📋 **Category:** ${course.category}\n`;
  details += `⏱️ **Duration:** ${course.duration}\n`;
  details += `🕐 **Schedule:** ${course.days}, ${course.time}\n`;
  
  if (price) {
    details += `💰 **Tuition:** ${price}\n`;
  }
  
  details += `\n${course.description}\n\n`;
  details += `**What You'll Learn:**\n`;
  
  if (course.stages && course.stages.length > 0) {
    course.stages.forEach((stage, index) => {
      details += `${index + 1}. ${stage}\n`;
    });
  }
  
  details += `\n**Teaching Approach:** ${course.teachingApproach || 'Hands-on, project-based learning'}\n`;
  details += `**Benefits:** ${course.benefits || 'Job-ready skills for immediate employment'}\n`;
  
  if (course.variants && course.variants.length > 0) {
    details += `\n**Available Options:**\n`;
    course.variants.forEach(variant => {
      details += `• ${variant.duration}: ${variant.cost} (${variant.days}, ${variant.time})\n`;
    });
  }
  
  details += `\n💡 **Advice:** ${course.advice || 'Perfect for beginners. Daily practice is key to mastery.'}`;
  
  return details;
}

// ---------- Enhanced MAIN FUNCTION ----------
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
    } else if (/^(previous|back|go back)/.test(lower)) {
      return handleTutorCommand('previous');
    }
  }
  
  // 0) Enhanced Greetings with tutor status
  if (/^(hi|hello|hey|yo)\b/.test(lower) || /(good (morning|afternoon|evening))/.test(lower)) {
    const state = loadTutorState();
    let tutorStatus = '';
    
    if (state) {
      if (state.active) {
        tutorStatus = `\n📚 **Tutor Active:** You're on page ${state.currentPage + 1} of ${tutorPages.length}. Say "next" to continue or "stop" to pause.`;
      } else if (state.currentPage > 0) {
        tutorStatus = `\n📚 **Tutor Paused:** You've completed ${state.currentPage} of ${tutorPages.length} pages. Say "continue tutor" to resume.`;
      }
    }
    
    return {
      text:
        "Hey there! 👋 I'm ACEDU's friendly AI guide.\n\n" +
        "I can help you with:\n" +
        `1• Explore our ${coursesData.length} courses across ${getCourseCategories().length} categories 🎯\n` +
        "2• Understand pricing & schedules 💰⏱️\n" +
        "3• See real student projects with live demos 🚀\n" +
        "4• Learn about our A.C.E.D.U core values 💎\n" +
        "5• Check upcoming bootcamps including FREE cybersecurity training 🔐\n" +
        "6• Explore our Products & Services 🛒\n" +
        "7• Get information about Hostel accommodation 🏠\n" +
        "8• Enrollment guidance and career advice 📝\n\n" +
        tutorStatus +
        "\n💡 **Try our guided tour!** Say 'SHOW ME AROUND' or 'TELL ME ABOUT ACEDU' for a step-by-step website tour.\n\n" +
        "What would you like to know first?",
    };
  }

  // 0b) Appreciation / thank you 🙏
  if (/(thank you|thanks|appreciate|you helped|you\'re the best)/.test(lower)) {
    const state = loadTutorState();
    let tutorSuggestion = '';
    
    if (state && state.currentPage > 0 && state.currentPage < tutorPages.length) {
      const nextPage = tutorPages[state.currentPage];
      tutorSuggestion = `\n\nYou can also continue your tour by saying "continue tutor" to explore the ${nextPage} page.`;
    }
    
    return {
      text:
        "You're very welcome! 🙏😊\n\n" +
        "If you'd like, I can now:\n" +
        "• Suggest a course based on your background\n" +
        "• Show you our upcoming bootcamps including the free cybersecurity training\n" +
        "• Explain our A.C.E.D.U core values\n" +
        "• Guide you to our Products page for business solutions\n" +
        "• Show you our Hostel facilities with interactive tour\n" +
        "• Help with registration and hostel accommodation options" +
        tutorSuggestion,
    };
  }

  // Goodbye message
  if (/(bye|goodbye|see you|later|farewell)/.test(lower)) {
    return {
      text:
        "Always here for you 😊\n\n" +
        "Remember, you can always come back and:\n" +
        "• Say 'show me around' for a website tour\n" +
        "• Ask about courses, pricing, or hostel\n" +
        "• Get enrollment assistance\n" +
        "• Learn about our products and services\n\n" +
        "Have a great day! 👋"
    };
  }

  // 1) Products / Services inquiries
  if (/(products?|services?|solutions?|software development|6|website development|clever school|school portal|school management)/.test(lower)) {
    let productText = "**ACEDU Products & Services** 🛒\n\n";
    
    productsData.forEach((product, index) => {
      productText += `${index + 1}. **${product.name}**\n`;
      productText += `   ${product.description}\n`;
      
      if (product.benefits && product.benefits.length > 0) {
        productText += `   Key Benefits: ${product.benefits.slice(0, 3).join(', ')}\n`;
      }
      
      productText += '\n';
    });
    
    // Special mention for Clever School Portal
    const cleverPortal = productsData.find(p => p.name === "Clever School Portal");
    if (cleverPortal) {
      productText += `\n**${cleverPortal.name} Special Features:**\n`;
      productText += `• Managing ${cleverPortal.successMetrics?.schoolsManaged || '15+'} schools\n`;
      productText += `• Serving ${cleverPortal.successMetrics?.studentsServed?.toLocaleString() || '25,000+'} students\n`;
      productText += `• ${cleverPortal.successMetrics?.successRate || '95'}% success rate\n`;
    }
    
    productText += "\nI've opened the Products page for you to explore all our solutions in detail.";
    
    return {
      text: productText,
      navigateTo: '/products',
    };
  }

  
  // 2) Hostel / Accommodation detailed inquiries
  if (/(hostel|accommodation|stay|residence|7|dorm|housing|room|living|accomodation)/.test(lower)) {
    let hostelText = "**ACEDU Student Hostel** 🏠\n\n";
    hostelText += `${hostelData.overview.description}\n\n`;
    
    hostelText += "**Key Sections:**\n";
    hostelData.sections.forEach((section, index) => {
      hostelText += `${index + 1}. ${section.title}\n`;
    });
    
    hostelText += `\n**Pricing Options:**\n`;
    hostelText += `• Shared Room: ${hostelData.pricing.sharedRoom}\n`;
    hostelText += `• Private Room: ${hostelData.pricing.privateRoom}\n\n`;
    
    hostelText += "**All Plans Include:**\n";
    hostelText += hostelData.pricing.includes.map(item => `• ${item}`).join('\n');
    
    hostelText += "\n**Special Feature:** Interactive audio tour with female voice narration!\n";
    hostelText += "You can take a guided tour that reads out each section and auto-scrolls through the page.";
    
    hostelText += "\n\nI've opened the Hostel page where you can explore all facilities and start the interactive tour.";
    
    return {
      text: hostelText,
      navigateTo: '/hostel',
    };
  }

  // 3) Interactive Tour feature for hostel
  if (/(tour|audio tour|voice tour|guided tour|interactive tour)/.test(lower) && lower.includes('hostel')) {
    return {
      text:
        "**Hostel Interactive Audio Tour** 🎧\n\n" +
        "Our hostel page features an interactive audio tour with:\n" +
        "• Female voice narration 👩\n" +
        "• Auto-scrolling through each section 🔄\n" +
        "• Progress saving to localStorage 💾\n" +
        "• Visual highlighting of current section ✨\n" +
        "• Pause/Resume functionality ⏯️\n\n" +
        "**How it works:**\n" +
        "1. Click the round black play button on the left\n" +
        "2. The tour starts from your current position\n" +
        "3. Voice reads each section description\n" +
        "4. Page auto-scrolls to highlight each section\n" +
        "5. Progress is saved automatically\n\n" +
        "I've opened the Hostel page where you can experience this interactive tour!",
      navigateTo: '/hostel',
    };
  }

  // 4) Registration / Enrollment 📝
  if (/(register|enrol|enroll|8|apply|sign ?up|join)/.test(lower)) {
    return {
      text:
        "Great choice! 🎉 You can register directly online.\n\n" +
        `We offer ${coursesData.length} different courses across ${getCourseCategories().length} categories with flexible options:\n` +
        "• 4-week or 6-week durations for some courses\n" +
        "• Monday-Friday or thrice weekly schedules\n" +
        "• Hostel accommodation available for full-time students\n" +
        "• Payment plans available\n" +
        "• Products & Services for businesses and schools\n\n" +
        "If you're not sure which course to pick, tell me your background (e.g. *absolute beginner*, *some HTML*, *some Python*) and your goal (e.g. *frontend*, *data*, *cybersecurity*, *design*).\n\n" +
        "I've opened the registration page for you.",
      navigateTo: '/register',
    };
  }



  // 5) Student projects / portfolio 🚀
  if (/(project|portfolio|showcase|3|demo|capstone|student work)/.test(lower)) {
    const sampleProjects = projectsData.slice(0, 3);
    let projectText = "Our students build real-world applications like:\n\n";
    
    sampleProjects.forEach(project => {
      projectText += `**${project.projectName}** by ${project.ownerName}\n`;
      projectText += `• ${project.reason}\n`;
      projectText += `• Tech: ${project.techStack.join(', ')}\n\n`;
    });
    
    projectText += `**Total Projects:** ${projectsData.length}+ student projects\n`;
    projectText += "I've opened the Projects page so you can explore more of what our students have built, including live demos and code repositories.";
    
    return {
      text: projectText,
      navigateTo: '/projects',
    };
  }

  // 6) CEO / Founder specifically
  if (/(ceo|founder|owner|leadership|who started|who created|dr\.|doctor|michael|rodriguez)/.test(lower)) {
    return {
      text:
        `Our founder and CEO, **${ceoDatas.name}**, ${ceoDatas.bio}\n\n` +
        `"${ceoDatas.quote}"\n\n` +
        `**Achievements:** ${ceoDatas.achievements.join(', ')}\n` +
        `**Experience:** ${ceoDatas.stats?.find(s => s.label === 'Years Experience')?.value || '15+'}\n` +
        `**Students Mentored:** ${ceoDatas.stats?.find(s => s.label === 'Students Mentored')?.value || '5000+'}\n\n` +
        "Connect with our CEO on LinkedIn to learn more about our vision and leadership.",
      navigateTo: '/',
      scrollToSectionId: 'about-ceo-section',
    };
  }

  // 7) About ACEDU / Bootcamp / Program
  if (
    /(about acedu|about the program|about the bootcamp|4|about this program|about this bootcamp|what is acedu|who are you|tell me about acedu|about your company)/.test(lower) ||
    (/^about$/.test(lower) && !/(ceo|founder|owner)/.test(lower))
  ) {
    // Extract about content dynamically
    let aboutText = "**About ACEDU Coding Bootcamp**\n\n";
    
    aboutContentData.forEach((section) => {
      if (section.type === 'intro' && section.paragraphs) {
        aboutText += section.paragraphs.join('\n\n') + '\n\n';
      }
      if (section.type === 'whyBootcamp') {
        aboutText += `**${section.title}**\n${section.text}\n\n`;
      }
      if (section.type === 'coreValues') {
        aboutText += `**Our A.C.E.D.U Core Values:**\n`;
        section.values?.forEach(value => {
          aboutText += `• **${value.letter} - ${value.title}:** ${value.text.split('.')[0]}.\n`;
        });
        aboutText += '\n';
      }
    });
    
    aboutText += "**Our Vision:** To help at least 5,000 individuals yearly to become IT Experts.\n\n";
    aboutText += "**Our Mission:** To produce IT Experts locally that will compete well anywhere in the world.\n\n";
    aboutText += "I've navigated you to our About page where you can learn more about our story, mission, and values.";
    
    return {
      text: aboutText,
      navigateTo: '/about',
    };
  }

  // 8) Values / Vision / Mission
  if (/(values|vision|mission|core values|principles|2|d\.i\.g\.i\.t\.a\.l)/.test(lower) && !/(ceo|founder)/.test(lower)) {
    const coreValues = aboutContentData.find(section => section.type === 'coreValues');
    let valuesText = "**Our A.C.E.D.U Core Values:**\n\n";
    
    if (coreValues?.values) {
      coreValues.values.forEach(value => {
        valuesText += `**${value.letter} - ${value.title}**\n`;
        valuesText += `${value.text}\n`;
        if (value.author) valuesText += `- ${value.author}\n`;
        valuesText += '\n';
      });
    }
    
    valuesText += "**Our Vision:** To help at least 5,000 individuals yearly to become IT Experts.\n\n";
    valuesText += "**Our Mission:** To produce IT Experts locally that will compete well anywhere in the world.\n\n";
    valuesText += "These values guide everything we do at ACEDU Coding Bootcamp.";
    
    return {
      text: valuesText,
      navigateTo: '/about',
    };
  }

  // 9) Upcoming bootcamps / next batch / schedule 📅
  if (
    /(upcoming|next batch|start date|when does.*bootcamp|bootcamp date|schedule|cybersecurity|free|splunk)/.test(
      lower
    )
  ) {
    let bootcampText = "**Upcoming Bootcamps at ACEDU:**\n\n";
    
    upcomingBootcampsData.forEach((bootcamp, index) => {
      bootcampText += `${index + 1}. **${bootcamp.name}**\n`;
      bootcampText += `   📍 ${bootcamp.place}\n`;
      bootcampText += `   📅 ${bootcamp.date}\n`;
      bootcampText += `   🕐 ${bootcamp.time}\n`;
      bootcampText += `   ⏱️ ${bootcamp.duration}\n`;
      bootcampText += `   ${bootcamp.benefit}\n\n`;
    });
    
    bootcampText += "**Special Offer:** We have a **FREE Cybersecurity Bootcamp** focusing on Splunk Fundamentals and SIEM!\n";
    bootcampText += "Dates and times will be communicated via WhatsApp. Click the link in our bio to secure your spot!";
    
    return {
      text: bootcampText,
      navigateTo: '/',
      scrollToSectionId: 'bootcamps-section',
    };
  }

  // 10) Alumni / jobs / success stories 💼
  if (/(alumni|graduate|graduates|success story|got job|hired|placement)/.test(lower)) {
    const sampleAlumni = alumniDatas.slice(0, 4);
    let alumniText = "Our alumni have gone on to work at top companies around the world 🌍:\n\n";
    
    sampleAlumni.forEach((alumni) => {
      alumniText += `**${alumni.name}**\n`;
      alumniText += `• ${alumni.skill} at ${alumni.company}\n`;
      alumniText += `• ${alumni.location}\n`;
      alumniText += `• "${alumni.quote}"\n\n`;
    });
    
    alumniText += "**Total Alumni:** 5000+ students mentored globally\n";
    alumniText += "You'll build real projects, get interview prep, and ongoing career support so you can follow a similar path.";
    
    return {
      text: alumniText,
      navigateTo: '/',
      scrollToSectionId: 'alumni-section',
    };
  }

  // 11) Contact / email / phone 📞
  if (/(contact|phone|email|reach|call|whats?app|support)/.test(lower)) {
    return {
      text:
        "**Contact Information** 📞📧\n\n" +
        "You can reach us anytime:\n" +
        "• **Phone:** (+234) 7048606767\n" +
        "• **Email:** Info@acedu.camp\n" +
        "• **Location:** 77 Yaya Abatan Road, Maternity Bus-Stop, Ogba, Lagos State (101232)\n" +
        "• **Hostel Accommodation:** Available for full-time students\n" +
        "• **WhatsApp:** Available for quick queries\n\n" +
        "**Social Media:**\n" +
        "• LinkedIn, Twitter, TikTok, Instagram, YouTube\n\n" +
        "**Business Hours:**\n" +
        "• Monday - Friday: 8:00 AM - 6:00 PM\n" +
        "• Saturday: 9:00 AM - 4:00 PM\n\n" +
        "I've scrolled you down so you can see all the contact options clearly.",
      navigateTo: '/',
      scrollToSectionId: 'footer',
    };
  }

  // 12) Location / address / map 🗺️
  if (/(location|acedu location|where is acedu|how to locate acedu|map|address|ogba|lagos)/.test(lower)) {
    return {
      text:
        "**ACEDU Coding Bootcamp Location** 🗺️\n\n" +
        "📍 **Address:** 77 Yaya Abatan Road, Maternity Bus-Stop, Ogba, Lagos State (101232)\n\n" +
        "**Features:**\n" +
        "• Easy access from major bus stops\n" +
        "• Conducive learning environment\n" +
        "• Hostel accommodation available for full-time students\n" +
        "• State-of-the-art computer labs\n" +
        "• Free Wi-Fi and power backup\n" +
        "• Security and 24/7 surveillance\n\n" +
        "**Transportation:**\n" +
        "• Accessible by public transport (buses, taxis)\n" +
        "• Safe and secure neighborhood\n" +
        "• Ample parking space available\n" +
        "• Close to markets and restaurants\n\n" +
        "I've scrolled to our location section where you can see the map and get directions.",
      navigateTo: '/',
      scrollToSectionId: 'footer',
    };
  }

  // 13) "Why this course" / who is it for ❓
  if (/(why this course|who is this for|is this path right for me|why acedu|which course)/.test(lower)) {
    return {
      text:
        "Great question! 🎯 Our bootcamp is perfect for:\n\n" +
        "• **Beginners** who want a structured path into tech 👶💻\n" +
        "• **Career changers** moving from non-tech fields 🔁\n" +
        "• **Freelancers** who want to offer dev services worldwide 🌍\n" +
        "• **Founders & entrepreneurs** building their own products 🚀\n" +
        "• **Students** looking for after-school programs or summer coding 🎓\n" +
        "• **Professionals** wanting to upskill in specific areas 📈\n" +
        "• **Business owners** needing tech solutions 🏢\n" +
        "• **Schools** needing management systems 🏫\n\n" +
        `We offer ${coursesData.length} courses across ${getCourseCategories().length} categories:\n` +
        "1. Frontend Development (HTML, CSS, JS, React)\n" +
        "2. Backend Development (C# .NET)\n" +
        "3. Data Analytics (Excel, Power BI, SQL)\n" +
        "4. Product Design (UI/UX Beginner & Advanced)\n" +
        "5. Cybersecurity (Beginner & Advanced)\n" +
        "6. Computer Applications (Microsoft Office)\n" +
        "7. Mobile Development (React Native)\n\n" +
        "Tell me your background and goals, and I'll recommend the perfect course!",
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 14) Courses - general inquiry
  const mentionsCourseWord = lower.includes('course')  || lower.includes('courses') || lower.includes('program') || lower.includes('class') || lower.includes('1');
  const matchedCourseId = findCourseMatch(lower);

  // Specific course (matched by keywords)
  if (matchedCourseId) {
    const courseDetails = getCourseDetails(matchedCourseId);
    if (courseDetails) {
      return {
        text: courseDetails,
        navigateTo: `/course/${matchedCourseId}`,
      };
    }
  }

  // Course questions (no specific match)
  if (mentionsCourseWord) {
    const overview = buildCoursesOverview(true);
    return {
      text: `**ACEDU Coding Bootcamp Courses**\n\n${overview}`,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 15) Tech domains / categories
  if (/(frontend|front end|html|css|javascript|js|react)/.test(lower) && !/(native)/.test(lower)) {
    const frontendCourses = getCoursesByCategory('Frontend Development');
    let frontendText = "**Frontend Development Courses** 🎨\n\n";
    
    frontendCourses.forEach(course => {
      frontendText += `**${course.name}**\n`;
      frontendText += `• Duration: ${course.duration}\n`;
      frontendText += `• Schedule: ${course.days}, ${course.time}\n`;
      frontendText += `• Tuition: ${course.cost}\n`;
      frontendText += `• ${course.description}\n\n`;
    });
    
    frontendText += "**Recommended Path:**\n";
    frontendText += "1. Start with **Frontend Developer** (HTML, CSS, JS)\n";
    frontendText += "2. Progress to **Intermediate JavaScript**\n";
    frontendText += "3. Master **React Development**\n\n";
    frontendText += "This path prepares you for frontend roles at companies worldwide.";
    
    return {
      text: frontendText,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  if (/(data|data analysis|analytics|analyst|excel|power bi|sql)/.test(lower)) {
    const dataCourse = coursesData.find(c => c.id === 5);
    if (dataCourse) {
      return {
        text: getCourseDetails(5),
        navigateTo: '/',
        scrollToSectionId: 'courses-section',
      };
    }
  }

  if (/(cyber|security|hacking|splunk|siem)/.test(lower)) {
    const cyberCourses = getCoursesByCategory('Cybersecurity');
    let cyberText = "**Cybersecurity Courses** 🔐\n\n";
    
    cyberCourses.forEach(course => {
      cyberText += `**${course.name}**\n`;
      cyberText += `• Duration: ${course.duration}\n`;
      cyberText += `• Schedule: ${course.days}, ${course.time}\n`;
      cyberText += `• Tuition: ${course.cost}\n`;
      cyberText += `• ${course.description}\n\n`;
    });
    
    cyberText += "**Bonus:** We also offer a **FREE Cybersecurity Bootcamp** focusing on Splunk!\n";
    cyberText += "Dates and times will be communicated via WhatsApp. Perfect foundation for security careers.";
    
    return {
      text: cyberText,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  if (/(design|ui|ux|product design|figma|prototype)/.test(lower)) {
    const designCourses = getCoursesByCategory('Design');
    let designText = "**Product Design (UI/UX) Courses** 🎨\n\n";
    
    designCourses.forEach(course => {
      designText += `**${course.name}**\n`;
      designText += `• Duration: ${course.duration}\n`;
      designText += `• Schedule: ${course.days}, ${course.time}\n`;
      designText += `• Tuition: ${course.cost}\n`;
      designText += `• ${course.description}\n\n`;
    });
    
    designText += "**Career Path:**\n";
    designText += "• UI/UX Designer\n• Product Designer\n• Interaction Designer\n• Design Lead\n\n";
    designText += "High demand in tech companies, startups, and agencies.";
    
    return {
      text: designText,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  if (/(backend|c#|c sharp|dotnet|\.net|server)/.test(lower)) {
    const backendCourse = coursesData.find(c => c.id === 4);
    if (backendCourse) {
      return {
        text: getCourseDetails(4),
        navigateTo: '/',
        scrollToSectionId: 'courses-section',
      };
    }
  }

  if (/(office|microsoft|word|excel|powerpoint|computer applications)/.test(lower)) {
    const officeCourse = coursesData.find(c => c.id === 10);
    if (officeCourse) {
      return {
        text: getCourseDetails(10),
        navigateTo: '/',
        scrollToSectionId: 'courses-section',
      };
    }
  }

  if (/(mobile|app|react native|android|ios)/.test(lower)) {
    const mobileCourse = coursesData.find(c => c.id === 11);
    if (mobileCourse) {
      return {
        text: getCourseDetails(11),
        navigateTo: '/',
        scrollToSectionId: 'courses-section',
      };
    }
  }

  // 16) Pricing / cost / fees 💰
  if (/(price|pricing|cost|fee|fees|how much|tuition|payment)/.test(lower)) {
    const overview = buildCoursesOverview(true);
    return {
      text: `**Course Pricing at ACEDU** 💰\n\n${overview}\n\n**Note:** Some courses offer multiple duration options (4-week or 6-week). Contact us for payment plan options.\n\n**Hostel Pricing:**\n• Shared Room: ${hostelData.pricing.sharedRoom}\n• Private Room: ${hostelData.pricing.privateRoom}`,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 17) Schedule / timing ⏰
  if (/(schedule|timing|time|days|when|hours)/.test(lower) && !/(bootcamp|upcoming)/.test(lower)) {
    let scheduleText = "**Course Schedules at ACEDU** ⏰\n\n";
    
    // Group by schedule type
    const dailyCourses = coursesData.filter(c => c.days === 'Monday - Friday');
    const weeklyCourses = coursesData.filter(c => c.days === 'Thrice a week');
    
    scheduleText += "**Monday - Friday (Full-time Intensive):**\n";
    dailyCourses.forEach(course => {
      scheduleText += `• ${course.name}: ${course.time}\n`;
    });
    
    scheduleText += "\n**Thrice a Week (Part-time Flexible):**\n";
    weeklyCourses.forEach(course => {
      scheduleText += `• ${course.name}: ${course.time}\n`;
    });
    
    scheduleText += "\n**After-School Program:**\n";
    scheduleText += "• Mon-Thu: 3:30PM – 5:00PM\n";
    scheduleText += "• Fri: 3:00PM – 5:00PM\n\n";
    
    scheduleText += "**Summer Coding Program (June-August):**\n";
    scheduleText += "• Mon-Fri: 9:00AM – 3:00PM\n\n";
    
    scheduleText += "**Hostel Tour:** Available anytime (self-paced audio tour)\n\n";
    scheduleText += "Choose the schedule that fits your availability!";
    
    return {
      text: scheduleText,
      navigateTo: '/',
      scrollToSectionId: 'courses-section',
    };
  }

  // 18) Help / what can you do
  if (/(help|what can you do|how can you help|capabilities)/.test(lower)) {
    const state = loadTutorState();
    let tutorInfo = '';
    
    if (state) {
      tutorInfo = `\n\n**Tutor Status:** ${state.active ? 'Active' : 'Inactive'} - ${state.currentPage}/${tutorPages.length} pages completed`;
    }
    
    return {
      text:
        "**How I Can Help You** 🤝\n\n" +
        "**Navigation & Tour:**\n" +
        "• 'Show me around' - Full website tour\n" +
        "• 'Go to [page]' - Jump to specific page\n" +
        "• 'Next/Previous' - Navigate tour pages\n" +
        "• 'Stop tour' - Pause the tour\n\n" +
        "**Course Information:**\n" +
        `• All ${coursesData.length} courses with pricing\n` +
        "• Course recommendations\n" +
        "• Schedule and duration details\n" +
        "• Career paths and benefits\n\n" +
        "**Products & Services:**\n" +
        "• Clever School Portal information\n" +
        "• Software development services\n" +
        "• Website development & management\n" +
        "• Tech education solutions\n\n" +
        "**Hostel & Accommodation:**\n" +
        "• Hostel facilities and pricing\n" +
        "• Interactive audio tour details\n" +
        "• Accommodation features\n\n" +
        "**General Information:**\n" +
        "• Contact details and location\n" +
        "• Upcoming bootcamps\n" +
        "• Student projects and alumni\n" +
        "• Enrollment process\n" +
        "• A.C.E.D.U core values\n" +
        tutorInfo +
        "\n\n**Just ask me anything!** I'm here to help you explore everything ACEDU has to offer.",
      navigateTo: undefined,
    };
  }

  // 19) Very general fallback with comprehensive options
  const state = loadTutorState();
  let tutorPrompt = '';
  
  if (state && state.currentPage > 0) {
    const currentPage = tutorPages[state.currentPage];
    tutorPrompt = `\n\n💡 **Continue your tour!** You were exploring the ${currentPage} page. Say "continue tutor" to resume.`;
  } else {
    tutorPrompt = "\n\n💡 **Try our guided tour!** Say 'SHOW ME AROUND' or 'TELL ME ABOUT ACEDU' for a step-by-step website tour.";
  }
  
  return {
    text:
      "I'm ACEDU's smart guide 🤝\n\n" +
      "**I can help you with:**\n" +
      `• All ${coursesData.length} courses across ${getCourseCategories().length} categories 📚\n` +
      "• Course recommendations based on your background 🎯\n" +
      "• Pricing & schedules with flexible options 💰⏱️\n" +
      "• Free Cybersecurity Bootcamp with Splunk training 🔐\n" +
      "• Hostel accommodation with interactive audio tour 🏠\n" +
      "• Student projects with live demos 🚀\n" +
      "• Products & Services for businesses 🛒\n" +
      "• Clever School Portal for institutions 🏫\n" +
      "• Our A.C.E.D.U core values 💎\n" +
      "• Enrollment process and payment plans 📝\n" +
      tutorPrompt +
      "\n\n**Ask me anything like:**\n" +
      "• 'Which course is best for absolute beginners?'\n" +
      "• 'Tell me about the free cybersecurity training'\n" +
      "• 'What are your A.C.E.D.U values?'\n" +
      "• 'Show me the hostel interactive tour'\n" +
      "• 'Tell me about Clever School Portal'\n" +
      "• 'How do I enroll in React course?'\n" +
      "• 'What products do you offer?'\n" +
      "• 'Show me student projects'",
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

export function completeTutorPage(pageName) {
  const state = loadTutorState();
  if (state && !state.completedPages) state.completedPages = [];
  if (state && !state.completedPages.includes(pageName)) {
    state.completedPages.push(pageName);
    saveTutorState(state);
  }
}

export function getTutorProgress() {
  const state = loadTutorState();
  if (!state) return { current: 0, total: tutorPages.length, percentage: 0 };
  
  const percentage = Math.round((state.currentPage / tutorPages.length) * 100);
  return {
    current: state.currentPage + 1,
    total: tutorPages.length,
    percentage: percentage,
    active: state.active,
    currentPageName: tutorPages[state.currentPage]
  };
}