import React, { useState, useEffect } from 'react';
import { FetchCartProducts } from '../store/selectors/FetchCartProducts';
import { useRecoilValueLoadable } from 'recoil';
import { Card, CardContent } from '@mui/material';
import CartProducts from '../components/CartProducts';
import EmptyCart from '../components/EmptyCart';
import PayButton from '../components/PayButton';
import ClockLoader from "react-spinners/ClockLoader";

export default function ViewCart() {
  const cartProductsLoadable = useRecoilValueLoadable(FetchCartProducts);
  const [quantities, setQuantities] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  
  const updateQuantity = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };
  
  useEffect(() => {
    calculateCartTotal();
  }, [quantities, cartProductsLoadable.contents.products]);

  const calculateCartTotal = () => {
    const cartProducts = cartProductsLoadable.contents.products;
    if (!cartProducts) return; 
    const total = cartProducts.reduce((acc, product) => {
      const quantity = quantities[product._id] || 1;
      return acc + product.price * quantity;
    }, 0);
    setCartTotal(total);
  };
  
  switch (cartProductsLoadable.state) {
    case 'loading':
      return <div className='h-screen flex justify-center items-center'><ClockLoader color="#36d7b7" /></div>
    case 'hasValue':
      const cartProducts = cartProductsLoadable.contents.products;

      if (!Array.isArray(cartProducts)) {
        return <div>Error: Cart products data is not valid</div>;
      }

      return (
        <div className='flex justify-between bg-slate-200 h-screen'>
            <div className='w-3/4 p-2'>
              {cartProducts.map((product) => (
                <div className='p-2'>
                  <Card key={product._id}>
                    <CartProducts product={product} />
                    <CardContent>
                    Select Quantity:
                    <input
                      type="number"
                      value={quantities[product._id] || 1}
                      onChange={(e) => updateQuantity(product._id, parseInt(e.target.value))}
                      min={1}
                    />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <div className='w-1/4 p-5'>
              <Card>
                <div className='p-5'>
                <h2>Total price</h2>
                {cartProducts.map((product)=>{
                  const quantity = quantities[product._id] || 1;
                  return (
                    <div key={product._id}>
                      <h4>{product.name}: Rs.{product.price}</h4>
                      <h4>Quantity: {quantity}</h4>
                      <h4>Total: Rs.{product.price * quantity}</h4>
                    </div>
                  );
                })}
                <h4>Amount Payable: Rs.{cartTotal}</h4>
                <PayButton cartProducts={cartProducts} quantities={quantities}/>
                </div>
              </Card>
            </div>
        </div>
      );
    case 'hasError':
      return <div>Error loading cart products</div>;
    default:
      return <EmptyCart/>
  }
}

