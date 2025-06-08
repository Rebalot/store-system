import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import { useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import CartPage from '../pages/CartPage';
import { useAuth } from '../contexts/AuthContext';
import CheckoutPage from '../pages/CheckoutPage';

const RoutesIndex = () => {
    const location = useLocation();
    const { handleRoutesLoading } = useLoading();
    const{ user }= useAuth();
    useEffect(() => {
      handleRoutesLoading();
    }, [location]);
  
    return (
      <Routes>
        <Route path='/' element={
          <div className='mt-[4.5rem]'>
          <Home/>
        </div>
        } />
        <Route path='/catalog/:category?' element={
          <div className='mt-[4.5rem]'>
          <Catalog/>
        </div>
        } />
        <Route path='/cart' element={
          <div className='mt-[4.5rem]'>
          <CartPage />
          {/* Aquí puedes agregar el componente del carrito */}
        </div>
        } />
        <Route path='/checkout' element={
          user ? (
            <div className='mt-[4.5rem]'>
              {/* Aquí puedes agregar el componente de checkout */}
              <CheckoutPage />
            </div>
          ) : <Navigate to="/" />
        } />
      </Routes>
    );
  };

export default RoutesIndex;