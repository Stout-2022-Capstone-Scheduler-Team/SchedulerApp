import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Home from "../../pages";

test("Index Page Renders", () => {
  renderer.create(<Home />);
});
