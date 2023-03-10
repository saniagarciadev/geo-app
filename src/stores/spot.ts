import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

const exampleSpot = {
  title: 'placeholder2',
  coordinate: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
};

export class SpotStore implements IStore {
  value = exampleSpot;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: SpotStore.name,
      properties: ['value'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<SpotStore>>(what: T, value: SpotStore[T]) {
    (this as SpotStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<SpotStore>>(obj: Record<T, SpotStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as SpotStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
