import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from "../shared";

@Component({
	selector: 'auth-page',
	templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
	authType: String = '';
	title: String = '';
	errors: Errors = new Errors();
	isSubmitting: boolean= false;
	authForm: FormGroup;

	constructor(
      private route:ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder
	){
	 this.authForm=this.fb.group({
	   'email':[''],
	   'password':['']
	 });
	}

	ngOnInit(){
	  this.route.url.subscribe(data => {
         this.authType = data[data.length-1].path;
         this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
         if(this.authType === 'register'){
            this.authForm.addControl('username', new FormControl(''));
         }
	  });
	}

	submitForm(){
	   this.isSubmitting = true;
	   this.errors = new Errors();
	   let credentials = this.authForm.value;

	   this.userService.attemptAuth(this.authType, credentials)
       .subscribe(
         data => this.router.navigateByUrl('home'),
         err => {
           this.errors =err;
           this.isSubmitting = false;
         }
       );
	}
}