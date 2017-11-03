/**
 * Created by Vasuki on 10/31/2017.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { NgoComponent } from './ngo.component';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'ngo',
    component: NgoComponent
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [
    NgoComponent
  ]
})
export class NgoModule {}
