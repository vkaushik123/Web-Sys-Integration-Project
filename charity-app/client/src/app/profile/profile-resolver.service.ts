/**
 * Created by Vasuki on 11/29/2017.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Profile, ProfileService } from '../shared';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profilesService: ProfileService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.profilesService.get(route.params['username'])
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
