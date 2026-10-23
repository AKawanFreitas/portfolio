import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Skills from './sections/Skills/Skills'
import Projects from './sections/Projects/Projects'
import Contact from './sections/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import CommandPalette from './components/CommandPalette/CommandPalette'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <CommandPalette />
    </>
  )
}
