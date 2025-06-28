import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FeedBackService } from 'src/app/api.services/feeback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader,  IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FeedbackPage implements OnInit {
  feedbackForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router:Router, private feedbackService:FeedBackService) {
   
  }
  ngOnInit(): void {
     this.feedbackForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  }

  onSubmit() {
    this.submitted = true;

    if (this.feedbackForm.invalid) return;

    const formData = this.feedbackForm.value;
    console.log('Feedback submitted:', formData);

    this.feedbackService.sendFeedBack(formData).subscribe({next:()=>{
      console.log("feedback submitted")
    },
    error:()=>{
      console.log("feedback error")
    }
      })

    // TODO: send data to backend
    alert('Thank you for your feedback!');
    this.feedbackForm.reset();
    this.submitted = false;
  }
  goBack(){
    this.router.navigate(['/tabs/accounts'])
  }
}
