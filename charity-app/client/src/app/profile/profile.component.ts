/**
 * Created by Vasuki on 11/5/2017.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService, Profile } from '../shared';

@Component({
  selector: 'profile-page',
  templateUrl:'./profile.component.html'
})

export class ProfileComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
    private userService: UserService
  ){}

  openCheckout(){
      var handler = (<any>window).StripeCheckout.configure({
        key:'pk_test_G1ger4QImeCjypjO0SAvTsU1',
        locale:'auto',
        token: function(token:any){

        }
      });

      handler.open({
        name:'Demo Site',
        description: '2 widgets',
        amount : 2000
      });
  }

  profile: Profile;
  currentUser:User;
  isUser: boolean;

  ngOnInit(){
    this.route.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
      }
    );

    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.isUser = (this.currentUser.username === this.profile.username);
      }
    );
  }
}
