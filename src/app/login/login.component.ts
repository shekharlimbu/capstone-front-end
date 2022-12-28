import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private _authService: AuthService, private _router: Router){}

  public errorMsg = '';
  public displayErrorFlag = false;

  myForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',Validators.required)
  });

  ngOnInit(){
    this.displayErrorFlag = false;
  }

  login(){
    console.log(this.myForm.value);
    this._authService.loginStudent(this.myForm.value)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/notifications']);
      },
      err => {
        console.log(err);
        this.errorMsg = err.error;
        this.displayErrorFlag = true;
      }
    )
  }
}
