import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { clearCart } from '../../store/actions/cart.actions';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems$: Observable<CartItem[]>;

  constructor(private store: Store<{ cart: CartItem[] }>) {
    this.cartItems$ = this.store.select('cart');
  }

  ngOnInit(): void { }

  completeCheckout(): void {
    this.store.dispatch(clearCart());
    alert('Checkout complete!');
  }

}
