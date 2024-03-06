import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { FetchWishlistedProducts } from '../store/selectors/FetchWishlistedProducts';
import { Card } from '@mui/material';
import Product from '../components/Product';

export default function ViewCart() {
  const wishlistProductsLoadable = useRecoilValueLoadable(FetchWishlistedProducts);

  switch (wishlistProductsLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasValue':
      const wishlistedProducts = wishlistProductsLoadable.contents;

      return (
        <div>
          {wishlistedProducts.map((product) => (
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
