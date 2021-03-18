import Head from "next/head"
import Container from "react-bootstrap/Container"

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>coffeeview: Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Log In</h1>
      </Container>
    </>
  )
}

export default LoginPage
