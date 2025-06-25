import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { DeleteAccountComponent } from "../../components/delete-account/delete-account.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonCard, IonCol, IonRow, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterModule, DeleteAccountComponent]
})
export class SettingsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

 goBack(){
  this.router.navigate(['/tabs/accounts'])
}

isDAccount=false

openDaccount(){
  this.isDAccount=true
}
closeDaccount(){
  this.isDAccount=false
}
}
