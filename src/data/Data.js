// src/data/coursesData.js

import { List } from "lucide-react";

// src/data/Data.js (or wherever your coursesData is located)
export const coursesData = [
  // ========== FRONTEND DEVELOPER CATEGORY ==========
  {
    id: 1,
    name: "Frontend Developer (Full Stack)",
    category: "Frontend Development",
    description: "Master the complete frontend stack including Git, HTML, CSS, Bootstrap, jQuery, and JavaScript for modern web development.",
    duration: "4 Weeks", // 6 weeks option available
    time: "9AM - 2PM",
    stages: ["Git & Version Control", "HTML5 & CSS3", "Bootstrap Framework", "jQuery", "JavaScript Fundamentals", "Responsive Design"],
    longDescription: "This comprehensive frontend course covers everything from basic HTML/CSS to advanced JavaScript. You'll learn Git for version control, Bootstrap for rapid prototyping, jQuery for DOM manipulation, and modern JavaScript for interactive web applications. Perfect for beginners starting their web development journey.",
    advice: "Perfect for absolute beginners. Start with HTML/CSS fundamentals before moving to JavaScript. Daily practice is key to mastering frontend development.",
    teachingApproach: "Hands-on projects, daily coding exercises, and real-world website building. Learn by creating actual websites from scratch.",
    benefits: "High demand worldwide. Essential for web developers, UI developers, and anyone looking to build modern websites. Foundation for React and other frameworks.",
    chatAdvisor: "frontend-advisor",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2348105642986",
    cost: "₦97,500 (4 weeks) / ₦127,500 (6 weeks)",
    days: "Monday - Friday",
    variants: [
      { duration: "4 Weeks", cost: "₦97,500", days: "Mon - Fri", time: "9AM - 2PM" },
      { duration: "6 Weeks", cost: "₦127,500", days: "Mon - Fri", time: "9AM - 2PM" }
    ]
  },
  {
    id: 2,
    name: "Intermediate JavaScript",
    category: "Frontend Development",
    description: "Deep dive into advanced JavaScript concepts, ES6+ features, asynchronous programming, and modern JS patterns.",
    duration: "9 Weeks",
    time: "9AM - 2PM",
    stages: ["ES6+ Features", "Async Programming", "DOM Manipulation", "APIs & Fetch", "Modern Patterns", "Advanced Concepts"],
    longDescription: "Take your JavaScript skills to the next level with this intermediate course. Learn modern ES6+ syntax, asynchronous programming with async/await, fetch API, advanced DOM manipulation, and design patterns used in professional development.",
    advice: "Basic JavaScript knowledge required. Focus on understanding closures, promises, and async patterns which are crucial for modern web apps.",
    teachingApproach: "Project-based learning with real-world applications. Build complex features and understand performance optimization.",
    benefits: "Advanced JavaScript skills are highly sought after. Opens doors to senior frontend roles and full-stack opportunities.",
    chatAdvisor: "javascript-advisor",
    bgImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2348105642986",
    cost: "₦170,000",
    days: "Monday - Friday"
  },
  {
    id: 3,
    name: "React Development",
    category: "Frontend Development",
    description: "Build modern web applications with React.js. Learn components, hooks, state management, and routing.",
    duration: "8 Weeks",
    time: "9AM - 2PM",
    stages: ["React Components", "Hooks & State", "React Router", "Context API", "API Integration", "Advanced Patterns"],
    longDescription: "React is the most popular library for building modern user interfaces. Learn how to create reusable components, manage state with hooks, implement routing, and connect to backend APIs. Build scalable frontend applications used by companies worldwide.",
    advice: "Strong JavaScript fundamentals are essential. Focus on understanding component lifecycle and state management patterns.",
    teachingApproach: "Build a complete React application from scratch. Each module adds new features while reinforcing core concepts.",
    benefits: "React developers are in high demand globally. Skills transfer to React Native for mobile development.",
    chatAdvisor: "react-advisor",
    bgImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2348105642986",
    cost: "₦314,500",
    days: "Monday - Friday"
  },

  // ========== BACKEND DEVELOPER CATEGORY ==========
  {
    id: 4,
    name: "Backend Developer (C# .NET)",
    category: "Backend Development",
    description: "Master backend development with C# and .NET. Learn database integration, API development, and server-side programming.",
    duration: "12 Weeks",
    time: "9AM - 2PM",
    stages: ["C# Fundamentals", "Object-Oriented Programming", ".NET Core", "Database Design", "API Development", "Security & Deployment"],
    longDescription: "Become a professional backend developer with C# and .NET. Learn to build robust APIs, work with databases, implement authentication, and deploy scalable applications. C# is widely used in enterprise applications, fintech, and large-scale systems.",
    advice: "Some programming experience helpful but not required. Practice building small APIs and gradually increase complexity.",
    teachingApproach: "Build a complete backend system step by step. Learn database design, API architecture, and deployment strategies.",
    benefits: "C#/.NET developers are highly paid in enterprise, banking, and government sectors. Strong job security and career growth.",
    chatAdvisor: "backend-advisor",
    bgImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2348105642986",
    cost: "₦688,500",
    days: "Monday - Friday"
  },

  // ========== DATA ANALYTICS CATEGORY ==========
  {
    id: 5,
    name: "Data Analytics",
    category: "Data Science",
    description: "Master data analysis with Excel, Power BI, and SQL. Learn to extract insights and create visual dashboards.",
    duration: "8 Weeks",
    time: "10AM - 2PM",
    stages: ["Excel Advanced", "Power BI", "SQL Queries", "Data Visualization", "Dashboard Design", "Business Insights"],
    longDescription: "Transform raw data into actionable insights. Learn advanced Excel functions, create interactive dashboards with Power BI, write SQL queries for data extraction, and present findings to stakeholders. Essential for business analysts, marketers, and decision-makers.",
    advice: "No prior experience needed. Start with Excel basics and progress to advanced analysis. Practice with real datasets.",
    teachingApproach: "Hands-on projects with business datasets. Build portfolio of dashboards and analysis reports.",
    benefits: "Data skills are in high demand across all industries. Become the go-to analyst in any organization.",
    chatAdvisor: "data-analytics-advisor",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦150,000",
    days: "Thrice a week"
  },

  // ========== PRODUCT DESIGN CATEGORY ==========
  {
    id: 6,
    name: "Product Design (UI/UX) - Beginner to Intermediate",
    category: "Design",
    description: "Learn user interface and user experience design fundamentals. Create intuitive, beautiful digital products.",
    duration: "6 Weeks",
    time: "10AM - 2PM",
    stages: ["Design Principles", "User Research", "Wireframing", "Prototyping", "UI Design", "Design Systems"],
    longDescription: "Master the complete product design process from user research to final UI. Learn design thinking, create wireframes and prototypes, design beautiful interfaces, and understand how to build design systems used by top companies.",
    advice: "No design background needed. Focus on understanding user needs and solving problems through design.",
    teachingApproach: "Project-based learning. Design real products from concept to high-fidelity prototypes.",
    benefits: "UI/UX designers are highly sought after in tech companies. Skills applicable to web, mobile, and software design.",
    chatAdvisor: "design-advisor",
    bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦150,000",
    days: "Thrice a week"
  },
  {
    id: 7,
    name: "Product Design (UI/UX) - Advanced",
    category: "Design",
    description: "Advanced UI/UX techniques, design systems, prototyping, and product strategy for experienced designers.",
    duration: "6 Weeks",
    time: "10AM - 2PM",
    stages: ["Advanced Prototyping", "Design Systems", "UX Research", "Product Strategy", "Team Leadership", "Portfolio Development"],
    longDescription: "Take your design skills to expert level. Learn advanced prototyping techniques, build comprehensive design systems, conduct user research, develop product strategy, and lead design teams. For designers ready to move into senior roles.",
    advice: "Basic UI/UX knowledge required. Focus on building a strong portfolio that showcases complex problem-solving.",
    teachingApproach: "Work on real client projects, build design systems, and develop leadership skills.",
    benefits: "Qualifies you for senior design roles, design leadership positions, and product management opportunities.",
    chatAdvisor: "design-advanced-advisor",
    bgImage: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦200,000",
    days: "Thrice a week"
  },

  // ========== CYBER SECURITY CATEGORY ==========
  {
    id: 8,
    name: "Cybersecurity - Beginner to Intermediate",
    category: "Cybersecurity",
    description: "Learn networking fundamentals, operating system security, cryptography, and security best practices.",
    duration: "6 Weeks",
    time: "10AM - 1PM",
    stages: ["Networking Fundamentals", "OS Security", "Cryptography Basics", "Threat Analysis", "Security Best Practices", "Vulnerability Assessment"],
    longDescription: "Start your cybersecurity career with this comprehensive beginner course. Learn how networks work, secure operating systems, understand encryption, identify threats and vulnerabilities, and implement security best practices. Build a strong foundation for advanced security roles.",
    advice: "No prior experience needed. Stay curious and always think from both attacker and defender perspectives.",
    teachingApproach: "Hands-on labs, simulated attacks, and real-world security scenarios in safe environments.",
    benefits: "Cybersecurity professionals are in extremely high demand globally with excellent salary prospects.",
    chatAdvisor: "cybersecurity-beginner-advisor",
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦150,000",
    days: "Thrice a week"
  },
  {
    id: 9,
    name: "Cybersecurity - Advanced",
    category: "Cybersecurity",
    description: "Advanced threat analysis, incident response, Splunk, and AI in security for cybersecurity professionals.",
    duration: "6 Weeks",
    time: "10AM - 1PM",
    stages: ["Advanced Threat Analysis", "Incident Response", "Splunk & SIEM", "AI in Security", "Penetration Testing", "Security Architecture"],
    longDescription: "Master advanced cybersecurity concepts including sophisticated threat analysis, incident response procedures, working with Splunk for security monitoring, and understanding how AI is transforming security. For professionals ready to tackle complex security challenges.",
    advice: "Intermediate cybersecurity knowledge required. Focus on developing analytical thinking and problem-solving skills.",
    teachingApproach: "Case studies of real breaches, advanced labs, and incident response simulations.",
    benefits: "Qualifies you for senior security roles, security architecture positions, and security consultancy.",
    chatAdvisor: "cybersecurity-advanced-advisor",
    bgImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦200,000",
    days: "Thrice a week"
  },

  // ========== COMPUTER APPLICATIONS CATEGORY ==========
  {
    id: 10,
    name: "Computer Applications (Microsoft Office)",
    category: "Office Skills",
    description: "Master Microsoft Word, Excel, and PowerPoint for professional and business use.",
    duration: "6 Weeks",
    time: "10AM - 1PM",
    stages: ["Microsoft Word", "Microsoft Excel", "PowerPoint", "Document Formatting", "Data Analysis", "Professional Presentations"],
    longDescription: "Become proficient in the Microsoft Office suite essential for every professional. Learn advanced Word formatting, Excel formulas and data analysis, and create compelling PowerPoint presentations. These skills are fundamental for office jobs across all industries.",
    advice: "Perfect for beginners. Start with the basics and gradually learn advanced features through practice.",
    teachingApproach: "Practical exercises creating real documents, spreadsheets, and presentations used in business.",
    benefits: "Essential skills for office jobs, administration, management, and any business professional.",
    chatAdvisor: "office-advisor",
    bgImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦150,000",
    days: "Thrice a week"
  },

  // ========== APP DEVELOPMENT CATEGORY ==========
  {
    id: 11,
    name: "React Native App Development",
    category: "Mobile Development",
    description: "Build cross-platform mobile apps with React Native and Firebase. Frontend + Backend mobile development.",
    duration: "12 Weeks",
    time: "10AM - 2PM",
    stages: ["React Native Basics", "Mobile UI Design", "Navigation", "Firebase Integration", "State Management", "App Deployment"],
    longDescription: "Learn to build professional mobile applications for both iOS and Android using React Native. Create beautiful mobile interfaces, implement navigation, integrate Firebase for backend services, manage app state, and deploy to app stores. Build once, run on both platforms.",
    advice: "Basic JavaScript/React knowledge recommended. Focus on mobile-specific design patterns and performance optimization.",
    teachingApproach: "Build a complete mobile app from scratch with real backend integration and deployment.",
    benefits: "Mobile app developers are in high demand. Skills allow you to build apps for startups and enterprises.",
    chatAdvisor: "mobile-advisor",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    link: "https://wa.me/+2347048606767",
    cost: "₦350,000",
    days: "Thrice a week"
  }
];


