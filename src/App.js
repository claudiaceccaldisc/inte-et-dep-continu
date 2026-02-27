import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home users={users} />} />
      <Route
        path="/register"
        element={<RegisterPage addUser={addUser} />}
      />
    </Routes>
  );
}

export default App;
