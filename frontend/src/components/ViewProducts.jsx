import React from 'react'
import { useRecoilValue } from 'recoil'
import { ProductsAtom } from '../store/atoms/ProductAtom'
import Product from './Product'
import Card from '@mui/material/Card';

export default function ViewProducts() {
  const products = useRecoilValue(ProductsAtom)  
  return (
    <div>
        {products.map((product)=>{
            return <>
                <Card key={product.id} variant="outlined">
                    <Product product={product}/>
                </Card>
            </>
        }
        )}
    </div>
  )
}
