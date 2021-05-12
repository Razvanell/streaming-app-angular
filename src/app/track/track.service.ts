import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from './Track';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFiveTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiServerUrl}/track/five`);
  }

  public getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiServerUrl}/track/all`);
  }

  public playTrack(id): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/track/play/${id}`);
  }

}
