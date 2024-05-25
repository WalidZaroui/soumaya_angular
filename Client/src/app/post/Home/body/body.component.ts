import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FooterComponent,NavBarComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
