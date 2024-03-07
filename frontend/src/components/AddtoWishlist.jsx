import React from 'react'

export default function AddtoWishlist({id}) {
    const productId = id;
    axios.put(`http://localhost:3000/api/v1/users/wishlist/:${productId}`,{
        headers:{
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }).then(response => {return <h3>{response.data.msg}</h3>})
}
