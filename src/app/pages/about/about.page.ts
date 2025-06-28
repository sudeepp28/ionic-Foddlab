import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class AboutPage implements OnInit {
email="support@foodlab.com"
  constructor( private router:Router) { }

  ngOnInit() {
    
  }
  goBack(){
this.router.navigate(['/tabs/accounts'])
  }

}
