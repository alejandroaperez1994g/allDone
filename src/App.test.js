import { render, screen } from "@testing-library/react";
import App from "./App";
import { classify } from "../src/views/Todo";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Tasks/i);
  expect(linkElement).toBeInTheDocument();
});

test("classify function", () => {
  const text = classify("carta");
  expect(text).toBe("carta");
});
