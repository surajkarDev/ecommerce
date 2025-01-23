import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartItem')) || []);

  const updateCart = (items) => {
    setCartItem(items);
    localStorage.setItem('cartItem', JSON.stringify(items));
  };

  return (
    <CartContext.Provider value={{ cartItem, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
