import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Card } from '@mui/material';
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
          {products.map((product) => (
            <Card key={product.id}>
              <Product product={product} />
            </Card>
          ))}
        </div>
      );
    case 'hasError':
      return <div>Error loading products</div>;
    default:
      return null; // Handle other cases if needed
  }
}
