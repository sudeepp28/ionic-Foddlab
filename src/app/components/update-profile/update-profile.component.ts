import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/api.services/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  imports:[FormsModule]
})
export class UpdateProfileComponent  implements OnInit {
@Input() feild!:any;
@Input() userProfile:any
@Output() close=new EventEmitter()

email:any
name:any
dob:any
gender:any
token:any
user:any
newValue:any
  constructor(private profileService:ProfileService) { }

  ngOnInit() {

    this.getFeildValue(this.userProfile)
   this.getProfileData()
   
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

}
