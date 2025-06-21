import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonIcon, IonLabel, IonTabs, IonTabBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {chatboxEllipses, fastFood, heart, home, location, person} from 'ionicons/icons'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonTabs, IonLabel, IonIcon, IonTabButton, CommonModule, FormsModule]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({
home, person, location,heart,fastFood
    })
   }

  ngOnInit() {
  }

}
