import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from './track';
import { TrackService } from './track.service';
import { Playlist } from '../playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  public playlists: Playlist[];
  public tracks: Track[];
  public currentPlaylist: Playlist;
  public viewAll = false;
  public audioFileSource: string;

  constructor(private trackService: TrackService, private playlistService: PlaylistService, private router: Router) { }

  ngOnInit() {
    this.getFiveTracks();
    this.getUserPlaylists();
  }

  openComponent(): void {
    this.router.navigate(["/", "track"])
  }

  public searchTracks(key: string): void {
    console.log(key);
    const results: Track[] = [];
    for (const track of this.tracks) {
      if (track.title.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        track.artist.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
        results.push(track);
      }
    }
    this.tracks = results;
    if (results.length === 0 || !key) {
      setTimeout(
        () => {
          this.getTracks();
        },
        500);
    }
  }

  public getFiveTracks(): void {
    this.trackService.getFiveTracks().subscribe(
      (response: Track[]) => {
        this.tracks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTracks(): void {
    this.viewAll = true;
    this.trackService.getTracks().subscribe(
      (response: Track[]) => {
        this.tracks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUserPlaylists(): void {
    this.playlistService.getUserPlaylists(1).subscribe(
      (response: Playlist[]) => {
        this.playlists = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public setCurrentPlaylist(currentPlaylist: Playlist): void {
    this.currentPlaylist = currentPlaylist;
  }

  public checkIfTrackIsInCurrentPlaylist(track: Track): boolean {

    // if (this.currentPlaylist.tracks.some(playlistTrack => playlistTrack.id === track.id)) {
    //   return false;
    // } 
    return true;

  }

  public addTrackToPlaylist(track: Track, playlistId: number): void {
    this.trackService.addTrackToPlaylist(track, playlistId).subscribe(
      (response: Track) => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /*Media Player*/

  public playTrack(id): void {
    this.audioFileSource = "http://localhost:8081/api/track/play/" + id;
  }

}
