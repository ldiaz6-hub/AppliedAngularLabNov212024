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
import { setFulfilled, setPending, withRequestStatus } from '@shared/index';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { PeopleCreate, PeopleEntity } from '../types';
import { GiftDataService, PersonItem } from './gift-data.service';

export const PeopleStore = signalStore(
  withDevtools('people-store'),
  withRequestStatus(),
  withEntities({ collection: '_serverPeople', entity: type<PersonItem>() }),
  withEntities({ collection: '_tempPeople', entity: type<PersonItem>() }),
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
            const tempPerson: PersonItem = {
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
              tap((result) =>
                patchState(
                  store,
                  addEntity(result.person, { collection: '_serverPeople' }),
                  removeEntity(result.temporaryId, {
                    collection: '_tempPeople',
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    };
  }),

  withComputed((store) => {
    return {
      entities: computed(() => {
        const serverPeople = store._serverPeopleEntities().map(
          (p) =>
            ({
              id: p.id,
              name: p.name,
              location: p.isLocal ? 'local' : 'remote',
              isPending: false,
            }) as PeopleEntity,
        );

        const tempPeople = store._tempPeopleEntities().map(
          (p) =>
            ({
              id: p.id,
              name: p.name,
              location: p.isLocal ? 'local' : 'remote',
              isPending: true,
            }) as PeopleEntity,
        );

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

// function mapApiPersontoEntity()
