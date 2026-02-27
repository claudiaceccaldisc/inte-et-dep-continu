import { useState } from "react";
import { saveUser } from "../services/userService";
import { isNotEmpty, isValidEmail, isValidPostalCode, isAdult } from "../utils/validators";
function RegisterForm({
  addUser
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    postalCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
    setSuccess("");
  };
  const handleSubmit = async e => {
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
        postalCode: ""
      });
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "form-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Inscription utilisateur"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    name: "firstName",
    placeholder: "Pr\xE9nom",
    value: form.firstName,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    name: "lastName",
    placeholder: "Nom",
    value: form.lastName,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    name: "email",
    placeholder: "Email",
    value: form.email,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "birthDate",
    "data-testid": "birthDate",
    value: form.birthDate,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    name: "city",
    placeholder: "Ville",
    value: form.city,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("input", {
    name: "postalCode",
    placeholder: "Code postal",
    value: form.postalCode,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading
  }, loading ? "Envoi en cours..." : "S'inscrire")), error && /*#__PURE__*/React.createElement("p", {
    "data-testid": "error",
    style: {
      color: "red"
    }
  }, error), success && /*#__PURE__*/React.createElement("p", {
    "data-testid": "success",
    style: {
      color: "green"
    }
  }, success));
}
export default RegisterForm;