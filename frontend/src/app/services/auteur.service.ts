import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // GET all auteurs
  getAuteurs(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auteurs`);
  }

  // GET by id
  getAuteurById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auteurs/${id}`);
  }

  // CREATE
  createAuteur(data: any): Observable<any> {
    return this.http.post(environment.apiUrl, data);
  }

  // UPDATE
  updateAuteur(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/auteurs/${id}`, data);
  }

  // DELETE
  deleteAuteur(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/auteurs/${id}`);
  }
}