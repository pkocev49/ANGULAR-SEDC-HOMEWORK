// Import necessary components and modules from Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, Product } from 'src/app/interfaces/product.inteface'; // Import custom interfaces
import { OrdersService } from 'src/app/service/orders.service'; // Import a service

// Declare the component metadata
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  // Constructor: Inject the OrdersService
  constructor(private readonly orderService: OrdersService) {}

  // Initialize variables
  productList: Product[] = []; // Array to store products
  private productsSubscription: Subscription; // Subscription to handle products update
  addProductForm: FormGroup; // Form group for adding a product

  // Track the highest product ID
  highestProductId = 20;

  // Expected categories for products
  expectedCategories = ['ELECTRONICS', 'CLOTHING', 'BOOKS', 'SPORTS'];

  // Initialize component on ngOnInit
  ngOnInit(): void {
    // Subscribe to the products observable in the service
    this.productsSubscription = this.orderService.getAllProducts.subscribe({
      next: (products: Product[]) => {
        this.productList = products; // Update the local productList
        // Find the highest product ID from the current products
        this.highestProductId = Math.max(
          ...products.map((product) => product.id),
          0
        );
      },
    });
    // Initialize the form
    this.initForm();
  }

  // Define a default product value for the form
  addProductFormValue: Product = {
    id: (this.highestProductId += 1),
    name: '',
    description: '',
    price: 0,
    category: Category.ELECTRONICS,
    stock: 0,
  };

  // Initialize the form using Angular's reactive forms approach
  initForm(): void {
    this.addProductForm = new FormGroup({
      id: new FormControl(this.highestProductId + 1), // Initialize with the next ID
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      price: new FormControl(1, [Validators.required]),
      category: new FormControl(Category.ELECTRONICS, [
        Validators.required,
        // Bind the current instance to access expectedCategories
        this.categoryValue.bind(this),
      ]),
      stock: new FormControl(1, [Validators.required]),
    });
  }

  // Handle form submission
  onFormSubmit(): void {
    if (this.addProductForm.valid) {
      // Create a new product object from form values
      const newProduct: Product = {
        id: this.highestProductId + 1,
        name: this.addProductForm.get('name')?.value,
        description: this.addProductForm.get('description')?.value,
        price: this.addProductForm.get('price')?.value,
        category: this.addProductForm.get('category')?.value,
        stock: this.addProductForm.get('stock')?.value,
      };

      // Add the new product to the productList array
      this.productList.push(newProduct);

      // Update the products in the service
      this.orderService.addNewProduct(this.productList);

      // Reset the form
      this.addProductForm.reset();
    }
  }

  // Custom validator function for the 'category' form control
  categoryValue(control: FormControl): { [s: string]: boolean } | null {
    if (this.expectedCategories.includes(control.value)) {
      return null; // Valid category
    }
    return { invalidCategory: true }; // Invalid category
  }

  // Unsubscribe from the products observable when component is destroyed
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
