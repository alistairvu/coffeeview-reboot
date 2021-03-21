import Head from "next/head"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "../hooks"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"
import { loginUser, resetLogin } from "../redux/user"

interface LoginInfoInterface {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoInterface>({
    email: "",
    password: "",
  })

  const { isAuth } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const { userInfo, isLoggingIn, loginError } = useSelector((state: rootState) => state.user)

  useEffect(() => {
    dispatch(resetLogin())
    if (isAuth) {
      router.replace("/")
    }
  }, [userInfo, isAuth, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(loginInfo)
    dispatch(loginUser(loginInfo))
  }

  return (
    <>
      <Head>
        <title>coffeeview: Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Log In</h1>
        <Col lg={6} className="offset-lg-3">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
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
                {loginError && (
                  <Alert variant="danger" className="mb-3">
                    {loginError}
                  </Alert>
                )}
                <Button type="submit" variant="primary" disabled={isLoggingIn} className="mb-3">
                  {isLoggingIn ? <Spinner animation="border" /> : "LOG IN"}
                </Button>
              </Form>
              <p>
                New to coffeeview? <Link href="/register">Click here to register.</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default LoginPage
