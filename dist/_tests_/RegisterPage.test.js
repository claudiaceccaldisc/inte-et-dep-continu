import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
describe("RegisterPage", () => {
  test("affiche bouton retour", () => {
    render(/*#__PURE__*/React.createElement(MemoryRouter, null, /*#__PURE__*/React.createElement(RegisterPage, {
      users: [],
      addUser: jest.fn()
    })));
    expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
  });
});