import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FooterComponent} from '../../Home/footer/footer.component';
import {NavBarComponent} from '../../Home/nav-bar/nav-bar.component';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,FooterComponent,NavBarComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user: User;
  trainer: boolean = false; // Default value if not trainer

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}

  createUser() {
    this.user.role = this.trainer ? 'trainer' : 'student';

    // Ensure phoneNumber is valid before sending the request
    if (!/^\d+$/.test(this.user.phoneNumber)) {
      console.error('Invalid phone number format');
      return;
    }

    this.userService.createUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        this.router.navigateByUrl('home');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
