import React from 'react';
import { FetchCartProducts } from '../store/selectors/FetchCartProducts';
import { useRecoilValueLoadable } from 'recoil';
import { Card } from '@mui/material';
import Product from '../components/Product';
import { ButtonComponent } from '../components/ButtonComponent';

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
                  <Product product={product} />
                </Card>
              ))}
            </div>
            <div className='w-1/4'>
              <Card>
                <h2>Total price</h2>
                <h4>Price: {cartProductsLoadable.contents.cartTotal}</h4>
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
