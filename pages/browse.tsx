import Head from "next/head"
import Container from "react-bootstrap/Container"

const BrowsePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>coffeeview: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Browse</h1>
      </Container>
    </>
  )
}

export default BrowsePage
