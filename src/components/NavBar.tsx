import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          BatistAI Resume Optimizer
        </Link>

        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Item>
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </Nav.Item>
            {isAuthenticated && user ? (
              <>
                <Nav.Item>
                  <Link
                    className="nav-link text-dark"
                    to={`userProfile/${user.id}`}
                  >
                    Profile
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Button onClick={handleLogout} variant="outline-danger" size="sm">
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link className="nav-link text-dark" to="/about">
                    About
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-sm px-4 py-2 rounded-0"
                  >
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm px-4 py-2 rounded-0 text-white"
                  >
                    Register
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
