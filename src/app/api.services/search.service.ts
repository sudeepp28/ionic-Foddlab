import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { restaurants } from "../model";

@Injectable({providedIn:"root"})

export class SearchService{

    constructor(private http:HttpClient){}
     apiUrl="https://foodlabbackend.onrender.com"

  private searchedTerm=new BehaviorSubject<any>('');
  currentTerm=this.searchedTerm.asObservable()
   
    // searchResults:restaurants[]=[]
setdata(term:any){
    this.searchedTerm.next(term)
    
}

    


   search(query:string): Observable<{  result: restaurants[] }> {
    return this.http.get<{  result: restaurants[] }>(`${this.apiUrl}?q=${query}`);
  }
}