import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();  

  const viewDetails = (id) =>{
    navigate(`/product/${id}`)
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);    
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return(
    <div className="bg-slate-300 h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl mt-8 my-8">Your Orders</h1>
      <div className="grid grid-cols-2 gap-2">
        {orders && orders.formattedProducts.map((product, index) => (
          <div key={index} className="rounded-lg bg-white w-80 h-60 text-center p-2 px-4 my-4">
            <div className="flex flex-row justify-between border-b border-gray-300">
              <div className="text-lg pt-1 px-4 pb-3">
                {product.name}
              </div>
              <div className="text-lg pt-1 px-4 pb-3">
                <button onClick={() => viewDetails(product._id)}>Buy Again</button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2/5 h-32 m-4">
                <img className='w-40 h-30' src={product.image} alt={product.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
