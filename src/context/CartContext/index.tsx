import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '@src/services/products.service';

export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  CLEAR_PRODUCT_FROM_CART = 'CLEAR_PRODUCT_FROM_CART',
}

export type CartProduct = {
  product: Product;
  quantity: number;
};

type State = {
  items: CartProduct[];
};

type Action =
  | {
      type: CartActionTypes;
      payload: Product;
    }
  | {
      type: CartActionTypes.CLEAR_CART;
      payload: null;
    };

const cartReducer = (state: State, action: Action) => {
  function findExistingItem(product: Product) {
    return state.items.find((item) => item.product.id === product.id);
  }

  function increaseQuantity(product: Product) {
    return state.items.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  function decreaseQuantity(product: Product) {
    return state.items
      .map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item,
      )
      .filter((item) => item.quantity > 0);
  }

  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      if (findExistingItem(action.payload)) {
        return {
          ...state,
          items: increaseQuantity(action.payload),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }

    case CartActionTypes.REMOVE_FROM_CART:
      if (findExistingItem(action.payload)) {
        return {
          ...state,
          items: decreaseQuantity(action.payload),
        };
      }
      return state;

    case CartActionTypes.CLEAR_PRODUCT_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.id),
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

const initialCartState: State = {
  items: [],
};

const initialCartContext = {
  cartState: initialCartState,
  dispatch: (action: Action) => {},
};

const CartContext = createContext<{
  cartState: State;
  dispatch: React.Dispatch<Action>;
}>({
  ...initialCartContext,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

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
