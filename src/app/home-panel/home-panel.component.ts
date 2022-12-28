import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.css']
})
export class HomePanelComponent implements OnInit{
  constructor(private _notificationService: NotificationService){}

  home: any = [];

  ngOnInit(){
    this._notificationService.getHome()
    .subscribe(
      res => {
        this.home = res;
      },
      err => console.log(err)
    )
  }
}
