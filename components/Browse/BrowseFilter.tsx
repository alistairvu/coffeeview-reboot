import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { useState } from "react"

export const BrowseFilter = () => {
  const [isShown, setIsShown] = useState<boolean>(false)

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsShown((prev) => !prev)}
        className="d-block d-md-none mb-3"
        style={{ width: "100%" }}
      >
        {isShown ? "HIDE FILTER" : "SHOW FILTER"}
      </Button>

      <ListGroup className={`d-md-block ${isShown ? "d-block" : "d-none"}`}>
        <ListGroup.Item>
          <h2>District</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <h2>Price</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <h2>Tags</h2>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
