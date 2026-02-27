import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("Home page", () => {
  test("affiche compteur à 0", () => {
    render(
      <MemoryRouter>
        <Home users={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("0 utilisateur(s) inscrit(s)")).toBeInTheDocument();
  });

  test("affiche liste utilisateurs", () => {
    render(
      <MemoryRouter>
        <Home users={[{ firstName: "John", lastName: "Doe" }]} />
      </MemoryRouter>
    );

    expect(screen.getByText("1 utilisateur(s) inscrit(s)")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
