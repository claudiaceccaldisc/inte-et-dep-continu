import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
function App() {
  const [users, setUsers] = useState([]);
  const addUser = user => {
    setUsers(prev => [...prev, user]);
  };
  return /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(Home, {
      users: users
    })
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/register",
    element: /*#__PURE__*/React.createElement(RegisterPage, {
      addUser: addUser
    })
  }));
}
export default App;