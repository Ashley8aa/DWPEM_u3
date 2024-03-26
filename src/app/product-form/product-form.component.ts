import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../productservice/products.service';
import { ProductForm } from '../products';
import { Router , RouterLink} from '@angular/router';

export interface CreateForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  private _productsService = inject(ProductsService);
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _router = inject(Router);
  private _productId = '';


  get productId(): string {
    return this._productId;
  }

  
  @Input() set productId(value: string){
    this._productId = value;
    this.setFormValues(this._productId)
  }


  form = this._formBuilder.group<CreateForm>({
    name: this._formBuilder.control('', Validators.required),
    price: this._formBuilder.control(0, Validators.required),
    description: this._formBuilder.control('', Validators.required),
  });
  
  async createProduct(){
    if (this.form.invalid) return;
    const product = this.form.value as ProductForm;
    
    try {
      await this._productsService.createProducts(product);
      this._router.navigateByUrl('/store');
    } catch (error) {
      //errror
    }
  }
  
  async setFormValues(id: string) {
    try {
      const product = await this._productsService.getProduct(id);
      if(!product) return; 
      this.form.setValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });

    } catch (error) {

    }
    
  }
 


}


