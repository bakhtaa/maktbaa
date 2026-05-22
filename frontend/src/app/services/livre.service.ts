import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreService {


  constructor(private http: HttpClient) { }

  // GET all livres
  getLivres(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/livres`);
  }

  // GET by id
  getLivreById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/livres/${id}`);
  }

  // CREATE
  createLivre(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/livres`, data);
  }

  // UPDATE
  updateLivre(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/livres/${id}`, data);
  }

  // DELETE
  deleteLivre(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/livres/${id}`);
  }
}