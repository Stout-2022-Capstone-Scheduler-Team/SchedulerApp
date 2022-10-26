import { StorageService, Schedule } from "../../services/storageService";
import localforage from "localforage";

jest.mock("localforage");
beforeEach(() => {
  jest.resetAllMocks();
});

test("Get Item", async () => {
  // declare a dummy object for adding and removing to the storage
  const a = {};

  // declare a storage object
  const storage = new StorageService();

  // testing retrieving an item from storage
  const getItem = jest.mocked(localforage.getItem);
  getItem.mockResolvedValueOnce(a);

  expect(await storage.read("item")).toBe(a);
  expect(getItem.mock.calls).toEqual([["item"]]);
});

test("Set Item", async () => {
  // declare a dummy object for adding and removing to the storage
  const a = {};

  // declare a storage object
  const storage = new StorageService();

  const setItem = jest.mocked(localforage.setItem);

  // testing saving an item to the storage
  setItem.mockResolvedValueOnce(a);

  void (await storage.update("item", a));
  expect(setItem.mock.calls).toEqual([["item", a]]);
});

test("Remove Item", async () => {
  // declare a storage object
  const storage = new StorageService();

  const removeItem = jest.mocked(localforage.removeItem);
  // testing removing an item from the storage
  removeItem.mockResolvedValueOnce(undefined);

  await storage.delete("item");
  expect(removeItem.mock.calls).toEqual([["item"]]);
});

test("Iterate", async () => {
  // declare a dummy object for adding and removing to the storage
  const a = {};

  // declare a storage object
  const storage = new StorageService();

  const iterate = jest.mocked(localforage.iterate);
  // testing retrieving all of the items from the storage
  iterate.mockImplementationOnce(
    async (f: (value: Schedule, key: string, _: number) => void) => {
      f(a, "item", 1);
      return await Promise.resolve(undefined);
    }
  );

  expect(await storage.returnAll()).toStrictEqual<{ [key: string]: Schedule }>({
    item: a
  });
});
