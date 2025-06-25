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
import { LogoutComponent } from "../../../components/logout/logout.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonText, IonImg, IonCol, IonRow,
    IonCard, IonContent, IonHeader, IonToolbar,
    CommonModule, FormsModule, RouterModule,
    LogoutComponent
  ]
})
export class AccountsPage {
  token: any;
  user: any;
  userProfile: any;
  islogout = false;
  isLoggedIn = false;

  private authSubscription!: Subscription;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (status) {
        this.token = this.authService.getToken();
        const storedUser = this.authService.getUser();
        this.user = storedUser ? JSON.parse(storedUser) : null;
        if (this.user?._id) {
          this.getprofileData(this.user._id);
        }
      } else {
        this.token = null;
        this.user = null;
        this.userProfile = null;
      }
    });
  }

  getprofileData(userId: string) {
    this.profileService.getprofileData().subscribe((data: any) => {
      this.userProfile = data.find((d: any) => d.userId === userId);
    });
  }

  onClick() {
    this.islogout = true;
  }

  onClose() {
    this.islogout = false;
  }

  ionViewWillLeave() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
