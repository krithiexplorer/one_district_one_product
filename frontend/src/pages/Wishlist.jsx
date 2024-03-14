import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { FetchWishlistedProducts } from '../store/selectors/FetchWishlistedProducts';
import { Card } from '@mui/material';
import WishListProducts from '../components/WishListProducts';
import EmptyWishlist from '../components/EmptyWishlist';

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
              <WishListProducts product={product} />
            </Card>
          ))}
        </div>
      );
    case 'hasError':
      return <div>Error loading cart products</div>;
    default:
      return <EmptyWishlist/>
  }
}
