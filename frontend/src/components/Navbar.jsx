import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategorias } from '../services/faketstoreApi';
import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Avatar }from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const expand = 'md'
export default function NavbarComponent() {
  const isMdOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categoriasData, setCategoriasData] = useState();
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth();

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };
  useEffect(() => {
      if (isMdOrLarger) {
        setNavbarExpanded(false); // cierra si es md o más
      }
    }, [isMdOrLarger]);

  useEffect(() => {
    async function loadAllData() {
      try {
        const categorias = await fetchCategorias();

        // console.log("categorias: ", categorias);

        setCategoriasData(categorias);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);
  
  return (
    <>

        <Navbar key={expand} expand={expand} expanded={navbarExpanded}  onToggle={handleNavbarToggle} 
        fixed="top"
        className="bg-white shadow-sm mx-auto px-6 py-3">
          <Container fluid>
            <Navbar.Brand as={Link} to={"/"} className='text-2xl font-bold'><span>My</span><span className='text-gray-500'>Store</span></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="w-50"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='text-2xl font-bold'>
                <span>My</span><span className='text-gray-500'>Store</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex justify-end flex-grow-1 items-start gap-2 pe-3 md:pe-0">
                <Form className={`${isMdOrLarger ? "flex" : "w-full"}`}>
                  <Form.Control
                    type="search"
                    placeholder="Find products..."
                    aria-label="Search"
                  />
                </Form>
                { user ? (
                  <NavDropdown id={`offcanvasNavbarDropdown-expand-${expand}`} title="Profile" className='pl-2 md:pl-0 md:ml-5 w-full md:w-auto'>
                    <NavDropdown.Item as={Link} to={`/profile/${user.id}`} className='flex gap-2'>
                      <Avatar alt={"User avatar"} sx={{ width: 32, height: 32 }} src={user.avatar} />
                      Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link onClick={() => setModalIsOpen(true)} className='pl-2 md:pl-0 md:ml-5 w-full md:w-auto'>Account</Nav.Link>
                    <AuthModal
                      isOpen={modalIsOpen}
                      onClose={() => setModalIsOpen(false)}
                    />
                  </>
                )}
                
                <NavDropdown
                  title="Catalog"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  className='pl-2 w-full md:w-auto'
                >
                  {loading ? (
                    <></>
                  ) : (
                    categoriasData.length > 0 &&
                    categoriasData.slice(0, 5).map((category, i) => (
                      <NavDropdown.Item key={category.name} onClick={() =>
                          navigate(`${category.navlink}`, { state: { id: category.id } })
                        } >{category.name}</NavDropdown.Item>
                    ))
                  )}
                </NavDropdown>

                  <Nav.Link as={Link} to={`/cart`} className='pl-2'>Cart</Nav.Link>
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}
