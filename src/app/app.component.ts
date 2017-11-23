import { Component } from '@angular/core';
import { HttpTestService } from './httpservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //viewInjector:[HttpTestService]
})
export class AppComponent {
  title = 'app';
}
