import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _urlHome = "https://capstone-back-end-gi4v.onrender.com/home";
  private _urlNotifications = "https://capstone-back-end-gi4v.onrender.com/notifications";
  private _urlHomeDelete = "https://capstone-back-end-gi4v.onrender.com/home/delete";
  private _urlNotificationDelete = "https://capstone-back-end-gi4v.onrender.com/notifications/delete";
  private _urlHomeAdd = "https://capstone-back-end-gi4v.onrender.com/home/add";
  private _urlNotificationAdd = "https://capstone-back-end-gi4v.onrender.com/notifications/add";

  constructor(private http: HttpClient) { }

  getHome(){
    return this.http.get<any>(this._urlHome);
  }

  getNotifications(){
    return this.http.get<any>(this._urlNotifications);
  }

  deleteGeneralNotification(name: any){
    return this.http.post<any>(this._urlHomeDelete, {"name":name});
  }

  deleteSpecialNotification(name: any){
    return this.http.post<any>(this._urlNotificationDelete, {"name":name});
  }

  addGeneralNotification(generalNotification: any){
    return this.http.post<any>(this._urlHomeAdd, generalNotification);
  }

  addSpecialNotification(specialNotification: any){
    return this.http.post<any>(this._urlNotificationAdd, specialNotification);
  }
}
