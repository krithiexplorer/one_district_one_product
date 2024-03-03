import { Card } from '@mui/material'
import React from 'react'
import { FilterByOfferSelector } from '../store/selectors/FilterByOfferSelector'
import Product from './Product'

export default function FilterByOffer() {
  const offeredItems = UseRecoilValue(FilterByOfferSelector)  
  return (
    <div>
        <Card variant="outlined">
            {offeredItems.map((product)=>{
                <Product product={product}/>
            })}
        </Card>
    </div>
  )
}
