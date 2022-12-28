import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-leaves-student',
  templateUrl: './leaves-student.component.html',
  styleUrls: ['./leaves-student.component.css']
})
export class LeavesStudentComponent implements OnInit{

  public myLeaves: any = [];
  public myProfile: any = {};
  public displayFormFlag = false;

  myForm = new FormGroup({
    from: new FormControl('',Validators.required),
    to: new FormControl('',Validators.required)
  });
  
  constructor(private _studentService: StudentService, private _router: Router){}

  ngOnInit(){
    this.displayFormFlag = false;
    this._studentService.getProfileDetails()
    .subscribe(
      res => {
        this.myProfile = res;
        this._studentService.getLeaves({"id": this.myProfile.id})
          .subscribe(
            res => {this.myLeaves = res, console.log(this.myLeaves)},
            err => console.log(err)
          )
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

  applyLeave(){
    console.log(this.myForm.value);
    let leaveData = {
      "registrationID": this.myProfile.id,
      "email": this.myProfile.email,
      "from": this.myForm.value.from,
      "to": this.myForm.value.to
    }

    this._studentService.applyLeave(leaveData)
      .subscribe(
        res => {
          console.log(res);
          this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
          this._router.navigate(['/student/leaves-student']);
        },
        err => console.log(err)
      )
  }
}
