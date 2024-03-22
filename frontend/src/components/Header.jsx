import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginAtom, SellerAtom } from '../store/atoms/StateAtom';
import { useRecoilValue } from 'recoil';

export default function Header() {
  const isSeller = useRecoilValue(SellerAtom);
  const isAuthenticated = useRecoilValue(LoginAtom);
  const navigate = useNavigate();
  function reload(){
    return window.location.reload();
  }
  return (
    <div>
      <div className="bg-red-700">
        <div>
          {!isAuthenticated && (
            <>
            {!isSeller && (
              <>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/"); reload(); }}>Home</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_products"); reload();}}>Shop</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/filter"); reload(); }}>Filter</button>
                <button className='border-transparent text-white p-2' onClick={() => { navigate("/offers"); reload(); }}>Offers</button>
              </>
            )}
            </>
          )}

          {isAuthenticated && (
            <>
                  {isSeller && (
                    <>
                      <button className='border-transparent text-white p-2'onClick={() => { navigate("/seller/view_profile");
                    reload(); }}>Seller Profile</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/seller/addProduct");
                    reload(); }}>Add Product</button>
                    </>
                  )}
                  {!isSeller && (
                    <>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/"); reload();  }}>Home</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_products"); reload();  }}>Shop</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/filter");reload();  }}>Filter</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/offers"); reload();  }}>Offers</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/view_profile"); reload();  }}>Buyer Profile</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/cart"); reload(); }}>Cart</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/wishlist"); reload();  }}>WishList</button>
                      <button className='border-transparent text-white p-2' onClick={() => { navigate("/Orders"); reload();  }}>Orders</button>

                    </>
                  )}
                  <button className='border-transparent text-white p-2' onClick={() => { navigate("/logout");
                reload(); }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
