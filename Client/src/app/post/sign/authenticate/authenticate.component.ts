import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router ,RouterModule} from '@angular/router';
import { AuthenticateService } from '../../../Services/Authenticate/authenticate.service';
import { Login } from '../../../Models/login';
import {FooterComponent} from '../../Home/footer/footer.component';
import {NavBarComponent} from '../../Home/nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule,RouterModule,FooterComponent,NavBarComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router, private authenticateService: AuthenticateService,) {
    this.loginObj = new Login();
  }

  authenticate() {
    this.authenticateService.authenticate(this.loginObj).subscribe(data => {
      // @ts-ignore
      if (!data.error) {
        console.log(data);
        // @ts-ignore
        localStorage.setItem('token', data.token);
        // @ts-ignore
        localStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('main');
       
      } else {
        console.log(data);
      }
    });
  }
}


