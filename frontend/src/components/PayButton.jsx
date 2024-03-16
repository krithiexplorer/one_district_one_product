import axios from 'axios';
import React from 'react';

export default function PayButton({ cartProducts, quantities }) {
    const checkoutItems = cartProducts.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        qty: quantities[product._id] || 1
    }));

    function checkout() {
        axios.post("http://localhost:3000/api/v1/payments/create-checkout-session", { checkoutItems }, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url; 
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='p-5'>
            <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={checkout}>Proceed to Checkout</button>
        </div>
    );
}
