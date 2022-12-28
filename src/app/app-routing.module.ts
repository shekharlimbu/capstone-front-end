import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { PageNotFoundPanelComponent } from './page-not-found-panel/page-not-found-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { StudentsComponent } from './students/students.component';
import { LeavesComponent } from './leaves/leaves.component';
import { GeneralComponent } from './general/general.component';
import { SpecialComponent } from './special/special.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { ProfileComponent } from './profile/profile.component';
import { LeavesStudentComponent } from './leaves-student/leaves-student.component';
import { RoleStudentGuard } from './role-student.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomePanelComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePanelComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'leaves',
        component: LeavesComponent
      },
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'special',
        component: SpecialComponent
      }
    ],
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'student',
    component: StudentPanelComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'leaves-student',
        component: LeavesStudentComponent
      }
    ],
    canActivate: [AuthGuard, RoleStudentGuard]
  },
  {
    path: '**',
    component: PageNotFoundPanelComponent
  }
];

@NgModule({
  //changed below so page gets refreshed with empty form
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
