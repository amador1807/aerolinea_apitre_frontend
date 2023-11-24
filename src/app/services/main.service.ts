import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public API_URL = "http://localhost:3000/";

  constructor(
    private http: HttpClient
  ) { }

  getSimple(api: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(api, httpOptions);
  }

  get(api: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(this.API_URL + api, httpOptions);
  }

  post(api: any, body: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(this.API_URL + api, body, httpOptions);
  }

  patch(api: any, body: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.patch(this.API_URL + api, body, httpOptions);
  }


  delete(api: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.delete(this.API_URL + api, httpOptions);
  }


}