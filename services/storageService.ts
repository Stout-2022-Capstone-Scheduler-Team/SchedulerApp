import localforage from "localforage";
import { Schedule } from "../entities/schedule";
import StorageService from "../interfaces/storageService";

export class LocalStorage implements StorageService {
  // getting specific schedule based on key data
  async read(name: string): Promise<Schedule | null> {
    // The same code, but using ES6 Promises.
    return await localforage.getItem(name);
  }

  // reading the schedule list and seeing if the current schedule is already in the storage
  // if it isnt then add the currently held schedule to the schedule list
  async update(name: string, val: Schedule): Promise<void> {
    await localforage.setItem(name, val);
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
    });
    return ret;
  }
}
