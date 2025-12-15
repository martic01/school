// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectsShowcasePage from "./pages/ProjectsPage";
import CoursePage from "./pages/Coursepage";
import AboutPage from "./pages/Aboutpage";
import RegisterPage from "./pages/Register";
import AIChatPage from "./pages/AIChatPage";
import ScrollToTop from "./ScrollToTop";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function AppLayout() {
  const location = useLocation();

  // List of routes where you DON'T want the footer
 const hideFooterOn = ['/ai-chat', '/register'];
  const showFooter = !hideFooterOn.includes(location.pathname);

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/projects" element={<ProjectsShowcasePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
      </Routes>

      <AIAssistant />

      {showFooter && <Footer show={true} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;