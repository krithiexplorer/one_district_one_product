import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Grid } from '@mui/material';
import Product from '../components/Product';
import { ProductsAtom } from '../store/atoms/ProductAtom';

export default function ViewProducts() {
  const ProductsLoadable = useRecoilValueLoadable(ProductsAtom);

  switch (ProductsLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasValue':
      const products = ProductsLoadable.contents;

      return (
        <div>
          <Grid container justify="center" spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    case 'hasError':
      return <div>Error loading products</div>;
    default:
      return null; // Handle other cases if needed
  }
}
