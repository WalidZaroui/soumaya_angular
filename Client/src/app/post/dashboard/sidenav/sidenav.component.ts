import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../../../Services/user/user.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  user: User;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.getUserById();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('home');
  }
  getUserById() {
    this.userService.getUserByToken().subscribe(
      (data) => {
        this.user = data.user;
      },
      (error) => {
        console.error('Failed to load user:', error);
        // Handle error, maybe redirect or show a message
      }
    );
  }
}  