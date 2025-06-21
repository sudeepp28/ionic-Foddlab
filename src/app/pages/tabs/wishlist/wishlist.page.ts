import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonButton, IonIcon, IonSearchbar, IonRow, IonText, IonLabel, IonItem, IonCard, IonImg, IonCardContent } from '@ionic/angular/standalone';
import { SavedRestaurantsService } from 'src/app/api.services/saved-restuarants.service';
import { restaurants } from 'src/app/model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonImg, IonCard,  IonText,  IonIcon, IonButton,  IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule,RouterModule]
})
export class WishlistPage implements OnInit {
savedRestaurants:any[]=[]
  constructor(private savedService:SavedRestaurantsService) { }

  ngOnInit() {
    this.savedService.getSavedRestaurants().subscribe((data)=>{
      this.savedRestaurants=data
    })
     this.savedService.fetchSavedRestaurants();
  }
   isSaved(restaurantId: string): boolean {
    return this.savedRestaurants.some(item => item.restaurantId === restaurantId);
  }

   remove(restaurantId: string): void {
    this.savedService.removeSavedRestaurant(restaurantId).subscribe({
      next: () => this.savedService.fetchSavedRestaurants(),
      error: (err) => alert(err.error.message || 'Error removing restaurant')
    });
  }
}
