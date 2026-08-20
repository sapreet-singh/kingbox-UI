import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';

export function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Home />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
