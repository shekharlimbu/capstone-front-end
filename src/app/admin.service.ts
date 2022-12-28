import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _urlCounter = "https://capstone-back-end-gi4v.onrender.com/counter";
  private _urlSendEmail = "https://capstone-back-end-gi4v.onrender.com/send-email";
  private _urlStudents = "https://capstone-back-end-gi4v.onrender.com/students";
  private _urlBlockStudent = "https://capstone-back-end-gi4v.onrender.com/students/block";
  private _urlUnBlockStudent = "https://capstone-back-end-gi4v.onrender.com/students/unblock";
  private _urlResetPassword = "https://capstone-back-end-gi4v.onrender.com/students/reset";
  private _urlGetLeaves = "https://capstone-back-end-gi4v.onrender.com/all-leaves";
  private _urlProcessLeaves = "https://capstone-back-end-gi4v.onrender.com/all-leaves/process";

  constructor(private http: HttpClient) { }

  getCounter(){
    return this.http.get<any>(this._urlCounter);
  }

  sendEmail(emailData: any){
    return this.http.post<any>(this._urlSendEmail, emailData);
  }

  getStudents(){
    return this.http.get<any>(this._urlStudents);
  }

  blockStudent(id: any){
    return this.http.post<any>(this._urlBlockStudent, {"id":id});
  }

  unBlockStudent(id: any){
    return this.http.post<any>(this._urlUnBlockStudent, {"id":id});
  }

  resetPassword(id: any){
    return this.http.post<any>(this._urlResetPassword, {"id":id});
  }

  getLeaves(){
    return this.http.get<any>(this._urlGetLeaves);
  }

  processLeaves(processedLeave: any){
    return this.http.post<any>(this._urlProcessLeaves, processedLeave);
  }
}
