import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { UserService } from '../services';
@Component({
	selector:'layout-header',
	templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(private userService: UserService,private router: Router,) {
  }
  currentUser: User;
  user: User = new User();

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
}
