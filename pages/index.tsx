import Head from "next/head"
import Container from "react-bootstrap/Container"

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>coffeeview: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1>Welcome to NextJS!</h1>
        <h3 style={{ fontSize: 30 }}>
          Get started by editing <code style={{ color: "red" }}>pages/index.tsx</code>
        </h3>
      </Container>
    </>
  )
}

export default HomePage
