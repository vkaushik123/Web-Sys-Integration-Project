import { ModuleWithProviders,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { AuthComponent } from './auth.component';
import { NoAuthGaurd } from './no_auth.service';
const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
     path:'login',
     component:AuthComponent,
     canActivate:[NoAuthGaurd]
  },
  {
     path:'register',
     component:AuthComponent,
     canActivate:[NoAuthGaurd]
  },
  {
    path:'ngoregister',
    component:AuthComponent,
    canActivate:[NoAuthGaurd]
  }
]);

@NgModule({
	imports:[
      authRouting,
      SharedModule
	],
	declarations:[
      AuthComponent
	],

	providers:[
	  NoAuthGaurd
  ]
})

export class AuthModule {}
