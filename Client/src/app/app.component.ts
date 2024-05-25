import { Component ,ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Client';
  @ViewChild('myDropdown') myDropdown!: BsDropdownDirective;

  toggleDropdown() {
    this.myDropdown.toggle();
  }
}
