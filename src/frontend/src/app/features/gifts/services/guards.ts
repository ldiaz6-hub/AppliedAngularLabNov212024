import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PeopleStore } from './people.store';

export const PeopleLoadedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  //return inject(PeopleStore).entities().length > 0 // bad
  return true;
};
