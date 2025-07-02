import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/api.services/order.Service';
import { OrderCartComponent } from "../../components/order-cart/order-cart.component";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule, OrderCartComponent]
})
export class OrderDetailsPage implements OnInit {
orderId:any
order:any
bill:any
  constructor(private route:ActivatedRoute, private orderService:OrderService, private router:Router) { }

  ngOnInit() {
this.orderId=this.route.snapshot.paramMap.get('id')
this.getOrder(this.orderId)
  }
  getOrder(orderId:any){
    this.orderService.getOrders().subscribe((data)=>{
      const orders=data

      this.order=orders.find((o:any)=>o._id===orderId)
      console.log(this.order)
      this.bill=this.order.bill
    })
  }
  goBack(){
this.router.navigate(['/tabs/orders'])
  }
   
    
 isOrderCart=false
 openOrderCart(){
  this.isOrderCart=true
 }
 onclose(){
  this.isOrderCart=false
 }
 onOrderPlaced(){
  
 }

}
