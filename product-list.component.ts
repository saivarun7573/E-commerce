import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { loadProductsFailure, loadProductsSuccess } from '../../store/actions/product.actions';
import { ProductService } from '../../services/product.service';
import { addToCart } from 'src/app/store/actions/cart.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<{ products: { products: Product[] } }>, private productService: ProductService) {
    this.products$ = this.store.select('products').pipe(
      map(state => state.products)
    );
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.store.dispatch(loadProductsSuccess({ products }));
    }, error => {
      this.store.dispatch(loadProductsFailure({ error }));
    });
  }

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));
  }
}
