import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit{

  public myProfile: any = {};
  public displayFormFlag = false;
  public displayMessageFlag = false;
  myForm = new FormGroup({
    password: new FormControl('',Validators.required)
  });

  constructor(private _studentService: StudentService, private _router: Router, private r:ActivatedRoute){}

  ngOnInit() {
    this.displayFormFlag = false;
    this.displayMessageFlag = false;
    this._studentService.getProfileDetails()
    .subscribe(
      res => {
        this.myProfile = res;
      },
      err => console.log(err)
    )
  }

  showProfile(){
    this._router.navigate(['profile'], {relativeTo: this.r});
  }

  showLeaves(){
    this._router.navigate(['leaves-student'], {relativeTo: this.r});
  }

  displayForm(){
    this.displayMessageFlag = false;
    this.displayFormFlag = true;
  }

  hideForm(){
    this.displayFormFlag = false;
    this.myForm.reset();
  }

  changePassword(){
    this.displayMessageFlag = true;
    this.displayFormFlag = false;
    this._studentService.changePass({"id":this.myProfile.id, "newPassword": this.myForm.value.password})
      .subscribe(
        res => {
          console.log(res);
          // this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
          // this._router.navigate(['/student']);
          this.myForm.reset();
        },
        err => console.log(err)
      )
  }
}

