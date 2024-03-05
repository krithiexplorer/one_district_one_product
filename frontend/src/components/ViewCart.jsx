import React from 'react'
import { useAuth } from './AuthContext'

export default function ViewCart() {
  const { user } = useAuth();
  const userId = user ? user._id : null;
  return (
    <div>
      cute carto
    </div>
  )
}
