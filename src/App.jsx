// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectsShowcasePage from "./pages/ProjectsPage";
import CoursePage from "./pages/Coursepage";
import AboutPage from "./pages/Aboutpage";
import RegisterPage from "./pages/Register";
import AIChatPage from "./pages/AIChatPage";
import HostelPage from "./pages/HostelPage";
import ProductsPage from "./pages/ProductsPage";
import ScrollToTop from "./ScrollToTop";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./components/AlertContext";


function AppLayout() {
  const location = useLocation();

  // List of routes where you DON'T want the footer
  const hideFooterOn = ['/ai-chat', '/register'];
  const hideHostelOn = '/hostel'
  const showHostelon = !hideHostelOn.includes(location.pathname);
  const showFooter = !hideFooterOn.includes(location.pathname);
  let check = false
  return (
    < AlertProvider>
     
      <Navbar showHostel={location.pathname === '/hostel'}  />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/projects" element={<ProjectsShowcasePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

      <AIAssistant />

      {showFooter && <Footer show={true} />}
    </ AlertProvider>
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