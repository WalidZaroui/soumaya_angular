import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../../Services/course/course.service';
import {Course} from '../../../Models/course';
import {Category} from '../../../Models/category';
import {UserService} from '../../../Services/user/user.service';
import {User} from '../../../Models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  user: User;
  courses: Array<Course>;
  myCourses: Array<Course>;
  constructor(private courseService: CourseService, private userService: UserService) {
    this.user = new User();
    this.myCourses = new Array<Course>();
    this.courses = new Array<Course>();
  }

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses() {
    this.userService.getUserByToken().subscribe(x => {
      this.user = x.user;
      console.log(this.user);
      this.myCourses = this.user.courses.enrolled;
      this.courseService.findAll().subscribe(a => {
        a.courses.forEach((res:any) => {
          if (this.myCourses.find(course => course._id === res._id) && res.publisher !== this.user._id) {
            this.courses.push(res);
            console.log(res);
          }
        });
      });
    });
  }
  // deleteCourse(id) {
  //   this.courseService.delete(id).subscribe(res => {
  //     this.getTrainerCourses();
  //     console.log(res);
  //   });
  // }
}