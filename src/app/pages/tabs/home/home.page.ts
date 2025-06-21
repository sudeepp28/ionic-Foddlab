import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,  IonToolbar, IonItem, IonLabel, IonIcon, IonText, IonButton, IonRow, IonCol, IonSearchbar, IonCardContent, IonCard, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDown, location ,cart, notifications, options, search, star } from 'ionicons/icons';
import { RestaurantlistService } from 'src/app/api.services/restaurantlist.service';
import { restaurants } from 'src/app/model';
import { SavedRestaurantsService } from 'src/app/api.services/saved-restuarants.service';
import { RouterModule } from '@angular/router';

// import { ListHeadingComponent } from 'src/app/components/list-heading/list-heading.component';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonCard, IonCardContent, IonSearchbar, IonCol, IonRow, IonButton, IonText, IonIcon,  IonLabel, IonItem, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,RouterModule]
})
export class HomePage implements OnInit {
  restaurants: any[] = [];
  saved: any[] = [];

  constructor(
    private restaurantService: RestaurantlistService,
    private savedService: SavedRestaurantsService
  ) {
      addIcons({location,chevronDown,cart,notifications,search,star});}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });

    this.savedService.getSavedRestaurants().subscribe((savedList) => {
      this.saved = savedList;
    });

    this.savedService.fetchSavedRestaurants();
  }

  isSaved(restaurantId: string): boolean {
    return this.saved.some((item) => item.restaurantId === restaurantId);
  }

  save(restaurant: any): void {
    const { _id, ...restaurantData } = restaurant;
    const newSave = { restaurantId: _id, ...restaurantData };
    this.savedService.saveRestaurant(newSave).subscribe({
      next: () => this.savedService.fetchSavedRestaurants(),
      error: (err) => alert(err.error.message || 'Error saving restaurant'),
    });
  }

  remove(restaurantId: string): void {
    this.savedService.removeSavedRestaurant(restaurantId).subscribe({
      next: () => this.savedService.fetchSavedRestaurants(),
      error: (err) => alert(err.error.message || 'Error removing restaurant'),
    });
  }

}
