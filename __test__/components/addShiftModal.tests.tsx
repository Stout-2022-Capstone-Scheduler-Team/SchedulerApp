import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { AddShiftModal } from "../../components/addShiftModal";

test("Add Shift Renders", () => {
  const addShiftModal = render(<AddShiftModal />);
  expect(addShiftModal).toMatchSnapshot();
});
