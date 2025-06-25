import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/api.services/author.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  imports:[FormsModule,CommonModule]
})
export class DeleteAccountComponent {
  @Output() close = new EventEmitter();

  email = '';
  password = '';
  step = 1;
  message = '';
  loading = false;

  private api = 'https://foodlabbackend-production.up.railway.app';

  constructor(private http: HttpClient, private authService: AuthService) {}

  onClose() {
    this.close.emit();
  }

  checkUser() {
    this.message = '';
    this.loading = true;
    this.http.post(`${this.api}/check-user`, { email: this.email }).subscribe({
      next: () => {
        this.step = 2;
        this.loading = false;
      },
      error: () => {
        this.message = 'User does not exist';
        this.loading = false;
      }
    });
  }

  deleteAccount() {
    this.message = '';
    this.loading = true;
    this.http.post(`${this.api}/delete-user`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Account deleted successfully';
        this.authService.logout();
        this.resetForm();
        this.loading = false;
        setTimeout(() => this.onClose(), 2000); // auto-close after 2s
      },
      error: (err) => {
        this.message = err.error?.message || 'Error deleting account';
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.step = 1;
  }
}
