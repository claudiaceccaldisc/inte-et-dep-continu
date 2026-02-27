import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
describe("Home page", () => {
  test("affiche compteur à 0", () => {
    render(/*#__PURE__*/React.createElement(MemoryRouter, null, /*#__PURE__*/React.createElement(Home, {
      users: []
    })));
    expect(screen.getByText("0 utilisateur(s) inscrit(s)")).toBeInTheDocument();
  });
  test("affiche liste utilisateurs", () => {
    render(/*#__PURE__*/React.createElement(MemoryRouter, null, /*#__PURE__*/React.createElement(Home, {
      users: [{
        firstName: "John",
        lastName: "Doe"
      }]
    })));
    expect(screen.getByText("1 utilisateur(s) inscrit(s)")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});