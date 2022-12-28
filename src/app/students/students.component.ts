import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  constructor(private _adminService: AdminService, private _router: Router){}

  public students: any = [];
  public resetFor = '';
  public resetFlag = false;

  ngOnInit(){
    this._adminService.getStudents()
    .subscribe(
      res => this.students = res,
      err => console.log(err)
    )
  }

  block(id: any){
    console.log(id);
    this._adminService.blockStudent(id)
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/students']);
      },
      err => console.log(err)
    )
  }

  unblock(id: any){
    console.log(id);
    this._adminService.unBlockStudent(id)
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/students']);
        //this._router.navigate(['students'], {relativeTo: this.r});
      },
      err => console.log(err)
    )
  }

  resetPassword(id: any){
    console.log(id);
    this.resetFor = id;
    this.resetFlag = true;
    this._adminService.resetPassword(id)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }
}
