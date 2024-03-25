import React from 'react';
import flyer from "../assets/6505894.jpg";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  function viewProducts()
  {
     navigate("/view_products");
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img className='p-5 w-2/3 h-2/3' src={flyer} alt="" />
      <div className=' h-1/3 p-5'>
        <h3 className='font-semibold text-2xl'>Purchase Authentic Products</h3>
        <div className='flex justify-center'>
          <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={viewProducts}>Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

