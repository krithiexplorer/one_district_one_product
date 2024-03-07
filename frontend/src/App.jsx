import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FetchProducts from './components/FetchProducts';
import Landing from './pages/Landing';
import ViewCart from './pages/ViewCart';
import ViewProducts from './pages/ViewProducts';
import Wishlist from './pages/Wishlist';
import FilterBar from './components/FilterBar';
import FilterByOffer from './components/FilterByOffer';
import SigninSeller from './pages/SigninSeller';
import SigninBuyer from './pages/SigninBuyer';
import SignUpSeller from './pages/SignUpSeller';
import SignUpBuyer from './pages/SignUpBuyer';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import ProductUploadComponent from './pages/AddProduct';
import { useState, useEffect } from 'react';
import Logout from './components/Logout';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);
  const [isSeller, setIsSeller] = useState(localStorage.getItem("seller") === "true");

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null);
    setIsSeller(localStorage.getItem("seller") === "true");
  }, []); 
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <FetchProducts/>
        <Routes>
          <Route path="/" element={<Landing/>} />

          {/* Authentication Routes */}
          <Route path="/signin/seller" element={<SigninSeller />} />
          <Route path="/signin/buyer" element={<SigninBuyer />} />

          {/* Separate Sign-Up Pages */}
          <Route path="/signup/seller" element={<SignUpSeller />} />
          <Route path="/signup/buyer" element={<SignUpBuyer />} />

          {/* Other routes accessible to authenticated users */}
          {isAuthenticated && (
            <>
              {!isSeller && (
                <>
                  <Route path="/cart" element={<ViewCart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/view_products" element={<ViewProducts />} />
                  <Route path="/filter" element={<FilterBar />} />
                  <Route path="/offers" element={<FilterByOffer />} />
                </>
              )}
              {isSeller && (
                <>
                  <Route path="/seller/addProduct" element={<ProductUploadComponent />} />
                </>
              )}
            </>
          )}
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App
