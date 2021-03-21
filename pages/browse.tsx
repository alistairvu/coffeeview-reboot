import Head from "next/head"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useState } from "react"
import { BrowseFilter } from "../components/Browse"

interface FilterInterface {
  price: number
}

const BrowsePage: React.FC = () => {
  const [filterData, setFilterData] = useState<FilterInterface>({} as FilterInterface)

  return (
    <>
      <Head>
        <title>coffeeview: Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="pb-4">
        <h1 className="black-text">Browse</h1>
        <Row>
          <Col md={3}>
            <BrowseFilter />
          </Col>
          <Col md={9}></Col>
        </Row>
      </Container>
    </>
  )
}

export default BrowsePage
