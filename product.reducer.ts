// src/app/store/reducers/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { loadProductsSuccess, loadProductsFailure } from '../actions/product.actions';

export interface ProductState {
  products: Product[];
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, error }))
);
