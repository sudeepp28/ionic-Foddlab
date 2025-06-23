import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/api.services/profile.service';
import { IonButton, IonItem, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api.services/author.Service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  imports:[FormsModule, IonIcon]
})
export class UpdateProfileComponent  implements OnInit {
@Input() feild!:any;
@Input() userProfile:any
@Output() close=new EventEmitter()

selectedFile: File | null = null;
email:any
name:any
dob:any
gender:any
token:any
user:any
newValue:any
oldPassword=""
newPassword=""
confirmPassword=""
passwordChanged=false
  constructor(private profileService:ProfileService, private router:Router, private authService:AuthService) { }

  ngOnInit() {

    this.getFeildValue(this.userProfile)
   this.getProfileData()
   this.gender = this.userProfile.gender || 'gender';
  }
  
onclose(){
this.close.emit()
}
fieldValue:any
getFeildValue(userProfile:any){
  this.fieldValue=userProfile?.[this.feild]
}
updatePhoto(){

}
updateName(){
  if(this.name=""){
    alert ("name required")
    return
  }
  const nameData={userId:this.userProfile.userId,name:this.name}
  this.profileService.updateName(nameData).subscribe(res=>{
    this.close.emit()
    console.log('name is changed',res)
  },
  err=>{
    console.log("name update failed ",err)
  }
)
}
updateEmail(){

  const emailData={userId:this.userProfile.userId,email:this.email}
  this.profileService.updateEmail(emailData).subscribe(  res => {
    this.close.emit()
        console.log('Email updated successfully', res);
      },
      err => {
        console.error('Email update failed', err);
      }
    );
}
updateDob(){

  const dobData={userId:this.userProfile.userId,dob:this.dob}
  console.log(dobData)
  this.profileService.updateDob(dobData).subscribe(  res => { this.close.emit()
        console.log('D.O.B updated successfully', res);
      },
      err => {
        console.error('D.O.B update failed', err);
      }
    );
}
updateGender(){
  const genderData={userId:this.userProfile.userId,gender:this.gender}
  this.profileService.updateGender(genderData).subscribe(
    res=>{
      console.log("gender updated",res)
      this.close.emit()
      // this.userProfile.dob = this.dob;
    },
    err=>{
      console.log("gender no updated",err)
    }
  )
}
getProfileData(){
   this.profileService.getprofileData().subscribe(res=>{
        console.log("profiledataupdated")
      })
}

changePassword() {
  if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
    return alert('Please fill all fields');
  }

  if (this.newPassword !== this.confirmPassword) {
    return alert('New and Confirm Password do not match');
  }

  const data = {
    userId: this.userProfile.userId,
    oldPassword: this.oldPassword,
    newPassword: this.newPassword
  };

  this.authService.changePassword(data).subscribe({
    next: () => {
      this.passwordChanged = true;
      this.clearForm();
    },
    error: (err) => {
      alert(err.error.message || 'Error changing password');
    }
  });
}
clearForm() {
  this.oldPassword = '';
  this.newPassword = '';
  this.confirmPassword = '';
}

logoutAllDevices() {
  // Ideally, call backend to invalidate all tokens if implemented
  localStorage.removeItem('token'); // Clear token
  this.router.navigate(['/login']);
  this.close.emit()
}
onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

 loader=false 
updateProfileImage(){
  this.loader=true
  const userId= this.userProfile.userId;

   if (!this.selectedFile) {
    console.log("image not selected")
      return;
    }
  const formData=new FormData();
  formData.append('userId',userId);
  formData.append('image', this.selectedFile)
  this.profileService.updateProfile(formData).subscribe(()=>{
    this.loader=false
    console.log("image uploaded")
    this.close.emit()
  })
}

showOldP=false
showNewP=false
showConfirmP=false

showOp(){
  this.showOldP=!this.showOldP
}
showNp(){
  this.showNewP=!this.showNewP
}

showCp(){
  this.showConfirmP=!this.showConfirmP
}

}
