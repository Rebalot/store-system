import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './routes/RoutesIndex';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import './App.css';
import { useLoading, LoadingProvider } from './contexts/LoadingContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const { isRoutesLoaded } = useLoading();
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className='min-h-[100vh]'>
      <RoutesIndex/>
      </div>
      {isRoutesLoaded && <Footer />}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
    <LoadingProvider>
      <CartProvider>
      <AppContent />
      </CartProvider>
    </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
