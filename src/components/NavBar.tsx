import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        <Link className="navbar-brand font-weight-bold text-dark" to="/">
          BatistAI Resume Optimizer
        </Link>


 
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <Link className="nav-link text-dark" to="/">
              Home
            </Link>

            <Link className="nav-link text-dark" to="/about">
              About
            </Link>

            <Link className="nav-link text-dark" to="/services">
              Services
            </Link>

            <Link className="nav-link text-dark" to="/contact">
              Contact
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm ms-3 text-white px-4 py-2 rounded-0"
            >
              Register
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
