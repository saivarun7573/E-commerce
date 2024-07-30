// src/app/store/reducers/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models/cart-item.model';
import { addToCart, removeFromCart } from '../actions/cart.actions';

// export interface CartState {
//   cartItems: CartItem[];
// }

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existingItem = state.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        ...state,
        cartItems: state.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      return {
        ...state,
        cartItems: [...state, { product, quantity: 1 }]
      };
    }
  }),
  on(removeFromCart, (state, { productId }) => ({
    ...state, 
    cartItems: state.filter(item => item.product.id !== productId)
  }))
);
