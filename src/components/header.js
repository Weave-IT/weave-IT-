import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="title">
      <Link className="logo" to="/">
        Weave;IT!
      </Link>
      <div className="tab">
        <Link to="/howto">HOW TO</Link>
        <Link to="/app">START WEAVING</Link>
      </div>
    </div>
  );
}
export default Header;
