import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public myProfile: any = {};
  public displayFormFlag = false;

  myForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  constructor(private _studentService: StudentService, private _router: Router){}

  ngOnInit(){
    this.displayFormFlag = false;
    this._studentService.getProfileDetails()
    .subscribe(
      res => {
        this.myProfile = res;
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

  updateProfile(){
    console.log(this.myForm.value);
    console.log(this.myProfile);
    this._studentService.editProfileDetails({ "id": this.myProfile.id, "email": this.myForm.value.email})
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/student/profile']);
      },
      err => console.log(err)
    )
  }
}
