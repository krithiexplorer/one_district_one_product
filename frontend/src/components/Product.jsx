import React from 'react'

export default function Product({product}){
  return (
    <div>
        <h4>{product.name}</h4>
        <h5>{product.price}</h5>
        <p>{product.quantity}</p>
        <h4>{product.district}</h4>
        <h4>{product.dealer}</h4>
        <h4>{product.offer}</h4>
        <h4>{product.description}</h4>
        <h4>{product.image}</h4>
    </div>
  )
}
