import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeopleCreate, ApiPersonItem, ApiResult } from '../types';

@Injectable()
export class GiftDataService {
  #http = inject(HttpClient);

  addPerson(
    person: PeopleCreate,
    temporaryId: string,
  ): Observable<{ person: ApiPersonItem; temporaryId: string }> {
    return this.#http.post<ApiPersonItem>('/api/user/people', person).pipe(
      map((r) => {
        return {
          person: r,
          temporaryId,
        };
      }),
    );
  }
  getPeople(): Observable<ApiPersonItem[]> {
    return this.#http.get<ApiResult>('/api/user/gifts').pipe(
      map((r) => r.people), // ApiResult -> {id: string, name: string, isLocal: boolean}[]
    );
  }
}
