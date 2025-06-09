import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapArea } from '../../models/mapArea.model';

@Injectable({
  providedIn: 'root'
})
export class MapAreaService {
  private readonly apiUrl = 'http://localhost:5000/api/mapareas';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<MapArea> {
    return this.http.get<MapArea>(`${this.apiUrl}/${id}`);
  }

  getByMap(mapId: string): Observable<MapArea[]> {
    return this.http.get<MapArea[]>(`${this.apiUrl}/map/${mapId}`);
  }
}
