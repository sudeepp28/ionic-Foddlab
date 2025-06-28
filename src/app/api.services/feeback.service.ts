import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})

export class FeedBackService{
constructor(private http:HttpClient){}
    apiUrl="https://foodlabbackend-production.up.railway.app/feedback"

    sendFeedBack(feedBack:any):Observable<any>{
      return  this.http.post(this.apiUrl,feedBack)
    }

}