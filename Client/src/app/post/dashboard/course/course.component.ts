import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../Services/user/user.service';
import {User} from '../../../Models/user';
import {MatDialog} from '@angular/material/dialog';
import {AddLessonComponent} from '../add-lesson/add-lesson.component';
import {Lesson} from '../../../Models/lesson';
import {LessonService} from '../../../Services/lesson/lesson.service';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../Services/course/course.service';
import {Course} from '../../../Models/course';
import {QcmService} from '../../../Services/qcm/qcm.service';
import {Qcm} from '../../../Models/qcm';
import {Video} from '../../../Models/video';
import {VideoService} from '../../../Services/video/video.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
// Import Angular Material components
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
class Exercise {
  lesson: Lesson;
  QCM: Qcm;
  video: Video;
  type!: string;
  test: Array<Test>;
  bad: Array<Test>;
  constructor() {
    this.lesson = new Lesson();
    this.QCM = new Qcm();
    this.video = new Video();
    this.test = new Array<Test>();
    this.bad = new Array<Test>();
  }
}
class Test {
  name!: string;
  answer: boolean;
  constructor() {
    this.answer = false;
  }
}
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,MatButtonModule,MatExpansionModule,MatCheckboxModule,MatDialogModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Array<Lesson>;
  path = 'http://localhost:8080/files/';
  exercise: Array<Exercise>;
  userId!: string;
  constructor(private userService: UserService, public dialog: MatDialog, private lessonService: LessonService,
              private route: ActivatedRoute, private courseService: CourseService, private qcmService: QcmService,
              private videoService: VideoService, private snackBar: MatSnackBar) {
    this.lessons = new Array<Lesson>();
    this.course = new Course();
    this.exercise = new Array<Exercise>();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.course._id= params.get('id')?? 'defaultId';;
      console.log(this.course._id);
    });
    this.userId = localStorage.getItem('userId')?? 'defaultId';;
    this.courseService.findById(this.course._id).subscribe(res => {
      this.course = res.course;
      this.course.image = this.path + this.course.image;
    });
    this.userService.getUserByToken().subscribe(res => console.log(res));
    this.lessonService.findByCourseId(this.course._id).subscribe(res => {
      this.lessons = res.lessons;
      this.lessons.forEach(data => {
        const ex = new Exercise();
        ex.lesson = data;
        this.qcmService.findByLessonId(data._id).subscribe(qcm => {
            if (qcm.qcm.length > 0) {
              ex.QCM = qcm.qcm[0];
              ex.type = 'qcm';
              ex.QCM.right.forEach(x => ex.test.push({name: x, answer: false}));
              ex.QCM.wrong.forEach(x => ex.bad.push({name: x, answer: false}));
              this.exercise.push(ex);
            }
        });
        this.videoService.findByLessonId(data._id).subscribe(video => {
          console.log(video.video);
          if (video.video.length > 0) {
            ex.video = video.video[0];
            ex.video.url = 'http://localhost:8080/files/' + video.video[0].url;
            ex.type = 'vid';
            this.exercise.push(ex);
            console.log('me');
          }
        });
      });
      console.log('me');
      console.log(this.exercise);
    });
    // this.qcmService.findByAll().subscribe(res => console.log(res));
  }
  deleteLesson(id:any, n:any) {
    this.lessonService.delete(id).subscribe(a => {
      this.exercise.splice(n, 1);
    });
  }
  openDialog() {
    this.dialog.open(AddLessonComponent, {
      width: '800px',
      data: {
        idCourse: /*this.idCourse*/ this.course._id
      }
    });
    this.dialog.afterAllClosed.subscribe(x => {
      this.lessonService.findByCourseId(this.course._id).subscribe(res => {
        this.exercise = new  Array<Exercise>();
        this.lessons = res.lessons;
        this.lessons.forEach(data => {
          const ex = new Exercise();
          ex.lesson = data;
          this.qcmService.findByLessonId(data._id).subscribe(qcm => {
            if (qcm.qcm.length > 0) {
              ex.QCM = qcm.qcm[0];
              ex.type = 'qcm';
              this.exercise.push(ex);
            }
          });
          this.videoService.findByLessonId(data._id).subscribe(video => {
            console.log(video.video);
            if (video.video.length > 0) {
              ex.video = video.video[0];
              ex.video.url = 'http://localhost:8080/files/' + video.video[0].url;
              ex.type = 'vid';
              this.exercise.push(ex);
              console.log('me');
            }
          });
        });
        console.log('me');
        console.log(this.exercise);
      });
    });
  }
  testAnswer(ex: Exercise) {
    let a = true;
    ex.test.forEach(x => {
      if (x.answer === false) {
        a = false;
      }
    });
    ex.bad.forEach(x => {
      if (x.answer === true) {
        a = false;
      }
    });
    if (a === true) {
      this.snackBar.open('Good Job Let\'s move to the next lesson', 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      this.snackBar.open('Bad answer, Try again', 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
    console.log(ex);
  }
}
