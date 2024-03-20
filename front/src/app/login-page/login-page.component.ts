import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/modules/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavBarComponent, FormsModule, SocialLoginModule, GoogleSigninButtonModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      localStorage.setItem('authorization', params['id']);
      this.router.navigate([''])
   });
  }
}
