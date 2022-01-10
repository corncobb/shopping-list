import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";

// Not writing a test for this
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
