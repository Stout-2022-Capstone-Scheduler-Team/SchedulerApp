import localforage from "localforage";

/*Create a TS Service and interface that can save and retrieve schedule data by a given id or key (up to you, must be unique identifier)

Save data to browser storage, look into localforage npm package or related

include method for getting all local storage schedules

CRUD functionality for local storage with schedules*/

export type Schedule = any;

export class StorageService {
  //getting specific schedule based on key data
  async read(name: string): Promise<Schedule> {
    // The same code, but using ES6 Promises.
    return await localforage.getItem(name);
  }

  //reading the schedule list and seeing if the current schedule is already in the storage
  //if it isnt then add the currently held schedule to the schedule list
  update(name: string, val: Schedule) {
    localforage.setItem(name, val);
  }

  //deleting a specific schedule list and seeing if the specified schedule is even in the storage
  delete(name: string) {
    localforage.removeItem(name);
  }

  async returnAll(): Promise<{ [key: string]: Schedule }> {
    let ret: { [key: string]: Schedule } = {};
    await localforage.iterate((value: Schedule, key: string, _: number) => {
      ret[key] = value;
    });
    return ret;
  }
}