// Helper function to get unique categories
export const getCourseCategories = () => {
  const categories = coursesData.map(course => course.category);
  return [...new Set(categories)];
};

// Helper function to get courses by category
export const getCoursesByCategory = (category) => {
  return coursesData.filter(course => course.category === category);
};

// Export all categories as an array
export const courseCategories = [
  "Frontend Development",
  "Backend Development", 
  "Data Science",
  "Design",
  "Cybersecurity",
  "Office Skills",
  "Mobile Development"
];

// src/data/projectsData.js

export const projectsData = [
  {
    id: 1,
    ownerName: "Adaeze Okafor",
    projectName: "CampusConnect",
    year: "2024",
    reason: "Help students easily find clubs, events, and study groups on campus.",
    description:
      "A social platform that connects students to campus events, study groups, and communities. " +
      "Built with React and Firebase, it supports real-time announcements, RSVP tracking, and user profiles. " +
      "The app focuses on accessibility, offline support, and fast navigation so students can quickly " +
      "discover what's happening around them and never miss important opportunities.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    siteUrl: "https://example.com/campusconnect",
    techStack: ["React", "Firebase", "Tailwind CSS"],
  },
  {
    id: 2,
    ownerName: "Ibrahim Musa",
    projectName: "SafePay Wallet",
    year: "2023",
    reason: "Provide a secure, simple way for small businesses to accept digital payments.",
    description:
      "A digital wallet and payment dashboard for micro and small businesses. " +
      "Merchants can generate QR codes, track daily sales, manage customers, and export simple reports. " +
      "The interface is optimized for low-end Android devices and slow networks, " +
      "making digital payments more inclusive for local businesses.",
    image:
      "https://images.unsplash.com/photo-1523287562758-66c7fc58967a?w=900&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    siteUrl: "https://example.com/safepay",
    techStack: ["Vue", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    ownerName: "Tomiwa Adebayo",
    projectName: "HealthTrackr",
    year: "2024",
    reason: "Help busy professionals track habits, workouts, and mood in one place.",
    description:
      "A personal wellness dashboard that combines daily habits, exercise logs, and mood tracking. " +
      "Built as a responsive web app with charts, reminders, and streak tracking. " +
      "The goal is to make self-care measurable so users can understand how small habits " +
      "compound into meaningful health improvements over time.",
    image:
      "https://images.unsplash.com/photo-1550592704-6c76defa9982?w=900&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    siteUrl: "https://example.com/healthtrackr",
    techStack: ["React", "TypeScript", "Chart.js"],
  },
  {
    id: 4,
    ownerName: "Grace Eze",
    projectName: "FarmLink Marketplace",
    year: "2023",
    reason: "Connect local farmers directly to buyers to reduce waste and increase income.",
    description:
      "A marketplace that links local farmers with restaurants and households. " +
      "Farmers can list fresh produce, manage inventory, and receive orders. " +
      "The platform focuses on transparency, prices in local currency, and clear delivery timelines, " +
      "helping to reduce food waste and improve farmer margins.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    siteUrl: "https://example.com/farmlink",
    techStack: ["Next.js", "PostgreSQL"],
  },
  {
    id: 5,
    ownerName: "Kelvin Umeh",
    projectName: "TaskFlow Pro",
    year: "2022",
    reason: "Make team task management simple and visual for small remote teams.",
    description:
      "A Kanban-style project management tool with drag-and-drop boards, " +
      "due dates, and notifications. Built to help remote teams in small startups " +
      "organize sprints and daily tasks without complex enterprise tools.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    siteUrl: "https://example.com/taskflow",
    techStack: ["React", "Redux", "Node.js"],
  },
  // add more as needed...
];

// src/data/Data.js

export const ceoDatas = {
  name: "Dr. Michael Rodriguez",
  title: "Founder & CEO",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop&crop=face",
  bio: "A visionary leader with over 15 years of experience in technology education and innovation. Dr. Rodriguez founded our bootcamp with a single mission: to bridge the gap between traditional education and real-world tech skills.",
  quote:
    "Technology should be accessible to everyone. Our bootcamp isn't just about coding—it's about empowering people to build their future.",
  achievements: [
    "Tech Innovator Award 2022",
    "Forbes 30 Under 30",
    "Google Developer Expert",
  ],
  social: {
    linkedin: "https://linkedin.com/in/ceo",
    twitter: "https://twitter.com/ceo",
  },
  stats: [
    { label: "Years Experience", value: "15+" },
    { label: "Students Mentored", value: "5000+" },
  ],
};

 export const upcomingBootcampsData = [
  {
    id: 1,
    name: "Frontend Engineering Boot Camp",
    place: "Lagos, Nigeria (Hybrid)",
    date: "Jan 20 – Mar 15, 2025",
    time: "Mon • Wed • Fri • 6pm – 8pm (WAT)",
    duration: "8 Weeks",
    benefit:
      "Learn HTML, CSS, JavaScript, and React by building real interfaces from day one. Graduate with a portfolio ready for junior frontend roles.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Cybersecurity Essentials Boot Camp",
    place: "Remote (Live Online)",
    date: "Feb 3 – Apr 12, 2025",
    time: "Tue • Thu • Sat • 5pm – 7pm (WAT)",
    duration: "10 Weeks",
    benefit:
      "Understand how systems are attacked and defended, work with real tools in safe labs, and get a strong foundation for security careers.",
    image:
      "https://images.unsplash.com/photo-1604079628040-94301bb21b11?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Data Analysis Boot Camp",
    place: "Abuja, Nigeria (Onsite)",
    date: "Mar 1 – Apr 30, 2025",
    time: "Sat • 9am – 2pm (WAT)",
    duration: "8 Weeks",
    benefit:
      "Learn Python, SQL, and visualization to turn raw data into clear insights. Perfect for business professionals and aspiring analysts.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80",
  },
];


export const alumniDatas = [
  {
    id: 1,
    name: "Alex Johnson",
    skill: "Frontend Developer",
    location: "San Francisco, USA",
    company: "Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=350&fit=crop&crop=face",
    quote: "The bootcamp transformed my career from scratch to a full-time developer role.",
    graduationYear: "2022",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    skill: "Full Stack Engineer",
    location: "Toronto, Canada",
    company: "Shopify",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=350&fit=crop&crop=face",
    quote: "Hands-on projects gave me the confidence to tackle real-world challenges.",
    graduationYear: "2021",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Rivera",
    skill: "React Specialist",
    location: "London, UK",
    company: "Facebook",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=350&fit=crop&crop=face",
    quote: "The mentorship and community support were invaluable throughout my journey.",
    graduationYear: "2023",
    rating: 5
  },
  {
    id: 4,
    name: "Priya Sharma",
    skill: "JavaScript Developer",
    location: "Bangalore, India",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=350&fit=crop&crop=face",
    quote: "From zero coding experience to landing my dream job in 6 months!",
    graduationYear: "2022",
    rating: 5
  },
  {
    id: 5,
    name: "David Kim",
    skill: "UI/UX Engineer",
    location: "Seoul, South Korea",
    company: "Samsung",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=350&fit=crop&crop=face",
    quote: "The curriculum perfectly balanced theory with practical application.",
    graduationYear: "2023",
    rating: 5
  },
  {
    id: 6,
    name: "Lisa Wang",
    skill: "Mobile Developer",
    location: "Sydney, Australia",
    company: "Atlassian",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=350&fit=crop&crop=face",
    quote: "The career guidance helped me negotiate a 40% higher starting salary.",
    graduationYear: "2021",
    rating: 5
  },
];

// src/data/Data.js
export const aboutContentData = [
  {
    id: "hero",
    type: "hero",
    titleMain: "About",
    titleHighlight: "Acedu BootCamp",
    subtitle: "Shaping the Future of Software Development Education",
    backgroundImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "intro",
    type: "intro",
    title: "Who We Are",
    highlight: "Are",
    paragraphs: [
      "We are a software developer hotbed: we have created an environment that fosters rapid growth and high performance...",
      "Gone are the days where people thought; to be a software developer is a rocket science or you must be a geek or mathematician...",
      "We are an intermediate in bridging the gap between our higher institutions and the industry...",
      "Our approach is more of an apprenticeship where you learn software developments from experts in the field...",
    ],
  },
  {
    id: "whyBootcamp",
    type: "whyBootcamp",
    title: "Why Bootcamp?",
    question: "Why choose our bootcamp over traditional education?",
    text:
      "The bootcamp is to make you job-ready. You learn so much in the 13-weeks in software development than you have in your entire 4-year stay...",
  },
  {
    id: "goals",
    type: "goals",
    introText:
      "It is in our plan to raise top-notch software developers that can ply the trade with excellence anywhere in the world...",
    cards: [
      {
        title: "Increase Your Employability",
        text: "We prepare you to stand out in the competitive job market with industry-relevant skills that employers are actively seeking.",
      },
      {
        title: "Enable Freelance Opportunities",
        text: "Gain the skills and confidence to take on freelance projects, building your portfolio and earning while you learn.",
      },
      {
        title: "Make You a Successful Entrepreneur",
        text: "Equip you with the mindset and technical skills to launch your own tech startup or digital product business.",
      },
    ],
  },
  {
    id: "coreValues",
    type: "coreValues",
    header: {
      title: "Our Core Values",
      highlight: "Values",
      acronym: "D I G I T A L",
    },
    values: [
      {
        letter: "D",
        title: "Discipline",
        text:
          "We don't only see discipline as a principle of business but as principle of greatness...",
        author: "Julius Williams",
      },
      {
        letter: "I",
        title: "Integrity",
        text:
          "Our Word is our Bond. You build trust with others each time you choose integrity over image...",
        author: "John Maxwell",
      },
      {
        letter: "G",
        title: "Grit",
        text:
          "The power of sustained passion and perseverance. Without effort, your talent is nothing more than unmet potential...",
        author: "Angela Duckworth",
      },
      {
        letter: "I",
        title: "Innovativeness",
        text:
          "We value innovation to create new demand and change enough to render competition irrelevant...",
        author: "Angela Duckworth",
      },
      {
        letter: "T",
        title: "Tech-Savvy",
        text:
          "We are well informed about the modern technology, and also use our skills in order to take advantage of the current technology...",
        author: "Sean Gerety",
      },
      {
        letter: "A",
        title: "Affordability",
        text:
          "We have always strived to provide global standard (highest quality) Software Development Education at affordable prices...",
        author: "Regina Hall",
      },
      {
        letter: "L",
        title: "Leadership",
        text:
          "We lead by example, lead with character, motivate people to achieve a unique vision and teach people how to lead with integrity...",
        author: "John Quincy Adams",
        fullWidth: true,
      },
    ],
  },
  {
    id: "finalCta",
    type: "cta",
    title: "Ready to Transform Your Future?",
    text:
      "Join Acedu BootCamp and become part of the next generation of software developers",
    buttonText: "View Our Courses",
    buttonHref: "/course/1",
  },
];

