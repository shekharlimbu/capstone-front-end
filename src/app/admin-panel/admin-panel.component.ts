import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  public registrationID = '';
  public registrationIDExists = false;
  public counter: any = [];
  public counterValueExists = false;
  public counterValue = 0;
  public emailData = {};
  public displayFormFlag = false;
  public displayMsgFlag = false;
  public displayMainColumn = false;   //so that child components can stretch unless we are using this screen

  myForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  constructor(private _adminService: AdminService, private _router: Router, private r:ActivatedRoute){}

  ngOnInit(){
    this.counterValueExists = false;
    this.registrationIDExists = false;
    this.displayFormFlag = false;
    this.displayMsgFlag = false;
    this.displayMainColumn = false;
  }

  generateRegId(){
    this.displayFormFlag = true;
    this.displayMsgFlag = false;
    this.displayMainColumn = true;
    this._adminService.getCounter()
    .subscribe(
      res => {
        this.counter = res;
        this.counterValueExists = true;
        this.registrationIDExists = true;
        this.counterValue = this.counter[0].value;
        this.registrationID = 'REG-'+this.counterValue;
        console.log(this.counter);
      },
      err => console.log(err)
    )
  }

  sendEmail(){
    this.emailData = {
      "id":this.registrationID,
      "email": this.myForm.value.email
    };
    console.log(this.emailData);

    this._adminService.sendEmail(this.emailData)
    .subscribe(
      res => {
        console.log(res);
        // this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        // this._router.navigate(['/admin']);

        this.displayMsgFlag = true;
        this.displayFormFlag = false;
        this.myForm.reset();
      },
      err => console.log(err)
    )
  }

  showStudents(){
    this._router.navigate(['students'], {relativeTo: this.r});
  }

  showLeaves(){
    this._router.navigate(['leaves'], {relativeTo: this.r});
  }

  showGeneral(){
    this._router.navigate(['general'], {relativeTo: this.r});
  }

  showSpecial(){
    this._router.navigate(['special'], {relativeTo: this.r});
  }

  hideForm(){
    this.displayFormFlag = false;
    this.displayMainColumn = false;
    this.myForm.reset();
  }
}
