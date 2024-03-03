import React from 'react'
import { Card } from '@mui/material'
import Product from './Product'
import { useRecoilValue } from 'recoil'

export default function Filter() {
  const filteredProducts = useRecoilValue(FilterSelector)  
  return (
    <div>
        {filteredProducts.map((product)=>{
            return <>
                <Card variant="outlined">
                    <Product product={product}/>
                </Card>
            </>
        }
        )}
    </div>
  )
}
