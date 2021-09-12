import { render, getByTestId, fireEvent } from "@testing-library/react";
import React from "react";
import HomeBooking from "./HomeBooking";
import apiClient from "../services/apiClient";

let container = null;

const mockedHome = {
  title: "Test Home 1",
  image: "listing.jpg",
  location: "Test Location 1",
  price: 125,
};

beforeEach(() => {
  container = render(<HomeBooking home={mockedHome} />).container;
});

// it("test should render component correctly", () => {
//   console.log(container.innerHTML);
// });

// should show title

it("should show title", () => {
  expect(getByTestId(container, "title").textContent).toBe("Test Home 1");
});
// should show price
it("should show price", () => {
  expect(getByTestId(container, "price").textContent).toBe("125");
});
// should show check-in date field
it("should show check-in date field", () => {
  expect(getByTestId(container, "check-in")).toBeTruthy();
});
// should show check-out date field
it("should show check-out date field", () => {
  expect(getByTestId(container, "check-out")).toBeTruthy();
});
// should calculate total cost
it("should calculate total cost", () => {
  // enter check-in date: 2021-12-04
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-04" },
  });
  // enter check-out date: 2021-12-07
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-07" },
  });
  // assert total cost should show: 3*125=375
  expect(getByTestId(container, "total").textContent).toBe("375");
});
// should show book home after clicking the book button
it("should show empty when no home is provided", () => {
  // spy on apiClient
  jest.spyOn(apiClient, "bookHome").mockImplementation(() => {
    return Promise.resolve();
  });

  // select dates
  // enter check-in date: 2021-12-04
  fireEvent.change(getByTestId(container, "check-in"), {
    target: { value: "2021-12-04" },
  });
  // enter check-out date: 2021-12-07
  fireEvent.change(getByTestId(container, "check-out"), {
    target: { value: "2021-12-07" },
  });

  // click book button
  getByTestId(container, "book-btn").click();

  // assert apiClient was used to book the home
  expect(apiClient.bookHome).toHaveBeenCalledWith(
    mockedHome,
    "2021-12-04",
    "2021-12-07"
  );
});
// should close dialog and show notification after booking home

it("should show empty when no home is provided", () => {
  const nullContainer = render(<HomeBooking home={null} />).container;
  expect(getByTestId(nullContainer, "empty")).toBeTruthy;
});