import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService} from "./api.service";
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();


  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  populate(){
    if(this.jwtService.getToken()){
      this.apiService.get('/users')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      this.purgeAuth();
    }
  }
  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(){
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  update(user): Observable<User> {
    return this.apiService.put('/user',{ user })
      .map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

  attemptAuth(type, credentials): Observable<User> {
    let route = (type === 'login') ? '/login' : '';
    console.log(credentials);
    return this.apiService.post('/users' + route, {user: credentials})
      .map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
