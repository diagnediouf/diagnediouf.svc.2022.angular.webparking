import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(dataForm: any){
    this.authService.login(dataForm.username,dataForm.password);
    if(this.authService.isAuthenticated){
      this.authService.saveAuthenticatedUser();
      this.router.navigateByUrl('');
    }
  }

}
