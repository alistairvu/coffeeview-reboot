import Head from "next/head"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useState } from "react"
import { useRouter } from "next/router"

const BrowsePage: React.FC = () => {
  const router = useRouter()
  const pageNumber = Number(router.query.page) || 1
  console.log(pageNumber)

  return (
    <>
      <Head>
        <title>coffeeview: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Browse</h1>
        <Row></Row>
      </Container>
    </>
  )
}

export default BrowsePage
