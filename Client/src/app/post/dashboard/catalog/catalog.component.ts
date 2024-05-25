import { Component, OnInit } from '@angular/core';
import {Course} from '../../../Models/course';
import {CourseService} from '../../../Services/course/course.service';
import {UserService} from '../../../Services/user/user.service';
import {User} from '../../../Models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  courses: Array<Course>;
  myCourses: Array<Course>;
  userCourses!: Array<Course>;
  user: User;
  constructor(private courseService: CourseService, private userService: UserService) {
    this.courses = new Array<Course>();
    this.myCourses = new Array<Course>();
    this.user = new User();
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userId'));
    this.userService.getUserByToken().subscribe(res => {
      this.user = res.user;
      console.log(res.user);
      this.courseService.findAll().subscribe(result => {
        this.myCourses = result.courses;
        this.myCourses.forEach(x => {
          if (!this.user.courses.enrolled.find(c => c._id === x._id) && x.publisher !== this.user._id) {
            this.courses.push(x);
          }
        });
      });
    });
  }
  enrollCourse(id:any) {
    this.courseService.buyCourse(id).subscribe(x => console.log(x));
  }
}