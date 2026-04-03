import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const port = process.env.REACT_APP_SERVER_PORT || 8000;
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://35.180.205.228:${port}`
        });

        const response = await api.get('/users');

        setUsersCount(response.data.utilisateurs.length);

      } catch (error) {
        console.error(error);
      }
    }

    countUsers();
  }, [port]);

  return (
    <div className="App">
      <h1>Users manager</h1>
      <p>{usersCount} user(s) already registered</p>
    </div>
  );
}

export default App;