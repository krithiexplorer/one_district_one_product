import './App.css'
import ViewProducts from './components/ViewProducts'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterByOffer from './components/FilterByOffer';
import Filter from './components/Filter';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';

function App() {
    return <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/view_products" element={<ViewProducts/>}/>
            <Route path="/filter" element={<Filter/>}/>
            <Route path="/offers" element={<FilterByOffer/>}/>
          </Routes>
        </BrowserRouter>
        <ViewProducts/>
      </RecoilRoot>
    </>
}

export default App
