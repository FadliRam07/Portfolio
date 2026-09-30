import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col text-pixel-cream"
        style={{
          backgroundColor: '#1a1a2e',
          backgroundImage:
            'linear-gradient(rgba(46,125,50,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(46,125,50,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <Navbar />
        {/* Tidak ada max-width di main lagi — biar hero bisa full width */}
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}