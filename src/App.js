import React from 'react';
import './index.css';

import { Cursor } from './components/ui/Cursor';
import Navbar from './components/Navbar/Navbar';
import AboutMe from './components/About/About';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Research from './components/Research/Research';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="app">
      <Cursor />
      <Navbar />
      
      <main className="main-content">
        <AboutMe />
        <Projects />
        <Experience />
        <Research />
        <Contact />
      </main>
    </div>
  );
}

export default App;
