import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleStudentGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){}

  canActivate(): boolean{
    if(this._authService.hasAccess() == 'student'){
      return true;
    }else{
      this._router.navigate(['/notifications']);
      return false;
    }
  }
}
