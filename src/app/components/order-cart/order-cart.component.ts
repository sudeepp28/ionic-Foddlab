import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/api.services/cart.service';
import { OrderService } from 'src/app/api.services/order.Service';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss'],
})
export class OrderCartComponent  implements OnInit {

 @Input() bill:any
@Input() cartItems:any[]=[]
@Output() orderPlaced=new EventEmitter()
@Output() close=new EventEmitter<any>()
 ngOnInit(): void {
   console.log(this.bill)
 }

constructor(private cartService:CartService ,private orderService:OrderService, private router:Router ){}
onClose(){
this.close.emit()
}

 onOrderPlaced() {
    if (!this.cartItems.length) return;

    const orderPayload = {
      items: this.cartItems ,
      total: this.bill.toPay,
      placedAt: new Date().toISOString(),
     bill:this.bill
    };

    this.orderService.addInOrders(orderPayload).subscribe({
      next: () => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.cartItems.length = 0;+
            alert('Order placed successfully!');
            this.cartService.setShowCartButton(false)
            this.orderPlaced.emit(); 
            this.router.navigate([''])
          },
          error: (err) => console.error('Clear cart failed', err)
        });
      },
      error: (err) => console.error('Place order failed', err)
    });
  }

}
