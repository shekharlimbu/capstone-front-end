import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  constructor(private _notificationService: NotificationService, private _router: Router){}

  notifications: any = [];

  ngOnInit(){
    this._notificationService.getNotifications()
    .subscribe(
      res => {
        this.notifications = res;
      },
      err => {
        console.log(err);
        if(err instanceof HttpErrorResponse){
          //added || err.status === 500 
          if(err.status === 401 || err.status === 500){
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
}
