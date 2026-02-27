import { Link } from "react-router-dom";

function Home({ users }) {
  return (
    <div>
      <h1>Accueil</h1>

      <p>{users.length} utilisateur(s) inscrit(s)</p>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      <Link to="/register">
        <button>Aller au formulaire</button>
      </Link>
    </div>
  );
}

export default Home;