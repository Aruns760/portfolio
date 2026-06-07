import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/Navbar/ScrollProgress";
import AIChat from "./components/AIChat/AIChat";

function App() {
  return (
      <div className="bg-slate-950 text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AIChat />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;