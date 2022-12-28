import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { PageNotFoundPanelComponent } from './page-not-found-panel/page-not-found-panel.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentsComponent } from './students/students.component';
import { LeavesComponent } from './leaves/leaves.component';
import { GeneralComponent } from './general/general.component';
import { SpecialComponent } from './special/special.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { ProfileComponent } from './profile/profile.component';
import { LeavesStudentComponent } from './leaves-student/leaves-student.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    HomePanelComponent,
    PageNotFoundPanelComponent,
    NotificationsComponent,
    LoginComponent,
    RegisterComponent,
    StudentsComponent,
    LeavesComponent,
    GeneralComponent,
    SpecialComponent,
    StudentPanelComponent,
    ProfileComponent,
    LeavesStudentComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AuthService, NotificationService, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
