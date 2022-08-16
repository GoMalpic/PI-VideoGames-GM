import { Link } from "react-router-dom";
import "../navBar/navBar.css";

const NavBar = () => {
  return (
    <header>
      <nav className="nav">
        <ul className="navLinks">
          <div className="navLinks">
            <Link to="/">
              <button class="buttonNavBar"> START PAGE</button>
            </Link>
          </div>
          <li className="">
            <Link to="/home">
              <button class="buttonNavBar"> HOME</button>
            </Link>
          </li>
          <li className="navItem">
            <Link to="/game/add" className="botonCreate">
            <button class="buttonNavBar"> CREATE VIDEOGAME</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
