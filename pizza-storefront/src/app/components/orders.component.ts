import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  email = ''
  params$!: Subscription
  orderSummaries: OrderSummary[] = []

  constructor(private activatedRoute: ActivatedRoute, private pizzaSvc: PizzaService) { }

  ngOnInit(): void {
    // retrieve the route parameter, email, from the url
    // route is activated in main.component via navigate
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.email = params['email']
        console.info('>>> OrderComponent: email: ', this.email)
      } 
    )

    // when this page initialise, make http request to get list of order
    this.pizzaSvc.getOrders(this.email)
      .then(result => {
        console.info(">>> OrderComponent: in then, result: ", result)
        this.orderSummaries = result;
      })
      .catch(error => {
        console.info(">>> OrderComponent: in error")
        console.info(">>> OrderComponent: error: ", error)
      })
    
  }

}
