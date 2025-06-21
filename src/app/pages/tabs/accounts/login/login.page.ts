import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/api.services/author.Service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
login(){
   if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res:any) => {
        console.log(res)
        this.auth.storeToken(res.token);
        this.auth.storeUser(res.user)
        this.router.navigate(['/']); 
        alert('LoggedIn')
      },
      error: () => {
        alert('Invalid email or password');
      }
    });
}
goBack(){
  this.router.navigate(['/tabs/accounts'])
}
}
