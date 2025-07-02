import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/api.services/order.Service';

@Component({
  selector: 'app-order-tab',
  templateUrl: './order-tab.component.html',
  styleUrls: ['./order-tab.component.scss'],
})
export class OrderTabComponent  implements OnInit {
  @Output() close=new EventEmitter()
  @Input() orderId:any
  constructor(private router:Router , private orderService:OrderService) { }

  ngOnInit() {}

  onClose(){
    this.close.emit()
  }
  goTo(){
    this.router.navigate(['order-details',this.orderId])
    this.close.emit()
  }
  deleteOrder(){
    this.orderService.deleteOrder(this.orderId).subscribe(()=>{
      console.log("order Deleted successfully");
      this.close.emit()
    })
  }
 
}
