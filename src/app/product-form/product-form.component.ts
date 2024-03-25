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


  productForm!: FormGroup;

  constructor(private fb:FormBuilder) {
    this.productForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])  
    })
  }


  onSubmit(){
    if(this.productForm.valid){    
      const formData = this.productForm.value;
      this._productsService.createProducts(formData).then(() => {
        console.log('Product added successfully.');
        // You can optionally reset the form after successful submission
        this._router.navigate(['/store']);
      }).catch(error => {
        console.error('Error adding product: ', error);
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }



  async setFormValues(id: string) {
    try {
      const product = await this._productsService.getProduct(id);
      if (!product) return;
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });

    } catch (error) {}
  }

 


}


