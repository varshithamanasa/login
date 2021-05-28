import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  }
  isLoading: boolean = false;
  invalidLogin: boolean = false
  userValid: any = {}
  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  async checkLogin() {
    this.isLoading = true;
    this.userValid = await this.userService.getUserByEmail(this.user.email);
    // console.log(await this.userService.getUserByEmail(this.user.email))
    if (!this.userValid) {
      this.invalidLogin = true;
    }
    else {
      if (this.authService.authenticate(this.user.password, this.userValid.password, this.userValid.emailId)) {


        sessionStorage.setItem('role', this.userValid.role.roleName)
        this.router.navigate(['/app-myprofile'])
        this.invalidLogin = false
      } else
        this.invalidLogin = true
    }
    this.isLoading = false;
  }
}
