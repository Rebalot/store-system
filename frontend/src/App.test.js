import App from "./App";
import { render, screen } from "@testing-library/react";

test("always true test", () => {
  expect(true).toBe(true);
});

test("heading should be Vite + React", () => {
  render(<App />);

  const headingElement = screen.getByText("Vite + React");

  expect(headingElement).toBeInTheDocument();
});