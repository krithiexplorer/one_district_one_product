import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { FetchWishlistedProducts } from '../store/selectors/FetchWishlistedProducts';
import { Grid } from '@mui/material';
import WishListProducts from '../components/WishListProducts';
import EmptyWishlist from '../components/EmptyWishlist';
import ClockLoader from "react-spinners/ClockLoader";


export default function ViewCart() {
  const wishlistProductsLoadable = useRecoilValueLoadable(FetchWishlistedProducts);

  switch (wishlistProductsLoadable.state) {
    case 'loading':
      return <ClockLoader color="#36d7b7" />;
    case 'hasValue':
      const wishlistedProducts = wishlistProductsLoadable.contents;

      return (
        <div className='p-5 bg-slate-200 h-screen'>
          <Grid container justify="center" spacing={4}>
            {wishlistedProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <WishListProducts product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    case 'hasError':
      return <div>Error loading cart products</div>;
    default:
      return <EmptyWishlist/>
  }
}
