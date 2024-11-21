import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/index';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { ApiPersonItem, PeopleCreate, PeopleEntity } from '../types';
import { GiftDataService } from './gift-data.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const PeopleStore = signalStore(
  withDevtools('people-store'),
  withRequestStatus(),
  withEntities({ collection: '_serverPeople', entity: type<ApiPersonItem>() }),
  withEntities({ collection: '_tempPeople', entity: type<ApiPersonItem>() }),
  withMethods((store) => {
    // injection context
    const service = inject(GiftDataService);
    return {
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            // I only care about the last result. Throw any previous pending results away.
            service
              .getPeople()
              .pipe(
                tap((d) =>
                  patchState(
                    store,
                    setEntities(d, { collection: '_serverPeople' }),
                    setFulfilled(),
                  ),
                ),
              ),
          ),
        ),
      ),
      addPerson: rxMethod<PeopleCreate>(
        pipe(
          map((p) => {
            const tempPerson: ApiPersonItem = {
              id: crypto.randomUUID(),
              name: p.name,
              isLocal: p.location === 'local',
            };

            patchState(
              store,
              addEntity(tempPerson, { collection: '_tempPeople' }),
            );
            return [p, tempPerson.id] as [PeopleCreate, string];
          }),

          mergeMap(([p, tempId]) =>
            service.addPerson(p, tempId).pipe(
              tapResponse({
                next: (r) =>
                  patchState(
                    store,
                    addEntity(r.person, { collection: '_serverPeople' }),
                    removeEntity(r.temporaryId, { collection: '_tempPeople' }),
                  ),
                error: (e: HttpErrorResponse) =>
                  patchState(store, setError(e.statusText)),
                finalize() {},
              }),
            ),
          ),
        ),
      ),
    };
  }),

  withComputed((store) => {
    return {
      entities: computed(() => {
        const serverPeople = store
          ._serverPeopleEntities()
          .map(mapApiToRealEntity);

        const tempPeople = store._tempPeopleEntities().map(mapApiToTempEntity);

        return [...serverPeople, ...tempPeople];
      }),
      totalPeople: computed(() => store._serverPeopleEntities().length),
      hasPeople: computed(() => 1),
      totalLocal: computed(
        () => store._serverPeopleEntities().filter((s) => s.isLocal).length,
      ),

      totalRemote: computed(
        () =>
          store._serverPeopleEntities().filter((s) => s.isLocal === false)
            .length,
      ),
      totalPending: computed(() => store._tempPeopleIds().length),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);

function mapApiPersonToEntity(
  entity: ApiPersonItem,
  isPending: boolean,
): PeopleEntity {
  return {
    id: entity.id,
    name: entity.name,
    location: entity.isLocal ? 'local' : 'remote',
    isPending,
  };
}

function mapApiToTempEntity(entity: ApiPersonItem) {
  return mapApiPersonToEntity(entity, true);
}

function mapApiToRealEntity(entity: ApiPersonItem) {
  return mapApiPersonToEntity(entity, false);
}
