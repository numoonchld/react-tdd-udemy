import { render, getAllByTestId, getNodeText } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import apiClient from "../services/apiClient";
import Homes from "./Homes";

let container = null;
beforeEach(async () => {
  jest.spyOn(apiClient, "getHomes").mockImplementation(() => {
    return Promise.resolve([
      {
        title: "Test Home 1",
        image: "listing.jpg",
        location: "Test Location 1",
        price: 1,
      },
      {
        title: "Test Home 2",
        image: "listing.jpg",
        location: "Test Location 2",
        price: 2,
      },
      {
        title: "Test Home 3",
        image: "listing.jpg",
        location: "Test Location 3",
        price: 3,
      },
      {
        title: "Test Home 4",
        image: "listing.jpg",
        location: "Test Location 4",
        price: 4,
      },
    ]);
  });

  container = render(<Homes />).container;
  await act(async () => {});
});

it("should show homes", () => {
  const homes = getAllByTestId(container, "home");
  expect(homes.length).toBeGreaterThan(0);
});

it("should show home title", () => {
  const homesTitles = getAllByTestId(container, "home-title");
  expect(getNodeText(homesTitles[0])).toBe("Test Home 1");
});

it("should show home image", () => {
  const homesImages = getAllByTestId(container, "home-image");
  expect(homesImages[0]).toBeTruthy();
});

it("should show home location", () => {
  const homesLocations = getAllByTestId(container, "home-location");
  expect(getNodeText(homesLocations[0])).toBe("Test Location 1");
});
