import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Link from "next/link"
import Container from "react-bootstrap/Container"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/user"
import { useAuth } from "../hooks"

export const AppHeader: React.FC = () => {
  const router = useRouter()

  const { isAuth } = useAuth()
  const dispatch = useDispatch()

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-3" collapseOnSelect>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>coffeeview</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="coffeeview-nav" />
        <Navbar.Collapse id="coffeeview-nav">
          <Nav className="ms-auto" activeKey={router.pathname}>
            <Link href="/browse" passHref>
              <Nav.Link eventKey="/browse">Browse</Nav.Link>
            </Link>
            {isAuth ? (
              <Nav.Link onClick={() => dispatch(logoutUser())}>Log Out</Nav.Link>
            ) : (
              <Link href="/login" passHref>
                <Nav.Link eventKey="/login">Log In</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
