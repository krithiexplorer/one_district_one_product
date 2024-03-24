import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonWarning } from '../components/ButtonWarning';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../store/atoms/StateAtom';
import seller from '../assets/sell.jpg'
import buyer from "../assets/buyer.jpg"
import { Typography } from '@mui/material';

export default function Landing() {
  const navigate = useNavigate();
  const login = useRecoilValue(LoginAtom);
  if (login) {
    return <Home />;
  }

  return (
    <div className='h-screen flex '>
      <div className='w-1/2 h-auto  flex justify-center items-center   bg-right ' style={{backgroundImage: `url(${seller})`,backgroundSize: 'cover', width: '50%'}}>
        <div className='text-center  shadow  shadow-red-800  backdrop-blur rounded-lg p-5'>
        <Typography variant="h6" fontWeight="bold">Are you a seller</Typography>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={()=>{
            navigate("/signup/seller")
          }}>Start your journey Here</button>
          <ButtonWarning text={"Already have an account? "} buttonText={"Sign In"}  to={"/signin/seller"}/>
        </div>
      </div>
      <div className='w-1/2 h-auto  flex justify-center items-center' style={{backgroundImage: `url(${buyer})`,backgroundSize: 'cover', width: '50%'}} >
        <div className='text-center shadow  shadow-cyan-800 backdrop-blur rounded-lg p-5'>
        <Typography variant="h6" fontWeight="bold">Are you a buyer</Typography>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={()=>{
            navigate("/signup/buyer")
          }}>Start Purchasing</button>
          <ButtonWarning text={"Already have an account? "} buttonText={"Sign In"}  to={"/signin/buyer"}/>
        </div>
      </div>
    </div>
  )
}
