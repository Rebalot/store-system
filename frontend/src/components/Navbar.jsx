import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Avatar } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { CATEGORIES } from '../utils/constants';

const expand = 'md';

export default function NavbarComponent() {
  const isMdOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchTimeout = useRef(null);
  const { user } = useAuth();

  // Sync search input when navigating back to catalog with existing search state
  useEffect(() => {
    if (location.state?.search !== undefined) {
      setSearchValue(location.state.search);
    }
  }, [location.state?.search]);

  useEffect(() => {
    if (isMdOrLarger) setNavbarExpanded(false);
  }, [isMdOrLarger]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate('/catalog', {
        state: {
          ...location.state, // preserve active category if any
          search: value,
        },
      });
    }, 400);
  };

  const handleCategoryClick = (category) => {
    setSearchValue(''); // clear search when switching category
    navigate('/catalog', {
      state: { category },
    });
  };

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        expanded={navbarExpanded}
        onToggle={() => setNavbarExpanded(!navbarExpanded)}
        fixed="top"
        className="bg-white shadow-sm mx-auto px-6 py-3"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-2xl font-bold">
            <span>My</span><span className="text-gray-500">Store</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            className="w-50"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
                className="text-2xl font-bold"
              >
                <span>My</span><span className="text-gray-500">Store</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex justify-end flex-grow-1 items-start gap-2 pe-3 md:pe-0">

                {/* Search */}
                <Form className={`${isMdOrLarger ? "flex" : "w-full"}`}>
                  <Form.Control
                    type="search"
                    placeholder="Find products..."
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleSearchInput}
                  />
                </Form>

                {/* Auth */}
                {user ? (
                  <NavDropdown
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    title="Profile"
                    className="pl-2 md:pl-0 md:ml-5 w-full md:w-auto"
                  >
                    <NavDropdown.Item as={Link} to={`/profile/${user.id}`} className="flex gap-2">
                      <Avatar alt="User avatar" sx={{ width: 32, height: 32 }} src={user.avatar} />
                      Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link
                      onClick={() => setModalIsOpen(true)}
                      className="pl-2 md:pl-0 md:ml-5 w-full md:w-auto"
                    >
                      Account
                    </Nav.Link>
                    <AuthModal
                      isOpen={modalIsOpen}
                      onClose={() => setModalIsOpen(false)}
                    />
                  </>
                )}

                {/* Catalog dropdown */}
                <NavDropdown
                  title="Catalog"
                  id={`offcanvasNavbarDropdown-catalog-${expand}`}
                  className="pl-2 w-full md:w-auto"
                >
                  {CATEGORIES.map((cat) => (
                    <NavDropdown.Item
                      key={cat.value}
                      onClick={() => handleCategoryClick(cat.value)}
                    >
                      {cat.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>

                <Nav.Link as={Link} to="/cart" className="pl-2">Cart</Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
