import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const NavigationBar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Tabletek</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/">Home</a>
          </Navbar.Text>
          <Navbar.Text style={{marginLeft: "2rem"}}>
            <a href="/tabletek-lista">Tablet List</a>
          </Navbar.Text>
          <Navbar.Text style={{marginLeft: "2rem"}}>
            <a href="/toptablets">Legdrágább tabletek</a>
          </Navbar.Text>
          <Navbar.Text style={{marginLeft: "2rem"}}>
            <a href="/cheapesttablets">Legolcsóbb tabletek</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
