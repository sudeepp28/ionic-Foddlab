import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { SearchService } from 'src/app/api.services/search.service';
import { restaurants } from 'src/app/model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCardContent, IonImg, IonCard,  IonContent, IonHeader,IonToolbar, CommonModule, FormsModule,RouterModule]
})
export class SearchPage implements OnInit {

  constructor(private searchService:SearchService, private router:Router) { }

 SearchedRestaurants:restaurants[]=[]
query:string=""
ngOnInit(): void {
  this.searchService.currentTerm.subscribe((term) => {
    this.query = term;
    console.log("term",term)
    this.loadSearchedRestaurants();
  });
}

loadSearchedRestaurants() {
  if (this.query.trim() === '') {
    this.SearchedRestaurants = [];
  } else {
    this.searchService.search(this.query).subscribe((data) => {
      this.SearchedRestaurants = data.result;
      
    });
  }
}
goBack(){
this.router.navigate(['/'])
}

}
