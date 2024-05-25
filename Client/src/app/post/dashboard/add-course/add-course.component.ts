import { Component, OnInit } from '@angular/core';
import {Course} from '../../../Models/course';
import {CourseService} from '../../../Services/course/course.service';
import {Category} from '../../../Models/category';
import {CategoryService} from '../../../Services/category/category.service';
import {UploadService} from '../../../Services/upload/upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,MatInputModule,MatButtonModule,MatSelectModule,MatIconModule,MatFormFieldModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {
  uploadedFiles:any;
  imagePath: string | undefined;

  course: Course;
  categories: Array<Category>;
  constructor(private courseService: CourseService, private categoryService: CategoryService, private uploadService: UploadService,
              private snackBar: MatSnackBar) {
    this.course = new Course();
    this.categories = new Array<Category>();
  }
  ngOnInit(): void {
    this.getCategories();
  }
  addCourse() {
    this.courseService.save(this.course).subscribe( res => {
      this.snackBar.open('Course added successfully, Add another course if you want', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.course = new Course();
      this.imagePath = undefined;
    });
  }
  getCategories() {
    this.categoryService.findAll().subscribe(res => {
      this.categories = res.categories;
    });
  }
  fileChange($event: Event) {
    // @ts-ignore
    this.uploadedFiles = $event.target.files;
    console.log(this.uploadedFiles);
    this.upload();
  }
  upload() {
    const formData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('uploads[]', this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.uploadService.upload(formData).subscribe((response) => {
      // console.log('response received is ', response);
      // @ts-ignore
      // this.employee.image = response.name;
      const img = document.getElementById('img') as HTMLImageElement;
      // @ts-ignore
      this.course.image = response.name;
      this.imagePath = 'http://localhost:8080/files/' + this.course.image;
      console.log(this.course);
    });
  }
}
