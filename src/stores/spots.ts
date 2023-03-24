import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

const exampleSpot = {
  title: 'My spot',
  latitude: 48.868505,
  longitude: 2.352202,
  description: 'Description',
  source: 'local-storage',
};

export class SpotsStore implements IStore {
  saved = [exampleSpot];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: SpotsStore.name,
      properties: ['saved'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<SpotsStore>>(what: T, saved: SpotsStore[T]) {
    (this as SpotsStore)[what] = saved;
  }
  setMany<T extends StoreKeysOf<SpotsStore>>(obj: Record<T, SpotsStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as SpotsStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
