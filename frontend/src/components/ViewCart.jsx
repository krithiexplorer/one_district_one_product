import React from 'react'
import { useAuth } from './AuthContext'
import { useRecoilValue } from 'recoil';
import { FetchCartProducts } from '../store/selectors/FetchCartProducts';

export default function ViewCart() {
  const { user } = useAuth();
  const userId = user ? user._id : null;
  const cartProducts = useRecoilValue(FetchCartProducts(userId));
  return (
    <div>
      cute carto
    </div>
  )
}
