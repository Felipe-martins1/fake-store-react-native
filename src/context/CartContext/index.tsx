import React, { createContext, useContext, useReducer } from 'react';

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
}

type State = {
  items: any[];
};

type Action = {
  type: CartActionTypes;
  payload: any;
};

const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

const CartContext = createContext<{
  cartState: State;
  dispatch: React.Dispatch<Action>;
}>({
  cartState: { items: [] },
  dispatch: (action: Action) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  return <CartContext.Provider value={{ cartState, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
