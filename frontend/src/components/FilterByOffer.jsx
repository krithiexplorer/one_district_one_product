import { Grid, Typography } from '@mui/material'
import React from 'react'
import { FilterByOfferSelector } from '../store/selectors/FilterByOfferSelector'
import Product from './Product'
import { useRecoilValue } from 'recoil'

export default function FilterByOffer() {
  const offeredItems = useRecoilValue(FilterByOfferSelector)  
  return (
    <div className='p-5 bg-slate-200 h-screen'>
      <div className='p-2 text-center'>
      <Typography variant="h6">
        Hurry up, Limited period Offered Items!!
      </Typography>
      </div>
      <Grid container justify="center" spacing={4}>
        {offeredItems.map((product)=>{
                return <>
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                  </Grid>
                </>
              })} 
      </Grid>
    </div>
  )
}

