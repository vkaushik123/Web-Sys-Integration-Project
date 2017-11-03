import { ModuleWithProviders,NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import {
  ApiService,
  UserService,
  AuthGuard,
	SharedModule,
  JwtService,
	FooterComponent,
	HeaderComponent
} from './shared';
import {NgoModule} from "./ngo/ngo.module";
import {NgoService} from "./shared/services/ngo.service";


const rootRouting: ModuleWithProviders = RouterModule.forRoot([],{ useHash:true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    HomeModule,
    rootRouting,
    SettingsModule,
    NgoModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthGuard,
    JwtService,
    UserService,
    NgoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
