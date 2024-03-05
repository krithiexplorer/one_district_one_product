import './App.css'
import ViewProducts from './components/ViewProducts'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterByOffer from './components/FilterByOffer';
import Wishlist from './components/Wishlist';
import ViewCart from './components/ViewCart';
import Landing from './components/Landing';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import FetchProducts from './components/FetchProducts';
import AddProduct from './components/AddProduct';

function App() {
    return <>
      <RecoilRoot>
        <BrowserRouter>
        <FetchProducts/>
        <Header></Header>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/cart" element={<ViewCart/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/view_products" element={<ViewProducts/>}/>
            <Route path="/filter" element={<FilterBar/>}/>
            <Route path="/offers" element={<FilterByOffer/>}/>
            <Route path="/addProduct" element={<AddProduct/>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
}

export default App
