import { Link } from "react-router-dom";
function Home({
  users
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Accueil"), /*#__PURE__*/React.createElement("p", null, users.length, " utilisateur(s) inscrit(s)"), /*#__PURE__*/React.createElement("ul", null, users.map((user, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, user.firstName, " ", user.lastName))), /*#__PURE__*/React.createElement(Link, {
    to: "/register"
  }, /*#__PURE__*/React.createElement("button", null, "Aller au formulaire")));
}
export default Home;