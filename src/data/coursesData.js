// src/data/coursesData.js
import { FaChartLine, FaLaptopCode } from "react-icons/fa";

export const coursesData = [
  {
    id: 1,
    name: "HTML & CSS",
    description:
      "Master the fundamentals of web development with HTML5 and CSS3. Learn to create responsive, accessible websites with modern techniques including Flexbox, Grid, and animations.",
    icon: FaLaptopCode,
    duration: "4 Weeks",
    time: "2 Hours",
    stages: ["Basics", "Layouts", "Responsive Design", "Advanced Techniques"],
    longDescription:
      "HTML & CSS form the backbone of every website you see on the internet today. In this comprehensive course, you will learn how to write clean, semantic HTML5 markup that search engines and assistive technologies understand. We then go deep into modern CSS3, including Flexbox, Grid, animations, and responsive techniques.\n\nYou will discover how to structure pages for real-world layouts, handle typography and colors, and make designs look professional on mobile, tablet, and desktop screens. We also touch on accessibility standards, cross-browser compatibility, and basic performance optimization. By the end of this course, you will have built several landing pages and multi-section websites that you can proudly add to your portfolio.",
    advice:
      "Perfect for absolute beginners. No prior coding experience needed. Start building websites from day one and practice by cloning simple pages you already use.",
    teachingApproach:
      "Hands-on projects, interactive coding exercises, and real-world website clones. Learn by doing with immediate feedback and weekly mini-challenges.",
    benefits:
      "High demand skill worldwide. Essential for web developers, designers, email developers, and digital marketers. Serves as the foundation for all front-end technologies you learn later.",
    chatAdvisor: "html-css-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "JavaScript",
    description:
      "From basics to advanced concepts. Learn ES6+ features, DOM manipulation, async programming, and modern JavaScript patterns for interactive web applications.",
    icon: FaLaptopCode,
    duration: "6 Weeks",
    time: "2 Hours",
    stages: [
      "Fundamentals",
      "DOM Manipulation",
      "ES6+ Features",
      "Async Programming",
      "Projects",
    ],
    longDescription:
      "JavaScript is the programming language of the web and the engine behind almost every interactive feature you see online. In this module, you will start from the very basics—variables, data types, functions, and control flow—and progress to more advanced concepts like closures, prototypes, and object-oriented patterns.\n\nYou will learn how to work directly with the DOM to respond to user actions, validate forms, and update content dynamically without reloading the page. We also cover ES6+ features such as arrow functions, destructuring, modules, and async/await for handling APIs and asynchronous operations. Throughout the course, you will build small tools, mini-apps, and interactive components that train you to think like a programmer and solve real-world problems with confidence.",
    advice:
      "A basic understanding of HTML and CSS is recommended. Write JavaScript every day, even for 15 minutes, to build muscle memory and deepen your understanding.",
    teachingApproach:
      "Practical coding sessions, mini-projects, debugging exercises, and real-world problem solving. Each concept is reinforced with small challenges and code-along sections.",
    benefits:
      "One of the most in-demand programming languages globally. Opens doors to frontend, backend (Node.js), full-stack roles, automation, and scripting opportunities.",
    chatAdvisor: "javascript-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "React",
    description:
      "Build modern web applications with React.js. Learn components, hooks, state management, and routing to create scalable frontend applications.",
    icon: FaLaptopCode,
    duration: "8 Weeks",
    time: "2 Hours",
    stages: [
      "Components",
      "Hooks",
      "State Management",
      "Routing",
      "Advanced Patterns",
    ],
    longDescription:
      "React is the most popular library for building modern user interfaces, trusted by companies like Facebook, Netflix, and Airbnb. In this module, you will learn how to break your UI into reusable components, manage local and global state, and structure your project for long-term maintainability.\n\nWe cover React hooks in depth (useState, useEffect, useContext, and more), show you how to consume APIs, handle loading and error states, and set up routing for multi-page experiences. You will gradually build a real-world style application, integrating everything from authentication placeholders to protected routes and dynamic views. By the end, you will understand not just how to write React code, but how to think in components and ship production-ready frontends.",
    advice:
      "Strong JavaScript fundamentals are important here. Focus on understanding how data flows through components instead of memorizing every React hook.",
    teachingApproach:
      "Project-based learning. You build one main app step by step, adding new features each week while learning the underlying concepts and best practices.",
    benefits:
      "React skills are highly valued worldwide. They qualify you for roles building dashboards, SaaS products, admin tools, and complex front-end applications.",
    chatAdvisor: "react-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "C# Programming",
    description:
      "Learn C# from scratch for backend development, game development with Unity, and enterprise applications. Covers OOP, .NET Core, and database integration.",
    icon: FaLaptopCode,
    duration: "10 Weeks",
    time: "2 Hours",
    stages: ["Basics", "OOP", ".NET Core", "APIs", "Databases", "Projects"],
    longDescription:
      "C# is a powerful, strongly typed language used across enterprise software, game development, and cloud services. In this course, you will learn the fundamentals of C# syntax, object-oriented programming, and how to structure clean, maintainable code using classes, interfaces, and inheritance.\n\nWe then move into practical development with .NET, where you build console applications, simple APIs, and connect to databases. Along the way, you will explore common patterns used in professional C# codebases, learn how to handle errors gracefully, and understand how asynchronous programming works with tasks and async/await. By the end, you will be ready to continue into backend development, enterprise systems, or even start exploring game development with Unity.",
    advice:
      "Some basic programming exposure helps but is not required. Consistency is key—practice small exercises often, not just large projects occasionally.",
    teachingApproach:
      "Step-by-step explanations followed by practical coding exercises. You build utilities, small services, and mini backends that mirror tasks in real C# jobs.",
    benefits:
      "C# developers are in demand in fintech, enterprise, and game studios. Skills transfer well into cloud-native development and large-scale backend systems.",
    chatAdvisor: "csharp-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Cybersecurity",
    description:
      "Essential cybersecurity skills including network security, cryptography, ethical hacking, and security best practices for developers and IT professionals.",
    icon: FaLaptopCode,
    duration: "12 Weeks",
    time: "2 Hours",
    stages: [
      "Fundamentals",
      "Network Security",
      "Cryptography",
      "Ethical Hacking",
      "Defense",
    ],
    longDescription:
      "Cybersecurity is about understanding how systems are attacked and how to defend them effectively. In this module, you will learn the fundamentals of security, threat modeling, and the different types of attacks that target networks, web applications, and users.\n\nYou will explore network protocols, encryption basics, common vulnerabilities (like SQL injection and XSS), and how to use industry tools for scanning and monitoring. Through guided labs and simulations, you will see both the offensive (ethical hacking) and defensive sides of cybersecurity. The goal is not just to break things, but to learn how to design and build systems that are significantly harder to compromise.",
    advice:
      "Stay curious and always act ethically. Build a habit of asking: ‘What could go wrong here?’ whenever you see a system or feature.",
    teachingApproach:
      "Hands-on labs in safe, simulated environments, case studies of real breaches, and structured exercises to understand both attack and defense strategies.",
    benefits:
      "Security skills are critical in every industry, from banking to healthcare. Cybersecurity professionals are highly paid and often work with global teams on high-impact problems.",
    chatAdvisor: "cybersecurity-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1604079628040-94301bb21b11?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Data Analysis",
    description:
      "Master data analysis with Python, Pandas, SQL, and visualization tools. Learn to extract insights from data and make data-driven decisions.",
    icon: FaChartLine,
    duration: "10 Weeks",
    time: "2 Hours",
    stages: ["Python Basics", "Pandas", "SQL", "Visualization", "Projects"],
    longDescription:
      "Data analysis turns raw numbers into stories that drive better decisions. In this course, you will learn how to work with data from the ground up—starting with Python basics, then moving into powerful libraries like Pandas for cleaning and transforming datasets.\n\nYou will practice writing SQL queries to pull data from databases, build visualizations with tools like Matplotlib or Seaborn, and create simple dashboards that non-technical stakeholders can understand. Throughout the module, you will work with real or realistic datasets, learning how to ask the right questions and present your findings clearly. By the end, you will be comfortable exploring data, spotting patterns, and communicating insights in a way that influences business outcomes.",
    advice:
      "You don’t need a math degree to start. Focus on understanding the questions data can answer, and practice by analyzing public datasets that interest you.",
    teachingApproach:
      "Project-based labs with real-world style data, guided notebooks, and visualization tasks. Emphasis on storytelling with data and practical, applied skills.",
    benefits:
      "Data skills are needed in product, marketing, finance, operations, and more. Analysts and data-savvy professionals are in high demand in companies worldwide.",
    chatAdvisor: "data-analysis-advisor",
    bgImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80",
  },
];