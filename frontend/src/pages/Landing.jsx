import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonWarning } from '../components/ButtonWarning';
import { useRecoilValue } from 'recoil';
import { LoginAtom } from '../store/atoms/StateAtom';

export default function Landing() {
  const navigate = useNavigate();
  const login = useRecoilValue(LoginAtom);
  if (login) {
    return <Home />;
  }

  return (
    <div className='h-screen flex'>
      <div className='w-1/2 h-auto bg-slate-400 flex justify-center items-center'>
        <div className='text-center'>
        <h2>Are you a seller</h2>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={()=>{
            navigate("/signup/seller")
          }}>Start your journey Here</button>
          <ButtonWarning text={"Already have an account? "} buttonText={"Sign In"}  to={"/signin/seller"}/>
        </div>
      </div>
      <div className='w-1/2 h-auto bg-slate-600 flex justify-center items-center'>
        <div className='text-center'>
        <h2>Are you a buyer</h2>
          <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={()=>{
            navigate("/signup/buyer")
          }}>Start Purchasing</button>
          <ButtonWarning text={"Already have an account? "} buttonText={"Sign In"}  to={"/signin/buyer"}/>
        </div>
      </div>
    </div>
  )
}
