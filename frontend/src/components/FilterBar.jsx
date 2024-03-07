import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { FilterAtom } from '../store/atoms/FilterAtom'
import Filter from './Filter'
import { useLocation, useNavigate } from 'react-router-dom'
import { InputBox } from './InputBox'

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
      <InputBox label={"Search anything"} onChange={(e) => setFilterValue(e.target.value)} />
      <button className=' text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4' onClick={handleClick}>Submit</button>
      {location.pathname === '/filter' && <Filter />}
    </div>
  );
}
