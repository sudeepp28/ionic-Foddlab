import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { OrderService } from 'src/app/api.services/order.Service';
import { Router, RouterModule } from '@angular/router';
import { OrderTabComponent } from 'src/app/components/order-tab/order-tab.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule,RouterModule, OrderTabComponent]
})
export class OrdersPage  {
constructor(private orderService:OrderService , private router:Router){}

orderItems:any[]=[]

ionViewWillEnter() {
  
this.getOrders()

 

}
getOrders(){
    this.orderService.getOrders().subscribe((data)=>{
    this.orderItems=data.reverse()
    console.log(this.orderItems)
  })
}

selectedOrderId:any

openOrderTab(id:any){
 this.selectedOrderId=id
 console.log(id)
}
oncloseOrderTab(){
 this.selectedOrderId=null;
}
goToOrderDetails(id:any){
this.router.navigate(['order-details',id])
}
}
