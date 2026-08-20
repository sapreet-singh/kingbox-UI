import { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>(() => {
    return window.location.hash === '#about' ? 'about' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'about') => {
    setCurrentPage(page);
    window.location.hash = page === 'about' ? 'about' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <Header currentPage={currentPage} onNavigate={navigateTo} />
      {currentPage === 'home' ? (
        <Home />
      ) : (
        <About onNavigateHome={() => navigateTo('home')} />
      )}
      <Footer currentPage={currentPage} onNavigate={navigateTo} />
    </ErrorBoundary>
  );
}

export default App;
