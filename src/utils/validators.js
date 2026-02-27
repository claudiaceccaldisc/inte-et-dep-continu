/**
 * @file Fonctions de validation du formulaire d'inscription.
 */

/**
 * Vérifie qu'une valeur n'est pas vide.
 * @param {string} value - Valeur à vérifier.
 * @returns {boolean} True si la chaîne contient au moins un caractère non vide.
 */
export function isNotEmpty(value) {
  if (typeof value !== "string") return false;
  return value.trim() !== "";
}

/**
 * Vérifie qu'un email est valide.
 * @param {string} email - Adresse email à valider.
 * @returns {boolean} True si l'email respecte le format standard.
 */
export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Vérifie qu'un code postal français est valide (5 chiffres).
 * @param {string} postalCode - Code postal à valider.
 * @returns {boolean} True si le code postal contient exactement 5 chiffres.
 */
export function isValidPostalCode(postalCode) {
  if (typeof postalCode !== "string") return false;
  return /^[0-9]{5}$/.test(postalCode);
}

/**
 * Vérifie si la personne est majeure (18 ans minimum).
 * @param {string} birthDate - Date de naissance au format YYYY-MM-DD.
 * @returns {boolean} True si l'utilisateur a au moins 18 ans.
 */
export function isAdult(birthDate) {
  if (typeof birthDate !== "string" || birthDate.trim() === "") {
    return false;
  }

  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age >= 18;
}
