import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { OrderService } from 'src/app/api.services/order.Service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
constructor(private orderService:OrderService ){}

orderItems:any[]=[]

ngOnInit(): void {
  
  this.orderService.getOrders().subscribe((data)=>{
    this.orderItems=data.reverse()
    console.log(this.orderItems)
  })

 

}
}
