import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FetchProducts from './components/FetchProducts';
import Landing from './pages/Landing';
import ViewCart from './pages/ViewCart';
import ViewProducts from './pages/ViewProducts';
import Wishlist from './pages/Wishlist';
import FilterBar from './components/FilterBar';
import FilterByOffer from './components/FilterByOffer';
import Signin from './pages/Signin';
import SignUpSeller from './pages/SignUpSeller';
import SignUpBuyer from './pages/SignUpBuyer';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import ProductUploadComponent from './pages/AddProduct';
import FetchSeller from './components/FetchSeller';



function App() {
  const isSeller = localStorage.getItem("seller")
  const isAuthenticated = localStorage.getItem("token")
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <FetchProducts/>
        <FetchSeller/>
        <Routes>
          <Route path="/" element={<Landing/>} />

          {/* Authentication Routes */}
          <Route path="/signin" element={<Signin />} />

          {/* Separate Sign-Up Pages */}
          <Route path="/signup/seller" element={<SignUpSeller />} />
          <Route path="/signup/buyer" element={<SignUpBuyer />} />

          {/* Other routes accessible to authenticated users */}
          {isAuthenticated !== null && (
            <>
              {isSeller !== "true" && (
                <>
                  <Route path="/cart" element={<ViewCart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/view_products" element={<ViewProducts />} />
                  <Route path="/filter" element={<FilterBar />} />
                  <Route path="/offers" element={<FilterByOffer />} />
                </>
              )}
              {isSeller === "true" && (
                <>
                  <Route path="/seller/addProduct" element={<ProductUploadComponent />} />
                </>
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App
