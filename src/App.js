import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: apiUrl,
        });

        const response = await api.get("/users");
        setUsersCount(response.data.utilisateurs.length);
      } catch (error) {
        console.error(error);
      }
    }

    countUsers();
  }, [apiUrl]);

  return (
    <div className="App">
      <h1>Users manager</h1>
      <p>{usersCount} user(s) already registered</p>
    </div>
  );
}

export default App;