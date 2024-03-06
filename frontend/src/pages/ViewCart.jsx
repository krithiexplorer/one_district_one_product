import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { FetchCartProducts } from '../store/selectors/FetchCartProducts';
import { Card } from '@mui/material';
import Product from '../components/Product';

export default function ViewCart() {
  const cartProductsLoadable = useRecoilValueLoadable(FetchCartProducts);

  switch (cartProductsLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasValue':
      const cartProducts = cartProductsLoadable.contents;

      return (
        <div>
          {cartProducts.map((product) => (
            <Card key={product.id}>
              <Product product={product} />
            </Card>
          ))}
        </div>
      );
    case 'hasError':
      return <div>Error loading cart products</div>;
    default:
      return null; // Handle other cases if needed
  }
}
