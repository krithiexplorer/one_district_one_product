import React from 'react'
import { useSetRecoilState } from 'recoil'
import { FilterAtom } from '../store/atoms/FilterAtom'
import Filter from './Filter'
import { useLocation, useNavigate } from 'react-router-dom'

export default function FilterBar() {
    const setFilterValue = useSetRecoilState(FilterAtom)
    const navigate = useNavigate();
    const location = useLocation();
    function handleClick(){
      setFilterValue((prevFilter) => prevFilter);
      navigate("/filter")
    }
  return (
    <div>
        <input type="text" onChange={(e)=>{setFilterValue(e.target.value)}}/>
        <button type="button" onClick={handleClick}>Submit</button>
        {location.pathname === '/filter' && <Filter />}
    </div>
  )
}
