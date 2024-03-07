import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ProductsAtom } from '../store/atoms/ProductAtom';
import axios from 'axios';

export default function FetchProducts(){
  const setProducts = useSetRecoilState(ProductsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/products",
          {
            headers: {
              'Authorization': "Bearer " + localStorage.getItem('token')
            }
          }
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [setProducts]);

  return null;
};


