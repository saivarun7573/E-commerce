// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { removeFromCart } from '../../store/actions/cart.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;

  constructor(private store: Store<{ cart: { cartItems: CartItem[] } }>) {
    this.cartItems$ = this.store.select('cart').pipe(
      map(state => state.cartItems)
    );
  }

  ngOnInit(): void { }

  removeFromCart(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
