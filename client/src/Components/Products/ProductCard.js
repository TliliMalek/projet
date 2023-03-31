import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import { deleteproduct } from "../../JS/actions/productactions";

const ProductCard = ({ prd }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(deleteproduct(prd._id));
    window.location.href = window.location.href;
  };
  return (
    <Card style={{ width: "16rem", marginTop: "10%" }}>
      <Card.Img
        variant="top"
        src={prd.img}
        style={{ width: "250px", height: "250px" }}
      />
      <Card.Body>
        <Card.Title>{prd.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {prd.price} Dt</ListGroup.Item>
        <ListGroup.Item>Qtes: {prd.qtes || "non disponible"}</ListGroup.Item>
        <ListGroup.Item>Category: {prd.category}</ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ display: "flex", gap: "10px" }}>
        <Link to={`/${prd._id}`}>
          <Button variant="primary">See details</Button>
        </Link>
        <Link to={`/edit/${prd._id}`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={handleClick}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
