import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectsShowcasePage from "./pages/ProjectsPage";
import CoursePage from "./pages/Coursepage";
import AboutPage from "./pages/Aboutpage";
import ScrollToTop from "./ScrollToTop";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/projects" element={<ProjectsShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;