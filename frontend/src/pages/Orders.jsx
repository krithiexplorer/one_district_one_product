import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/orders`)
      .then((res) => {
        console.log(res.data.formattedProducts.image)
        setOrders(res.data);    
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return(
    <div className="bg-slate-300 h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl mt-4 mb-8">Your Orders</h1>
       <div className="flex flex-col justify-center ">
       <div className="rounded-lg bg-white w-96 h-60 text-center p-2 px-4 ">
        <div className="flex flex-row justify-between border-b border-gray-300 my-4">
            <div className="text-slate-500  text-lg pt-1 px-4 pb-3">
                total:
            </div>
            <div className="text-slate-500  text-lg pt-1 px-4 pb-3">
                Buy Again
            </div>
        </div>
        <div className="flex flex-row">
            <div className="bg-red-500 w-2/5 h-32">
                img
                 {/*  <img className=' w-20 h-20' src={orders.img} alt={orders.name} /> */}
            </div>
            <div className="ml-5 text-lime-600 ">
                name
            </div>
        </div>
        <div className="border-b border-gray-300 mt-4 my-6"></div>
       </div>
        </div>
    </div>
  );
};

export default Orders;
