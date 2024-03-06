import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { FilterAtom } from '../store/atoms/FilterAtom'
import Filter from './Filter'
import { useLocation, useNavigate } from 'react-router-dom'

export default function FilterBar() {
  const setFilterValue = useSetRecoilState(FilterAtom);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // The effect will run after the initial render
    setFilterValue((prevFilter) => prevFilter);
    if (location.pathname === '/filter') {
      navigate('/filter');
    }
  }, [setFilterValue, location.pathname, navigate]);

  function handleClick() {
    // This function is not directly triggering navigation anymore
    setFilterValue((prevFilter) => prevFilter);
  }

  return (
    <div>
      <input type="text" onChange={(e) => setFilterValue(e.target.value)} />
      <button type="button" onClick={handleClick}>Submit</button>
      {location.pathname === '/filter' && <Filter />}
    </div>
  );
}
