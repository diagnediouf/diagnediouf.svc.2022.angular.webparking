import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']},
    {username:'diagnediouf',password:'1224',roles:['ADMIN','USER']}
  ];

  isAuthenticated:boolean;
  userAuthenticated;
  public token:string;

  constructor() { }

  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
        this.token = btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if(user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
    }else{
      this.isAuthenticated=false;
      this.userAuthenticated=undefined;
    }
  }

  public isAdmin(){
    if(this.userAuthenticated){
      if(this.userAuthenticated.roles.indexOf('ADMIN')>-1)
      return true;
    }
      return false;
  }

  public saveAuthenticatedUser(){
    if(this.userAuthenticated){
      localStorage.setItem('authToken',this.token);
    }
  }

  public loadAuthenticatedUserFromLocalStorage(){
    let t=localStorage.getItem('authToken');
    if(t){
      let user=JSON.parse(atob(t));
      console.log(user);
      this.userAuthenticated={username:user.username,roles:user.roles};
      console.log(this.userAuthenticated);
      this.isAuthenticated=true;
      this.token=t;
    }   
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
  }  
}
