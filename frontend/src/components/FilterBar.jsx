import React from 'react'
import { useSetRecoilState } from 'recoil'
import { FilterAtom } from '../store/atoms/FilterAtom'
import Filter from './Filter'
import { useLocation, useNavigate } from 'react-router-dom'
import _debounce from 'lodash/debounce';

export default function FilterBar() {
    const setFilterValue = useSetRecoilState(FilterAtom)
    const navigate = useNavigate();
    const location = useLocation();
    function handleClick(){
      setFilterValue((prevFilter) => prevFilter);
      navigate("/filter")
    }
    const debouncedApplyFilter = _debounce(handleClick, 300);

  return (
    <div>
        <input type="text" onChange={(e)=>{setFilterValue(e.target.value)}}/>
        <button type="button" onClick={debouncedApplyFilter}>Submit</button>
        {location.pathname === '/filter' && <Filter />}
    </div>
  )
}
