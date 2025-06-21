
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { restaurants } from "../model";



@Injectable({providedIn:"root"})

export class RestaurantlistService{
constructor(private http:HttpClient){

}
url="https://foodlabbackend.onrender.com"
getRestaurants():Observable<restaurants[]>{
  
    return this.http.get<restaurants[]>(this.url)
}
updateRestaurant(id:any,update:any){
    return this.http.put<any>(`${this.url}/${id}`,update)
}



}