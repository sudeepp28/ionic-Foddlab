import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SavedRestaurantsService {
  private apiUrl = 'https://foodlabbackend-production.up.railway.app/saved'; // Adjust if deployed

  private savedRestaurants$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: this.getToken() || ''
      })
    };
  }

  fetchSavedRestaurants(): void {
    this.http.get<any[]>(this.apiUrl, this.getAuthHeaders()).subscribe(
      (data) => this.savedRestaurants$.next(data),
      (error) => console.error('Error fetching saved restaurants:', error)
    );
  }

  getSavedRestaurants(): Observable<any[]> {
    return this.savedRestaurants$.asObservable();
  }

  saveRestaurant(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item, this.getAuthHeaders());
  }

  removeSavedRestaurant(restaurantId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${restaurantId}`, this.getAuthHeaders());
  }
}
