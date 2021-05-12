import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})
export class MediaplayerComponent implements OnInit {
  public audioFileSource: string = "http://localhost:8081/api/track/play/4";

  constructor() { }

  ngOnInit(): void {
  }

}
