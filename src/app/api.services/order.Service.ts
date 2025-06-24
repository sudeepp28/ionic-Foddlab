import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})

export class OrderService{
    constructor(private http:HttpClient){}

    private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: token || '' });
  }
url="https://foodlabbackend-production.up.railway.app/order"
    getOrders():Observable<any>{
        return this.http.get<any>(this.url,{
      headers: this.getAuthHeaders(),
    });
    }

    addInOrders(order:any):Observable<any>{
        return this.http.post<any>(this.url,order,{
      headers: this.getAuthHeaders(),
    })
    }
}