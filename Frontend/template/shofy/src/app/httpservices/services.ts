import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
  

export class Services{
    constructor(private http:HttpClient){}
    benimUrl = "http://37.148.209.150:5001/api";


    sendRequest(url: string, method: string, data?:any): Promise<any> {
        return fetch(`${this.benimUrl}/${url}`, {
          method: method,
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data), 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
          return response.json();
      })
      }
}