import { Routes } from '@angular/router';

import { BodyComponent } from './post/Home/body/body.component';
import { SignInComponent } from './post/sign/sign-in/sign-in.component';
import { AuthenticateComponent } from './post/sign/authenticate/authenticate.component';
import {SidenavComponent} from './post/dashboard/sidenav/sidenav.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {MyCoursesComponent} from './post/dashboard/my-courses/my-courses.component';
import {CourseComponent} from './post/dashboard/course/course.component';
import {AddCourseComponent} from './post/dashboard/add-course/add-course.component';
import {LastCoursesComponent} from './post/dashboard/last-courses/last-courses.component';
import {CatalogComponent} from './post/dashboard/catalog/catalog.component';
import {ModifyCourseComponent} from './post/dashboard/modify-course/modify-course.component';
import {UplodedCoursesComponent} from './post/dashboard/uploded-courses/uploded-courses.component';


export const routes: Routes = [

  { path: 'home', redirectTo: 'home/index', pathMatch: 'full' },
  { path: 'sign', redirectTo: 'home/sign', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'home/auth', pathMatch: 'full' },

  { path: 'home/index', component: BodyComponent },

  { path: 'home/auth', component: AuthenticateComponent },

  { path: 'home/sign', component: SignInComponent },
  
    {
      path: 'main',
      component: SidenavComponent,
      canActivate: [AuthorizationGuard],
      children: [
        {
          path: '',
          component: LastCoursesComponent
        },
        {
          path: 'myCourses',
          component: MyCoursesComponent,
        },
        {
          path: 'course/:id',
          component: CourseComponent
        },
        {
          path: 'addCourse',
          component: AddCourseComponent
        },
        {
          path: 'catalog',
          component: CatalogComponent
        },
        {
          path: 'modify/:id',
          component: ModifyCourseComponent
        },
        {
          path: 'uploaded',
          component: UplodedCoursesComponent
        }
      ]
    }
  ];
