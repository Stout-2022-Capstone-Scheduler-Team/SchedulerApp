import { StorageService } from "../../services/storageService";
import foragemock from "../../__mocks__/localforage";

test("get item", async () => {
  let a = {};
  foragemock.getItem.mockResolvedValueOnce(a);

  let storage = new StorageService();
  expect(await storage.read("item")).toBe(a);
  expect(foragemock.getItem.mock.calls).toEqual([["item"]]);
});
