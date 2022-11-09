import localforage from "localforage";

/* Create a TS Service and interface that can save and retrieve schedule data by a given id or key (up to you, must be unique identifier)

Save data to browser storage, look into localforage npm package or related

include method for getting all local storage schedules

CRUD functionality for local storage with schedules */

export type Schedule = any;

export class StorageService {
  static returnAll: any;
  static update: any;
  // getting specific schedule based on key data
  async read(name: string): Promise<Schedule> {
    // The same code, but using ES6 Promises.
    await localforage.getItem(name);
  }

  // reading the schedule list and seeing if the current schedule is already in the storage
  // if it isnt then add the currently held schedule to the schedule list
  async update(name: string, val: Schedule): Promise<void> {
    await localforage.setItem(name, val);
    console.log("string getsHere");
  }

  // deleting a specific schedule list and seeing if the specified schedule is even in the storage
  async delete(name: string): Promise<void> {
    await localforage.removeItem(name);
  }

  // getting all of the schedules from the storage and returning them
  async returnAll(): Promise<{ [key: string]: Schedule }> {
    const ret: { [key: string]: Schedule } = {};
    await localforage.iterate((value: Schedule, key: string, _: number) => {
      ret[key] = value;
      console.log("string getsHere");
    });
    return ret;
  }
}
