import React from 'react';
import { useAppSelector } from '../../../hooks/hooks';

function Payment() {
  const { payment } = useAppSelector(state => state.user);
  return (
    <div>{payment.itemPrice}</div>
  );
}

export default Payment;
