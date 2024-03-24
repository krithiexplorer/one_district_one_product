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
import Header from './components/Header';
import ProductUploadComponent from './pages/AddProduct';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Logout from './components/Logout';
import SellerProfile from './pages/SellerProfile';
import UserProfile from './pages/UserProfile';
import { LoginAtom, SellerAtom } from './store/atoms/StateAtom';
import ProductDetails from './pages/ProductDetails';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSuccess from './components/CheckoutSuccess';
import Home from './pages/Home';
import Apps from './components/Apps';
import SalesPredictionForm from './components/SalesPredictionForm';
import ProductRec from './components/ProductRec';
import Orders from './pages/Orders';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(LoginAtom);
  const [isSeller, setIsSeller] = useRecoilState(SellerAtom);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null);
    setIsSeller(localStorage.getItem("seller") === "true");
  }, []); 
  return (
    <div>
      <BrowserRouter>
        {  isAuthenticated && <><Header /></>}
        <FetchProducts/>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          {/* Authentication Routes */}
          <Route path="/signin/seller" element={<SigninSeller />} />
          <Route path="/signin/buyer" element={<SigninBuyer />} />

          {/* Separate Sign-Up Pages */}
          <Route path="/signup/seller" element={<SignUpSeller />} />
          <Route path="/signup/buyer" element={<SignUpBuyer />} />
          {!isAuthenticated && (
              <>
               {!isSeller && (
                <>
                  <Route path="/view_products" element={<ViewProducts />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/filter" element={<FilterBar />} />
                  <Route path="/offers" element={<FilterByOffer />} />
                </>
               )}
              </>
          )}
          {/* Other routes accessible to authenticated users */}
          {isAuthenticated && (
            <>
              {!isSeller && (
                <>
                  <Route path="/cart" element={<ViewCart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/view_profile" element={<UserProfile />} />
                  <Route path="/purchase-success" element={<CheckoutSuccess/>}/>
                  <Route path="/predict" element={<Apps/>}/>
                  <Route path="/recommendations" element={<ProductRec/>}/>
                  <Route path="/view_products" element={<ViewProducts />} />
                  <Route path="/product/:productId" element={<ProductDetails />} />
                  <Route path="/filter" element={<FilterBar />} />
                  <Route path="/offers" element={<FilterByOffer />} />
                  <Route path="/Orders" element={<Orders />} />
                </>
              )}
              {isSeller && (
                <>
                  <Route path="/seller/addProduct" element={<ProductUploadComponent />} />
                  <Route path="/seller/view_profile" element={<SellerProfile />} />
                  <Route path="/seller/sales_predict" element={<SalesPredictionForm />} />
                </>
              )}
            </>
          )}
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>
  );
}

export default App;
