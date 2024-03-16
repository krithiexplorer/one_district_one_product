import React from 'react';
import { Typography } from '@mui/material';

function Home() {
  return (
    <div className='bg-gradient-to-r from-red-100 to-red-700'>
        <div className='h-screen flex flex-col justify-center p-5'>
        <Typography variant="h1">
            ONE DISTRICT ONE PRODUCT 
        </Typography>
        <div>
            <button className='w-52 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4'>Shop Now</button>
        </div>
        </div>
        
    </div>
  );
}

export default Home;

