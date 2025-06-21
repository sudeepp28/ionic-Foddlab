import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/api.services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  imports:[FormsModule]
})
export class AddToCartComponent  implements OnInit {
@Input() dish:any;
@Output() close= new EventEmitter<any>()
@Output() showCartButton= new EventEmitter<any>()




selectedPrices:any
price:number=0;
totalQuantity:number=1

constructor(private cartService:CartService){}
ngOnInit(): void {

  this.selectedPrices=this.dish.prices[0]
  
}
onClose(){
  this.close.emit()
}
decrease(){
  if(this.totalQuantity>1){
    this.totalQuantity--
  }
}
increase(){
  this.totalQuantity++
}
addToCart(){
const cartData={
  restaurantName:this.dish.restaurantName,
  restaurantId:this.dish.restaurantId,
   name: this.dish.name,
   imgUrl:this.dish.imgUrl,
      address: this.dish.address,
      rating: this.dish.rating,
      Quantity: this.totalQuantity,
      ...this.selectedPrices
}

this.cartService.addToCart(cartData)

this.cartService.setShowCartButton(true)
  this.close.emit()

  alert(`${cartData.name} is added to FoodCart`)
}

}
