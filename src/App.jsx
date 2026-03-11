import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectsShowcasePage from "./pages/ProjectsPage";
import CoursePage from "./pages/Coursepage";
import AboutPage from "./pages/Aboutpage";
// import RegisterPage from "./pages/Register";
import AIChatPage from "./pages/AIChatPage";
import HostelPage from "./pages/HostelPage";
import ProductsPage from "./pages/ProductsPage";
import ScrollToTop from "./ScrollToTop";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./components/AlertContext";
// import NewMaker from "./components/NewMaker";


function AppLayout() {
  const location = useLocation();


function RegisterRedirect() {
  useEffect(() => {
    window.location.href = "http://acedu.camp/application?AT=1";
  }, []);

  return null;
}
  // List of routes where you DON'T want the footer
  const hideFooterOn = ['/ai-chat', '/register', '/products'];
  const showFooter = !hideFooterOn.includes(location.pathname);
  return (
    < AlertProvider>

      <Navbar showHostel={location.pathname === '/hostel'} />
      {/* <NewMaker /> */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/projects" element={<ProjectsShowcasePage />} />
        <Route path="/register" element={<RegisterRedirect />} />
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