import Head from "next/head"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "../hooks"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"
import { registerUser, resetRegister } from "../redux/user"

interface LoginInfoInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState<LoginInfoInterface>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState<string>("")

  const { isAuth } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const { userInfo, isRegistering, registerError } = useSelector((state: rootState) => state.user)

  useEffect(() => {
    dispatch(resetRegister())
    if (isAuth) {
      router.replace("/")
    }
  }, [userInfo, isAuth, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")
    if (registerInfo.password !== registerInfo.confirmPassword) {
      setPasswordError("Passwords do not match!")
      return
    }
    console.log(registerInfo)
    dispatch(registerUser(registerInfo))
  }

  return (
    <>
      <Head>
        <title>coffeeview: Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Register</h1>
        <Col lg={6} className="offset-lg-3">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="firstName" className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name..."
                        name="firstName"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="lastName" className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name..."
                        name="lastName"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email..."
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password..."
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password..."
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {passwordError && (
                  <Alert variant="danger" className="mb-3">
                    {passwordError}
                  </Alert>
                )}
                {registerError && (
                  <Alert variant="danger" className="mb-3">
                    {registerError}
                  </Alert>
                )}
                <Button type="submit" className="btn btn-primary mb-3" disabled={isRegistering}>
                  {isRegistering ? <Spinner animation="border" /> : "REGISTER"}
                </Button>
              </Form>
              <p>
                Returning to coffeeview? <Link href="/login">Click here to log in.</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default RegisterPage
