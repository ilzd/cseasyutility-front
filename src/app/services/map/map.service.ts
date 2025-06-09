import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Map } from '../../models/map.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly apiUrl = 'http://localhost:5000/api/maps';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Map[]> {
    return this.http.get<Map[]>(this.apiUrl);
  }

  getById(id: string): Observable<Map> {
    return this.http.get<Map>(`${this.apiUrl}/${id}`);
  }
}
