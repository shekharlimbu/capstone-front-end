import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{
  constructor(private _notificationService: NotificationService, private _router: Router){}

  public generalNotifications: any = [];
  public displayFormFlag = false;

  myForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  ngOnInit(){
    this.displayFormFlag = false;
    this._notificationService.getHome()
    .subscribe(
      res => this.generalNotifications = res,
      err => console.log(err)
    )
  }

  deleteNotification(name: any){
    console.log(name);
    this._notificationService.deleteGeneralNotification(name)
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/general']);
      },
      err => console.log(err)
    )
  }

  displayForm(){
    this.displayFormFlag = true;
  }

  hideForm(){
    this.displayFormFlag = false;
    this.myForm.reset();
  }

  addNotification(){
    console.log(this.myForm.value);

    this._notificationService.addGeneralNotification(this.myForm.value)
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/general']);
      },
      err => console.log(err)
    )
  }
}
