import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Router } from "@angular/router"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router){}
  getClick() { this.router.navigate(["add"]);}
  getHome() { this.router.navigate(["home"]);}
}
