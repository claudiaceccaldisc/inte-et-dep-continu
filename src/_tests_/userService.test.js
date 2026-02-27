import { saveUser } from "../services/userService";

describe("userService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("retourne données si succès", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1 }),
    });

    const result = await saveUser({ name: "John" });
    expect(result).toEqual({ id: 1 });
  });

  test("throw erreur si réponse pas ok", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    await expect(saveUser({})).rejects.toThrow("Erreur serveur");
  });
});
