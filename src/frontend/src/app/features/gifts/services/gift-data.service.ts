import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeopleCreate, PeopleEntity } from '../types';

export type ApiResult = {
  people: PersonItem[];
};
export type PersonItem = {
  id: string;
  name: string;
  isLocal: boolean;
};

@Injectable()
export class GiftDataService {
  #http = inject(HttpClient);

  addPerson(
    person: PeopleCreate,
    temporaryId: string,
  ): Observable<{ person: PersonItem; temporaryId: string }> {
    return this.#http.post<PersonItem>('/api/user/people', person).pipe(
      map((r) => {
        return {
          person: r,
          temporaryId,
        };
      }),
    );
  }
  getPeople(): Observable<PersonItem[]> {
    return this.#http.get<ApiResult>('/api/user/gifts').pipe(
      map((r) => r.people), // ApiResult -> {id: string, name: string, isLocal: boolean}[]
    );
  }
}
