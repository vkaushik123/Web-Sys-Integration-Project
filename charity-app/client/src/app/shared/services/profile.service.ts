/**
 * Created by Vasuki on 11/5/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ApiService} from './api.service';
import {Profile} from '../models';

@Injectable()
export class ProfileService {
  constructor(
    private apiService:ApiService
  ){}

  get(username: string): Observable<Profile> {
      return this.apiService.get('/profile/'+ username)
        .map((data:{profile: Profile}) => data.profile);
  }
}
