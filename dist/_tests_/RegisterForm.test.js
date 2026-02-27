import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";
import * as userService from "../services/userService";
jest.mock("../services/userService");
describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("affiche erreur si prénom vide", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Le prénom est obligatoire");
  });
  test("affiche erreur si nom vide", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Le nom est obligatoire");
  });
  test("affiche erreur email invalide", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "bademail"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Email invalide");
  });
  test("affiche erreur si mineur", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "john@mail.com"
      }
    });
    fireEvent.change(screen.getByTestId("birthDate"), {
      target: {
        value: "2020-01-01"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Vous devez être majeur");
  });
  test("affiche erreur si ville vide", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "john@mail.com"
      }
    });
    fireEvent.change(screen.getByTestId("birthDate"), {
      target: {
        value: "2000-01-01"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("La ville est obligatoire");
  });
  test("affiche erreur si code postal invalide", async () => {
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "john@mail.com"
      }
    });
    fireEvent.change(screen.getByTestId("birthDate"), {
      target: {
        value: "2000-01-01"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: {
        value: "Paris"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Code postal"), {
      target: {
        value: "abc"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Code postal invalide");
  });
  test("inscription réussie", async () => {
    const addUserMock = jest.fn();
    userService.saveUser.mockResolvedValue({
      firstName: "John",
      lastName: "Doe"
    });
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: addUserMock
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "john@mail.com"
      }
    });
    fireEvent.change(screen.getByTestId("birthDate"), {
      target: {
        value: "2000-01-01"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: {
        value: "Paris"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Code postal"), {
      target: {
        value: "75000"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByTestId("success")).toHaveTextContent("Inscription réussie"));
    expect(addUserMock).toHaveBeenCalled();
  });
  test("affiche erreur si API échoue", async () => {
    userService.saveUser.mockRejectedValue(new Error("Erreur serveur"));
    render(/*#__PURE__*/React.createElement(RegisterForm, {
      addUser: jest.fn()
    }));
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: {
        value: "John"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: {
        value: "Doe"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {
        value: "john@mail.com"
      }
    });
    fireEvent.change(screen.getByTestId("birthDate"), {
      target: {
        value: "2000-01-01"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: {
        value: "Paris"
      }
    });
    fireEvent.change(screen.getByPlaceholderText("Code postal"), {
      target: {
        value: "75000"
      }
    });
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Erreur serveur");
  });
});