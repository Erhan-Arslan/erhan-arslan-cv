import About from './components/About';
import Background from './components/Background';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-xl bg-electric-700 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0 [transition:transform_200ms_ease]"
      >
        Skip to content
      </a>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}
