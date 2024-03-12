import React from 'react';
import { FetchCartProducts } from '../store/selectors/FetchCartProducts';
import { useRecoilValueLoadable } from 'recoil';
import { Card } from '@mui/material';
import { ButtonComponent } from '../components/ButtonComponent';
import CartProducts from '../components/CartProducts';

export default function ViewCart() {
  const cartProductsLoadable = useRecoilValueLoadable(FetchCartProducts);

  switch (cartProductsLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasValue':
      const cartProducts = cartProductsLoadable.contents.products;

      return (
        <div className='flex justify-between'>
            <div className='w-3/4'>
              {cartProducts.map((product) => (
                <Card key={product.id}>
                  <CartProducts product={product} />
                </Card>
              ))}
            </div>
            <div className='w-1/4'>
              <Card>
                <h2>Total price</h2>
                {cartProducts.map((product)=>{
                  return <>
                  <h4>{product.name}: Rs.{product.price}</h4>
                  </>
                })}
                <h4>Amount Payable: Rs.{cartProductsLoadable.contents.cartTotal}</h4>
                <ButtonComponent buttonname={"Proceed to checkout"} />
              </Card>
            </div>
        </div>
      );
    case 'hasError':
      return <div>Error loading cart products</div>;
    default:
      return null; // Handle other cases if needed
  }
}
