import { Card } from '@mui/material'
import React from 'react'
import { FilterByOfferSelector } from '../store/selectors/FilterByOfferSelector'
import Product from './Product'
import { useRecoilValue } from 'recoil'

export default function FilterByOffer() {
  const offeredItems = useRecoilValue(FilterByOfferSelector)  
  return (
    <div>
            {offeredItems.map((product)=>{
              return <>
                <Card key={product._id} variant="outlined">
                  <Product product={product}/>
                </Card>
              </>
            })}
    </div>
  )
}
