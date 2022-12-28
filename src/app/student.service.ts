import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _urlProfile = "https://capstone-back-end-gi4v.onrender.com/profile";
  private _urlEditProfile = "https://capstone-back-end-gi4v.onrender.com/profile/edit";
  private _urlGetLeaves = "https://capstone-back-end-gi4v.onrender.com/my-leaves";
  private _urlApplyLeave = "https://capstone-back-end-gi4v.onrender.com/my-leaves/add";
  private _urlChangePass = "https://capstone-back-end-gi4v.onrender.com/profile/changepass";

  
  private _id: String = '';

  constructor(private http: HttpClient) { }

  getProfileDetails(){
    let token = localStorage.getItem('token')||'';
    let _extractedToken = token.split('.')[1];
    try{
      let _atobdata = atob(_extractedToken);
      let _finalData = JSON.parse(_atobdata);
      this._id = _finalData.subject.split(' ')[0];
    }
    catch{

    }
    return this.http.post<any>(this._urlProfile, { "_id": this._id});
  }

  editProfileDetails(user: any){
    return this.http.post<any>(this._urlEditProfile, user);
  }

  getLeaves(user: any){
    return this.http.post<any>(this._urlGetLeaves, user);
  }

  applyLeave(leaveData: any){
    return this.http.post<any>(this._urlApplyLeave, leaveData);
  }
  
  changePass(newPassData: any){
    return this.http.post<any>(this._urlChangePass, newPassData);
  }
}
