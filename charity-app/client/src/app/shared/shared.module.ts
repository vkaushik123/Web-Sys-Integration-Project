import { CommonModule } from '@angular/common';
import { ModuleWithProviders,NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from "./list-errors.component";
import { HeaderComponent } from "./layout/header.component";

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '/auth/facebook',
    component: HeaderComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ListErrorsComponent,
    RouterModule
  ]
})
export class SharedModule {}
