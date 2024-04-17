import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CiCd-front';

  constructor(private _location: Location) {}

  ageCheck = true;

  innerWidth: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    const isUnderAge = sessionStorage.getItem('isUnderAge');
    if (isUnderAge) {
      this.ageCheck = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  yesClicked() {
    sessionStorage.setItem('isUnderAge', 'false');
    this.ageCheck = false;
  }

  backClicked() {
    this._location.back();
  }

  isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
