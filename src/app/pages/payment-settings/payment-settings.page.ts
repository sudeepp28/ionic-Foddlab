import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.page.html',
  styleUrls: ['./payment-settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule]
})
export class PaymentSettingsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['/settings'])
  }

}
