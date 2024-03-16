import React from 'react'
import { Grid } from '@mui/material'
import Product from './Product'
import { useRecoilValue } from 'recoil'
import { FilterSelector } from '../store/selectors/FilterSelector'

export default function Filter() {
  const filteredProducts = useRecoilValue(FilterSelector)  
  return (
    <div className='p-5'>
       <Grid container justify="center" spacing={4}>
        {filteredProducts.map((product)=>{
              return <>
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                      <Product product={product}/>
                  </Grid>                  
              </>
          }
          )}
       </Grid>
    </div>
  )
}
