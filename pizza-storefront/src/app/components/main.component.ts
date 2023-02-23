import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  orderForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private pizzaSvc: PizzaService) {}

  ngOnInit(): void {
    this.orderForm = this.createForm()
    this.orderForm.reset()
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  doPlaceOrder() {
    const order: Order = this.orderForm.value as Order
    console.info('>>> MainComponent: ngSubmit: order: ', order)
    // navigate to the view 1
    this.router.navigate(['/orders', order.email])
    // calls pizza service, pass in the obtained order, to make http post request to springboot
    this.pizzaSvc.createOrder(order)
  }

  listOrders() {
    const email: string = this.orderForm.value['email']
    // navigate to the view 1
    this.router.navigate(['/orders', email])
    // calls pizza service, pass in the email as parameterized value, to make http get request to springboot
    // this.pizzaSvc.getOrders(email)
  }

  onCheckboxChange(e: any) {
    const toppings: FormArray = this.orderForm.get('toppings') as FormArray;
    if (e.target.checked) {
      toppings.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      toppings.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          toppings.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  // helper functions
  private createForm() {
    return this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, Validators.required),
      base: this.fb.control<string>('', Validators.required),
      sauce: this.fb.control<string>('', Validators.required),
      toppings: this.fb.array([], [Validators.required, Validators.min(1)]),
      comments: this.fb.control<string>(''),  
    })
  }

}
