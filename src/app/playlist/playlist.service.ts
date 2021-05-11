import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from './playlist'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUserPlaylists(userId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiServerUrl}/playlist/user/${userId}`);
  }

  public postPlaylist(playlist: Playlist, userId: number): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.apiServerUrl}/playlist/post/${userId}`, playlist);
  }

  public deletePlaylist(playlistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/playlist/delete/${playlistId}`);
  }

  public putPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiServerUrl}/playlist/put`, playlist);
  }

  public removeTrack(playlist: Playlist, trackId: number): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiServerUrl}/playlist/remove-track/${trackId}`, playlist);
  }

}
