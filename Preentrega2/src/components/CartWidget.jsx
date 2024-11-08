import React, { useContext } from 'react';
import { Cart } from '../context/CartProvider'; 
import { NavLink } from 'react-router-dom'; 
import cart from '../assets/cart.svg'; 

export const CartWidget = () => {
  const { quantity } = useContext(Cart); 

  return (
    <div className="cart-widget" style={{ position: 'relative' }}>
      
      <NavLink to="/cart" className="cart-link">
        <img className="cart" src={cart} alt="Cart" style={{ width: 40 }} />
      </NavLink>

      {quantity > 0 && (
        <span
          className="cart-counter"
          style={{
            position: 'absolute', 
            top: '-5px', 
            right: '-5px', 
            backgroundColor: 'red', 
            color: 'white', 
            borderRadius: '50%', 
            width: '20px', 
            height: '20px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontSize: '12px', 
            fontWeight: 'bold'
          }}
        >
          {quantity}
        </span>
      )}
    </div>
  );
}
