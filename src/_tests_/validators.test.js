import {
  isNotEmpty,
  isValidEmail,
  isValidPostalCode,
  isAdult,
} from "../utils/validators";

describe("Validators", () => {

  describe("isNotEmpty", () => {
    test("retourne true si string non vide", () => {
      expect(isNotEmpty("John")).toBe(true);
    });

    test("retourne false si vide ou espaces", () => {
      expect(isNotEmpty("")).toBe(false);
      expect(isNotEmpty("   ")).toBe(false);
    });

    test("retourne false si non string", () => {
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
      expect(isNotEmpty(123)).toBe(false);
    });
  });

  describe("isValidEmail", () => {
    test("retourne true si email valide", () => {
      expect(isValidEmail("test@mail.com")).toBe(true);
    });

    test("retourne false si email invalide", () => {
      expect(isValidEmail("badmail")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });

    test("retourne false si non string", () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
    });
  });

  describe("isValidPostalCode", () => {
    test("retourne true si 5 chiffres", () => {
      expect(isValidPostalCode("75000")).toBe(true);
    });

    test("retourne false si mauvais format", () => {
      expect(isValidPostalCode("7500")).toBe(false);
      expect(isValidPostalCode("ABCDE")).toBe(false);
      expect(isValidPostalCode("")).toBe(false);
    });

    test("retourne false si non string", () => {
      expect(isValidPostalCode(null)).toBe(false);
      expect(isValidPostalCode(undefined)).toBe(false);
    });
  });

  describe("isAdult", () => {
  test("retourne true si majeur", () => {
    expect(isAdult("2000-01-01")).toBe(true);
  });

  test("retourne false si mineur", () => {
    expect(isAdult("2015-01-01")).toBe(false);
  });

  test("retourne false si vide ou non string", () => {
    expect(isAdult("")).toBe(false);
    expect(isAdult(null)).toBe(false);
    expect(isAdult(undefined)).toBe(false);
  });

  test("retourne false si date invalide", () => {
    expect(isAdult("not-a-date")).toBe(false);
    expect(isAdult("2020-99-99")).toBe(false);
  });

  test("retourne false si anniversaire pas encore passé cette année (branche monthDiff < 0)", () => {
    const futureMonth = new Date().getMonth() + 1;
    const year = new Date().getFullYear() - 18;

    const month = futureMonth > 11 ? 0 : futureMonth;
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-01`;

    expect(isAdult(formatted)).toBe(false);
  });
});


});
