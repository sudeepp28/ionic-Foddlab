import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonItem, IonLabel, IonIcon, IonText,
  IonButton, IonRow, IonCol, IonSearchbar, IonCardContent, IonCard, IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDown, location, cart, notifications, options, search, star } from 'ionicons/icons';
import { RestaurantlistService } from 'src/app/api.services/restaurantlist.service';
import { SavedRestaurantsService } from 'src/app/api.services/saved-restuarants.service';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SearchService } from 'src/app/api.services/search.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonImg, IonCard, IonCardContent, IonSearchbar, IonCol, IonRow, IonButton,
    IonText, IonIcon, IonLabel, IonItem, IonContent, IonHeader, IonToolbar,
    CommonModule, FormsModule, RouterModule,
   
]
})
export class HomePage implements OnInit, OnDestroy {
  restaurants: any[] = [];
  saved: any[] = [];
  searchedInputs = '';
  locality: string = 'your area';
  private routerSub!: Subscription;

  constructor(
    private restaurantService: RestaurantlistService,
    private savedService: SavedRestaurantsService,
    private router: Router,
    private searchService: SearchService,
  ) {
    addIcons({ location, chevronDown, cart, notifications, search, star });
  }

  ngOnInit(): void {
    this.loadData();

    // 🔁 Detect navigation back to home tab and update locality
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/tabs/home') {
          this.updateLocality();  
          this.loadData();
        }
      });

    this.updateLocality(); 
  }

  updateLocality(): void {
    const savedLocality = localStorage.getItem('userLocality');
    this.locality = savedLocality ? savedLocality : 'your area';
  }

  loadData(): void {
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
      error: (err) => {
        alert(err.error.message || 'Login first'),
      this.router.navigate(['/login'])
      }
    });
  }

  remove(restaurantId: string): void {
    this.savedService.removeSavedRestaurant(restaurantId).subscribe({
      next: () => this.savedService.fetchSavedRestaurants(),
      error: (err) => alert(err.error.message || 'Error removing restaurant'),
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  onSearch(): void {
    this.searchService.setdata(this.searchedInputs);
    if (this.searchedInputs) {
      this.router.navigate(['/search']);
      console.log(this.searchedInputs);
    }
  }

  isDropDown=false

 
}
