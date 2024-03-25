import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Observable, tap } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductsService } from '../productservice/products.service';
import { Products } from '../products';
/*
interface Item {
  name: string,
  price: number,
  description: string,
};
*/


@Component({
  selector: 'app-store',
  standalone: true,
  imports: [AsyncPipe, CommonModule, NavbarComponent, RouterOutlet, RouterModule, ProductFormComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})


export class StoreComponent {
  
private _router = inject(Router);
private _productsService = inject(ProductsService);

products$ = this._productsService
.getProducts()
.pipe(tap((values) => console.log(values))); //para debug

updateProduct(product: Products){
  console.log(product);
  this._router.navigate(['/store/edit', product.id]);
}

  /*
  item$: Observable<Item[]>;
  firestore: Firestore = inject(Firestore);
  
  constructor() {
    const itemCollection = collection(this.firestore, 'products');
    this.item$ = collectionData(itemCollection) as Observable<Item[]>;
  }
*/


  
}
