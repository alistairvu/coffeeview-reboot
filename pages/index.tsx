import Head from "next/head"
import Container from "react-bootstrap/Container"

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App Bootstrap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container className="text-center py-5">
          <h1>Welcome to NextJS!</h1>
          <h3 style={{ fontSize: 30 }}>
            Get started by editing <code style={{ color: "red" }}>pages/index.tsx</code>
          </h3>
        </Container>
      </main>
    </div>
  )
}

export default Home
