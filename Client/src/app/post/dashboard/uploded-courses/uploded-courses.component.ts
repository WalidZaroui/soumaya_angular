import { Component, OnInit } from '@angular/core';
import {Course} from '../../../Models/course';
import {CourseService} from '../../../Services/course/course.service';
import {UploadService} from '../../../Services/upload/upload.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-uploded-courses',
  standalone: true,
  imports: [CommonModule,RouterModule,MatButtonModule,MatIconModule],
  templateUrl: './uploded-courses.component.html',
  styleUrl: './uploded-courses.component.css'
})
export class UplodedCoursesComponent implements OnInit {
  courses: Array<Course>;
  constructor(private courseService: CourseService, private uploadService: UploadService) {
    this.courses = new Array<Course>();
  }

  ngOnInit(): void {
    this.getTrainerClient();
  }
  getTrainerClient() {
    this.courseService.getTrainerCourses().subscribe(x => {
      this.courses = x.courses;
    });
  }
  deleteCourse(id:any) {
    this.courseService.delete(id).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
  }
}