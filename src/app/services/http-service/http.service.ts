import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteObj } from 'src/assets/types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl : string = "https://localhost:7231/api"
  //private baseUrl: string = "https://fundoonotes.incubation.bridgelabz.com/api"

  private authHeader = new HttpHeaders({
    // 'Accept': "application/json",
    Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
  })
  
  

  constructor(private http : HttpClient) { }

  loginApi(email: string, password: string) : Observable<any>{
     return this.http.get(`${this.baseUrl}/User/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
  }


  signupApi(body: object): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/User/SignUp`, body); // Send POST request with body
  }

  getAllNotesApi(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl+endpoint, {headers: this.authHeader})
  }

  addNoteApi(endpoint: string, data: NoteObj): Observable<any> {
    return this.http.post(this.baseUrl+endpoint, data, { headers: this.authHeader })
  }
  archiveApi(endpoint: string):Observable<any>{
    return this.http.patch(this.baseUrl+endpoint,{}, { headers: this.authHeader })
  }
  trashApi(endpoint:string):Observable<any>{
    return this.http.patch(this.baseUrl+endpoint,{}, { headers: this.authHeader })
  }
  deleteApi(endpoint:string):Observable<any>{
    return this.http.delete(this.baseUrl+endpoint,{ headers: this.authHeader })
  }
  colourApi(endpoint:string):Observable<any>{
    return this.http.put(this.baseUrl+endpoint,{},{headers: this.authHeader })
  }
}
