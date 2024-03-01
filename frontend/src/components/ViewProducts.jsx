import React from 'react'
import { useRecoilValue } from 'recoil'
import { ProductsAtom } from '../store/atoms/ProductAtom'
import Product from './Product'

export default function ViewProducts() {
  const products = useRecoilValue(ProductsAtom)  
  return (
    <div>
        {products.map((product)=>{
            return <>
                <Card>
                    <Product product={product}/>
                </Card>
            </>
        }
        )}
    </div>
  )
}
