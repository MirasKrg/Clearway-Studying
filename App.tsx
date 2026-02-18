
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import LandingPage from './pages/LandingPage';
import CellsPage from './pages/CellsPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    // popstate for browser back/forward buttons
    window.addEventListener('popstate', onLocationChange);
    // custom event for programmatic navigation
    window.addEventListener('pushstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('pushstate', onLocationChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/cells':
        return <CellsPage />;
      case '/':
      default:
        return <LandingPage isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className="min-h-screen font-sans relative">
      <AnimatedBackground isDarkMode={isDarkMode} />
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="relative z-10 pt-20"> {/* Add padding for fixed header */}
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
