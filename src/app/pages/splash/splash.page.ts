import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [   CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

    setTimeout(()=>{
      this.router.navigateByUrl('/tabs/home');
    }, 5000)
  }

}
