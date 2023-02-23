import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  email = ''
  params$!: Subscription
  order!: Order
  orders: Order[] = []

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // retrieve the route parameter, email, from the url
    // route is activated in main.component via navigate
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.email = params['email']
        console.info('>>> OrderComponent: email: ', this.email)
      }
    )

    
  }

}
