import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from './models';
import { PizzaService } from './pizza.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
// export class AppComponent implements OnInit{
//   public order!: Order[];
  
//   constructor(private orderService: PizzaService){}

//   ngOnInit(): void {
//     this.getOrder();
//   }

//   public getOrder(): void{
//     this.orderService.getOrder().subscribe(
//       (response: Order[]) =>{
//         this.order = response;
//       },
//       (error: HttpErrorResponse) =>{
//         alert(error.message);
//       }
//     );
//   }
// }
