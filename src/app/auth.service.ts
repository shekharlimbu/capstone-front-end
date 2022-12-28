import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlRegister = "https://capstone-back-end-gi4v.onrender.com/register";
  private _urlLogin = "https://capstone-back-end-gi4v.onrender.com/login";

  constructor(private http: HttpClient, private _router: Router) { }

  registerStudent(user: any){
    return this.http.post<any>(this._urlRegister, user);
  }

  loginStudent(user: any){
    return this.http.post<any>(this._urlLogin, user);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  hasAccess(){
    // let token = localStorage.getItem('token')||'';
    // let _extractedToken = token.split('.')[1];
    // let _atobdata = atob(_extractedToken);
    // // console.log(typeof(_atobdata));
    // // console.log(_atobdata);
    // let _finalData = JSON.parse(_atobdata);
    // let role = _finalData.subject.split(' ')[1];
    // // console.log(role);
    // return role;
    let role = 'notAdmin';

    let token = localStorage.getItem('token')||'';
    let _extractedToken = token.split('.')[1];
    try{
      let _atobdata = atob(_extractedToken);
      let _finalData = JSON.parse(_atobdata);
      let role = _finalData.subject.split(' ')[1];
      return role;
    }
    catch{

    }
    return role;
    // console.log(typeof(_atobdata));
    // console.log(_atobdata);
    // console.log(role);
  }

  hasAccessStudent(){
    let role = 'notStudent';

    let token = localStorage.getItem('token')||'';
    let _extractedToken = token.split('.')[1];
    try{
      let _atobdata = atob(_extractedToken);
      let _finalData = JSON.parse(_atobdata);
      let role = _finalData.subject.split(' ')[1];
      return role;
    }
    catch{

    }
    return role;
  }
}
