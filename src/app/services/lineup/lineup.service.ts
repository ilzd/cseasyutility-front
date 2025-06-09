import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lineup } from '../../models/lineup.model';

@Injectable({
  providedIn: 'root',
})
export class LineupService {
  private readonly apiUrl = 'http://localhost:5000/api/lineups';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Lineup[]> {
    return this.http.get<Lineup[]>(this.apiUrl);
  }

  getById(id: string): Observable<Lineup> {
    return this.http.get<Lineup>(`${this.apiUrl}/${id}`);
  }

  create(lineup: Lineup): Observable<Lineup> {
    return this.http.post<Lineup>(this.apiUrl, lineup);
  }

  update(id: string, lineup: Partial<Lineup>): Observable<Lineup> {
    return this.http.put<Lineup>(`${this.apiUrl}/${id}`, lineup);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
