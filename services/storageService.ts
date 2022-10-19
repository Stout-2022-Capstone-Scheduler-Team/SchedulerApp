import localforage from "localforage";

/*Create a TS Service and interface that can save and retrieve schedule data by a given id or key (up to you, must be unique identifier)

Save data to browser storage, look into localforage npm package or related

include method for getting all local storage schedules

CRUD functionality for local storage with schedules*/

export class StorageService {
  //getting specific schedule based on key data
  read(schedule: { name: string }) {
    // The same code, but using ES6 Promises.
    localforage
      .iterate(function (value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.
        console.log([key, value]);
      })
      .then(function () {
        console.log("Iteration has completed");
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  }

  //reading the schedule list and seeing if the current schedule is already in the storage
  //if it isnt then add the currently held schedule to the schedule list
  update(schedule: { name: string }) {
    this.read(schedule);
    if (schedule.name === schedule.name)
      localforage.setItem(schedule.name, schedule);
    else localforage.setItem(schedule.name, schedule);
  }

  //deleting a specific schedule list and seeing if the specified schedule is even in the storage
  delete(schedule: { name: string }) {
    this.read(schedule);
    if (schedule.name === schedule.name) {
      localforage
        .removeItem(schedule.name)
        .then(function () {
          // Run this code once the key has been removed.
          console.log("Key is cleared!");
        })
        .catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        });
    }
  }

  returnAll() {
    localforage
      .keys()
      .then(function (keys) {
        // An array of all the key names.
        console.log(keys);
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  }
}
