import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginAtom, SellerAtom } from '../store/atoms/StateAtom';
import { useRecoilValue } from 'recoil';

export default function Header() {
  const isSeller = useRecoilValue(SellerAtom);
  const isAuthenticated = useRecoilValue(LoginAtom);
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="bg-red-700">
        <div>
          {!isAuthenticated && (
            <>
            {!isSeller && (
              <>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/") }}>Home</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_products") }}>Shop</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/filter") }}>Filter</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/offers") }}>Offers</button>
              </>
            )}
            </>
          )}
          {isAuthenticated && (
            <>
                  {isSeller && (
                    <>
                      <button className='border-transparent text-white p-2'onClick={() => { navigate("/seller/view_profile") }}>Seller Profile</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/seller/addProduct") }}>Add Product</button>
                    </>
                  )}
                  {!isSeller && (
                    <>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/") }}>Home</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_products") }}>Shop</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/filter") }}>Filter</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/offers") }}>Offers</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_profile") }}>Buyer Profile</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/cart") }}>Cart</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/wishlist") }}>WishList</button>
                    </>
                  )}
                  <button className='border-transparent text-white p-2' onClick={() => { navigate("/logout") }}>Logout</button>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}
