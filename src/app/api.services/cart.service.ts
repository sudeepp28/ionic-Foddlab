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

    url="https://foodlabbackend-production.up.railway.app/cart"
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
     addToCart(newDish: any): Observable<any> {
  return new Observable(observer => {
    this.http.get<any[]>(this.url, {
      headers: this.getAuthHeaders(),
    }).subscribe({
      next: (cartItems) => {
        const postDish = () => {
          this.http.post(this.url, newDish, {
            headers: this.getAuthHeaders(),
          }).subscribe({
            next: res => {
              console.log('Dish added to cart', res);
              observer.next(res);
              observer.complete();
            },
            error: err => observer.error(err)
          });
        };

        if (cartItems.length > 0 && cartItems[0].restaurantId !== newDish.restaurantId) {
          this.clearCart().subscribe({
            next: () => postDish(),
            error: err => observer.error(err)
          });
        } else {
          postDish();
        }
      },
      error: err => observer.error(err)
    });
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