import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonRow, IonCol, IonImg, IonText, IonButton
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/api.services/profile.service';
import { AuthService } from 'src/app/api.services/author.Service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonText, IonImg, IonCol, IonRow,
    IonCard, IonContent, IonHeader, IonToolbar,
    CommonModule, FormsModule, RouterModule
  ]
})
export class AccountsPage {
  token: any;
  user: any;
  userProfile: any;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

 
  ionViewWillEnter() {
    this.token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    if (this.user?._id) {
      this.getprofileData(this.user._id);
    }
  }

  getprofileData(userId: string) {
    this.profileService.getprofileData().subscribe((data: any) => {
      this.userProfile = data.find((d: any) => d.userId === userId);
      console.log(this.userProfile);
    });
  }

  onClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
