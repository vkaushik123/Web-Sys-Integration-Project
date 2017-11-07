/**
 * Created by Vasuki on 11/5/2017.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent
  }
]);

@NgModule({
  imports: [
    profileRouting,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],

  providers: [
  ]
})
export class ProfileModule {}
