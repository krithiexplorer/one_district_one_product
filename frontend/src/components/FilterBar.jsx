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
    setFilterValue((prevFilter) => prevFilter);
    if (location.pathname === '/filter') {
      navigate('/filter');
    }
  }, [setFilterValue, location.pathname, navigate]);


  return (
    <div className='p-5'>
      <InputBox label={"Search anything"} onChange={(e) => setFilterValue(e.target.value)} />
      {location.pathname === '/filter' && <Filter />}
    </div>
  );
}
