import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})

export class ProfileService{
    constructor(private http:HttpClient){}

    url="https://foodlabbackend-production.up.railway.app"

    // apiUrl="http://localhost:5000"
    getprofileData():Observable<any>{
return this.http.get<any[]>(`${this.url}/profile`)
    }

    updateProfile(formData:any):Observable<any>{
return  this.http.post<any>(`${this.url}/upload`, formData)
    }
    deleteData(userId:any):Observable<any>{
return this.http.delete(`${this.url}/profile/${userId}`)
    }

    updateEmail(emailData:any):Observable<any>{
      return  this.http.post(`${this.url}/update/email`,emailData)
    }

     updateName(nameData:any):Observable<any>{
      return  this.http.post(`${this.url}/update/name`,nameData)
    }
     updateDob(dobData:any):Observable<any>{
      return  this.http.post(`${this.url}/update/dob`,dobData)
    }
     updateGender(genderData:any):Observable<any>{
      return  this.http.post(`${this.url}/update/gender`,genderData)
    }
}