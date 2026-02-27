import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage({ addUser }) {
  return (
    <div>
      <h1>Inscription utilisateur</h1>

      <RegisterForm addUser={addUser} />

      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
}

export default RegisterPage;
