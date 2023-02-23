// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { Order } from "./models";


@Injectable({
  providedIn: 'root'
})

export class PizzaService {

  private apiServiceUrl='';

  constructor(private http: HttpClient) { }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  // public getOrders(/* add any required parameters */): Observable<any>{
  //   return this.http.get<any>(`${this.apiServiceUrl}/orders/<email>/all`)
  // }

  // // POST /api/order
  // // Add any required parameters or return type
  // public createOrder(/* add any required parameters */ orders: Orders): Observable<Orders> { 
  //   return this.http.post<Orders>(`${this.apiServiceUrl}/orders/<email>/create`, orders);
  // }

  // public updateOrder(orders: Orders): Observable<Orders>{
  //   return this.http.put<Orders>(`${this.apiServiceUrl}/orders/<email>/create`, orders);
  // }

  // public deleteOrder(orders: Order): Observable<Order>{
  //   return this.http.delete<void>(`${this.apiServiceUrl}/orders/delete/${email}`);
  //}
  createOrder(order: Order): Promise<Order>{ 
    // creates a new order when order button is pressed, main.component will call service
    // post order to springboot, returns a promise
    // because it is a POST request, need to construct headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    // construct the payload to match the angular and springboot models
    const payload = {
      name: order.name,
      email: order.email,
      size: order.size,
      thickCrust: order.base == 'thick' ? true : false,
      sauce: order.sauce,
      toppings: order.toppings,
      comments: order.comments
    }

    console.info('>>> PizzaService: payload sent to springboot: ', payload)

    return firstValueFrom(
      this.http.post<Order>(`/api/order`, payload, { headers: headers} )
    )

  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrder(email: string): Promise<Order[]> { 
    return firstValueFrom<Order[]>(
      this.http.get<any>(`/api/order/${email}/all`)
    )
    
  }


}
