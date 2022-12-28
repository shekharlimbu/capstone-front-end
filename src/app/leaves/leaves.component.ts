import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit{

  public leaves: any = [];
  constructor(private _adminService: AdminService, private _router: Router){}

  ngOnInit(){
    this._adminService.getLeaves()
    .subscribe(
      res => this.leaves = res,
      err => console.log(err)
    )
  }

  approveLeave(id: any){
    console.log(id);
    this._adminService.processLeaves({"_id":id, "status":"approved"})
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/leaves']);
      },
      err => console.log(err)
    )
  }

  rejectLeave(id: any){
    console.log(id);
    this._adminService.processLeaves({"_id":id, "status":"rejected"})
    .subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
        this._router.navigate(['/admin/leaves']);
      },
      err => console.log(err)
    )
  }
}
