import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ExplorePage implements OnInit {
 locality: string = '...';

  constructor(private http: HttpClient) {}

  ngOnInit() {
     const saved = localStorage.getItem('userLocality');
  if (saved) {
    this.locality = saved;
  } 
  }

 async getUserLocation() {
  try {
    const position = await Geolocation.getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.reverseGeocode(lat, lon);
  } catch (err) {
    console.error('Error getting location', err);
    this.locality = 'your area';
  }
}

 reverseGeocode(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;

  this.http.get<any>(url).subscribe(data => {
    const address = data?.address;
    this.locality = address?.suburb || address?.city || address?.town || address?.village || 'your area';
    console.log(this.locality)
     localStorage.setItem('userLocality', this.locality);
  }, error => {
    console.error('Reverse geocoding failed:', error);
    this.locality = 'your area';
    
  });
}

}
