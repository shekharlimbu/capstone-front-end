import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public errorMsg = '';
  public displayErrorFlag = false;

  constructor(private _authService: AuthService, private _router: Router){}

  myForm = new FormGroup({
    id: new FormControl('',Validators.required),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',Validators.required)
  });

  ngOnInit(){
    this.displayErrorFlag = false;
  }

  register(){
    console.log(this.myForm.value);
    this._authService.registerStudent(this.myForm.value)
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
