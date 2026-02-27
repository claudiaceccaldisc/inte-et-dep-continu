import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
function RegisterPage({
  addUser
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Inscription utilisateur"), /*#__PURE__*/React.createElement(RegisterForm, {
    addUser: addUser
  }), /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement("button", null, "Retour \xE0 l'accueil")));
}
export default RegisterPage;