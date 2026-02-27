import { useState } from "react";
import { saveUser } from "../services/userService";
import {
  isNotEmpty,
  isValidEmail,
  isValidPostalCode,
  isAdult,
} from "../utils/validators";

function RegisterForm({ addUser }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    postalCode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // VALIDATIONS
    if (!isNotEmpty(form.firstName)) {
      setError("Le prénom est obligatoire");
      return;
    }

    if (!isNotEmpty(form.lastName)) {
      setError("Le nom est obligatoire");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Email invalide");
      return;
    }

    if (!isAdult(form.birthDate)) {
      setError("Vous devez être majeur");
      return;
    }

    if (!isNotEmpty(form.city)) {
      setError("La ville est obligatoire");
      return;
    }

    if (!isValidPostalCode(form.postalCode)) {
      setError("Code postal invalide");
      return;
    }

    try {
      setLoading(true);

      const savedUser = await saveUser(form);

      if (addUser) {
        addUser(savedUser);
      }

      setSuccess("Inscription réussie");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        city: "",
        postalCode: "",
      });

    } catch (err) {
      setError("Erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Inscription utilisateur</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Prénom"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Nom"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthDate"
          data-testid="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="Ville"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="postalCode"
          placeholder="Code postal"
          value={form.postalCode}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "S'inscrire"}
        </button>
      </form>

      {error && (
        <p data-testid="error" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p data-testid="success" style={{ color: "green" }}>
          {success}
        </p>
      )}
    </div>
  );
}

export default RegisterForm;
