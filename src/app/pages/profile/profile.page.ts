import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonRow, IonCol, IonImg, IonText, IonSkeletonText, IonButton, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { ProfileService } from 'src/app/api.services/profile.service';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [  IonText, IonImg, IonCol, IonRow, IonCard, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, UpdateProfileComponent,RouterModule]
})
export class ProfilePage implements OnInit {
userProfile:any
token:any
user:any
editingFeild:any
  constructor(private profileService:ProfileService, private location:Location, private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    if (this.user?._id) {
      this.getProfileData(this.user._id);
    }
    
  }
  

 getProfileData(userId: string) {
    this.profileService.getprofileData().subscribe((data: any) => {
      this.userProfile = data.find((d: any) => d.userId === userId);
      console.log(this.userProfile);
    });
  }
  edit(feild:any){
    this.editingFeild=feild
  }

  isUpdate=false
  openUpdateFeild(feild:any){
    this.isUpdate=true
    this.edit(feild)
  }
  close(){
    this.isUpdate=false
    this.token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    if (this.user?._id) {
      this.getProfileData(this.user._id);
    }
  }
 goBack(){
  console.log("routing")
  this.router.navigate(['/settings'])
 }

}
