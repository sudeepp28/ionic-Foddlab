import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonImg, IonCard, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { RestaurantlistService } from 'src/app/api.services/restaurantlist.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Dishes, restaurants } from 'src/app/model';
import { AddToCartComponent } from 'src/app/components/add-to-cart/add-to-cart.component';
import { CartService } from 'src/app/api.services/cart.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.page.html',
  styleUrls: ['./dishes.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonImg, IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule,AddToCartComponent,RouterModule]
})
export class DishesPage implements OnInit {

   selectedRestaurantId: string| null = null;
   restaurants:restaurants[]=[]
   selectedRestaurant:restaurants|undefined
   dishes:Dishes|undefined
   CartItems:any[]=[]
   ShowButton:boolean=false;
  constructor(private restaurantlistService:RestaurantlistService, private route: ActivatedRoute,private cartService:CartService, private cd:ChangeDetectorRef, private router:Router) { }


 ngOnInit(): void {
  this.restaurantlistService.getRestaurants().subscribe((data) => {
    this.restaurants = data;

    const idParam = this.route.snapshot.paramMap.get('id');
    this.selectedRestaurantId = idParam;

    console.log(this.selectedRestaurantId);

    if (this.selectedRestaurantId) {
      const matchedRestaurant = this.restaurants.find(restaurant => restaurant._id === this.selectedRestaurantId);
      console.log(matchedRestaurant); 
      this.selectedRestaurant=matchedRestaurant 

      
    
      
      
    }
    
  });
 this.getCartItems();

 this.cartService.showCartButton$.subscribe((show)=>{
  this.ShowButton=show
 })
}
 selectedDish:any
 openAddToCart=false
selectDish(dish:any){
this.selectedDish={
  ...dish,
  restaurantId:this.selectedRestaurantId,
  restaurantName:this.selectedRestaurant?.name,
  address:this.selectedRestaurant?.address,
  rating:this.selectedRestaurant?.rating
}

this.openAddToCart=true;
}

closeAddToCart(){
  this.openAddToCart=false
  this.getCartItems()
}

getCartItems(){
   this.cartService.getCart().subscribe(data=>{
    this.CartItems=data
 
  })
}


clearCart(){
   this.cartService.clearCart().subscribe(() => {
      this.cartService.setShowCartButton(false)
    });
}
goBack(){
  this.router.navigate(['/'])
}
}
