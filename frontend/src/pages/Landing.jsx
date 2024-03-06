import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
          <h1>Are you a seller</h1>
          <button onClick={()=>{
            navigate("/signup/seller")
          }}>Start your journey Here</button>
      </div>
      <div>
          <h1>Are you a buyer</h1>
          <button onClick={()=>{
            navigate("/signup/buyer")
          }}>Start Purchasing</button>
      </div>
    </div>
  )
}
