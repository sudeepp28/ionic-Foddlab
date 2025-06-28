import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule]
})
export class NotificationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['/settings'])
  }

}
