import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

describe("RegisterPage", () => {
  test("affiche bouton retour", () => {
    render(
      <MemoryRouter>
        <RegisterPage users={[]} addUser={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument();
  });
});
