import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:"root"})

export class CartService{

    constructor(private http:HttpClient){}
 private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: token || '' });
  }

    url="https://foodlabbackend.onrender.com/cart"
      private showCartButtonSubject = new BehaviorSubject<boolean>(false);
  showCartButton$ = this.showCartButtonSubject.asObservable();

  setShowCartButton(value: boolean) {
    this.showCartButtonSubject.next(value);
  }

    getCart():Observable<any>{
        return this.http.get<any>(this.url,{
      headers: this.getAuthHeaders(),
    })
    }
     addToCart(newDish: any): void {
  this.http.get<any[]>(this.url,{
      headers: this.getAuthHeaders(),
    }).subscribe(cartItems => {
    if (cartItems.length > 0) {
      const existingRestaurantId = cartItems[0].restaurantId;

      if (existingRestaurantId !== newDish.restaurantId) {
        // 🧹 Clear cart if from a different restaurant
        this.clearCart().subscribe(() => {
          this.http.post(this.url, newDish,{
      headers: this.getAuthHeaders(),
    }).subscribe(res => {
            console.log('Dish added after clearing cart', res);
          });
        });
      } else {
        // ➕ Always add the new dish (no merge)
        this.http.post(this.url, newDish,{
      headers: this.getAuthHeaders(),
    }).subscribe(res => {
          console.log('New dish added to cart (no merge)', res);
        });
      }
    } else {
      // 🛒 Cart is empty - just add
      this.http.post(this.url, newDish,{
      headers: this.getAuthHeaders(),
    }).subscribe(res => {
        console.log('Dish added to empty cart', res);
      });
    }
  });
}

updateItem(id:any,updatedDish:any){
    return this.http.put<any>(`${this.url}/${id}`,updatedDish,{
      headers: this.getAuthHeaders(),
    })
}


  deleteItem(_id:any){
    return this.http.delete<any>(`${this.url}/${_id}`,{
      headers: this.getAuthHeaders(),
    })
  }

  clearCart(){
    return this.http.delete<any>(`${this.url}/delete`,{
      headers: this.getAuthHeaders(),
    });
  }
 
}