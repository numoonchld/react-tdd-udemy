import { render, getAllByTestId } from "@testing-library/react";
import React from "react";
import Homes from "./Homes";

let container = null;
beforeEach(() => {
  container = render(<Homes />).container;
});

it("should show homes", () => {
  const homes = getAllByTestId("home");
  expect(homes.length).toBeGreaterThan(0);
});
