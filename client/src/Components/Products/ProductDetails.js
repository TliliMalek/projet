import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { addreview, deleteReview, editreview, getproductreviews } from "../../JS/actions/reviewaction";
import { getoneproduct } from "../../JS/actions/productactions";


const ProductDeatils = () => {
  const [show, setShow] = useState("");
  const [rating, setRating] = useState(0);
  const ratingChanged = (newRating) => {
    setRating(newRating);
    setStar(newRating);
  };

  const [rate, setStar] = useState(0);

  const reviews = useSelector((state) => state.rev.reviews);
  const dispatch = useDispatch();
  const { idprod } = useParams();

  const handleClick = async (e) => {
    const revID = e.target.id;
    await dispatch(deleteReview(revID));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getoneproduct(idprod));
    dispatch(getproductreviews(idprod));
  }, [idprod]);

  const proddetails = useSelector((state) => state.prod.proddetails);
  const loading = useSelector((state) => state.prod.loading);

  const Rloading = useSelector((state) => state.rev.loading);
  const [reviewproduct, setreviewproduct] = useState({
    rate: "",
    comment: "",
  });
  const start = (reviewproduct.rate = rating);

  const handleChange = (e) => {
    setreviewproduct(
      { ...reviewproduct, [e.target.name]: e.target.value, rating },
      start
    );
  };
  const refresh = () => {
    window.location.reload();
  };
  const handleSumbit = () => {
    if (reviewproduct.comment) {
      dispatch(addreview(idprod, { ...reviewproduct, product: idprod }, start));
      setreviewproduct({
        rate: 0,
        comment: "",
      });
      // refresh();
    } else {
      return alert("Please Fill in the Comment section");
    }
  };

  const [editRevData, setEditRevData] = useState({
    rate: 0,
    comment: "",
  });

  const starsRev = (editRevData.rate = rating);

  const handleChangeRevDate = (e) => {
    setEditRevData({ ...editRevData, [e.target.name]: e.target.value });
  };

  const handleSumbitRev = (e) => {
    if (show == "") {
      setShow(e.target.id);
    } else {
      const revID = e.target.id;

      if (!editRevData.comment || !editRevData.rate) {
        setShow("");
      } else {
        dispatch(editreview({ ...editRevData, rate }, revID));
        // window.location.reload();
      }
    }
  };
  const likshow = (e) => {
    //console.log(e)
    setShow({ value: true, id: e.target.value });
  };
  console.log(show);
  return (
    <>
      <div className="container">
        {loading ? (
          "load"
        ) : (
          <div className="row" style={{ marginTop: "3%" }}>
            <div className="col-6" style={{ display: "flex" }}>
              <Card style={{ width: "12rem" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "30px" }}>
                    <p style={{ color: "darkmagenta" }}>{proddetails?.name}</p>
                  </Card.Title>
                </Card.Body>
                <Card.Img variant="top" src={proddetails?.img} />
              </Card>

              <div style={{ display: "flex" }}>
                <Card style={{ width: "20rem" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ color: "darkmagenta" }}>Description:</p>
                        <p style={{ fontSize: "20px" }}>
                          {proddetails?.description}
                        </p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ color: "darkmagenta" }}>Category:</p>

                        {!loading?proddetails.category.map((el) => (
                          <p style={{ fontSize: "20px" }}>{el}</p>
                        )):""}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ color: "darkmagenta" }}>Size:</p>

                        {!loading?proddetails.size.map((el) => (
                          <p style={{ fontSize: "20px" }}>{el}</p>
                        )):""}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p style={{ color: "darkmagenta" }}> Color:</p>

                        {!loading?proddetails.color.map((el) => (
                          <p style={{ fontSize: "20px" }}>{el}</p>
                        )):""}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
            {/* addreview */}

            <div className="col-6">
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item
                  variant="dark"
                  action
                  href="#link1"
                  style={{ paddingTop: "4%", paddingBottom: "4%" }}
                >
                  <ReactStars
                    count={5}
                    name="rate"
                    onChange={ratingChanged}
                    value={reviewproduct.rate}
                    size={32}
                    activeColor="#ffd700"
                  />
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                  action
                  href="#link2"
                >
                  <p style={{ marginTop: "15px", fontSize: "50px" }}>
                    Write your review
                  </p>{" "}
                  <input
                    style={{ width: "100%", height: "100%" }}
                    type="text"
                    name="comment"
                    id=""
                    value={reviewproduct.comment}
                    onChange={handleChange}
                  />
                </ListGroup.Item>
                <ListGroup.Item variant="light" action onClick={handleSumbit}>
                  <p style={{ marginTop: "9px", fontSize: "20px" }}>
                    Add Review
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3%" }}>
          {Rloading
            ? "load"
            : reviews.map((el) => (
                <>
                  <ListGroup key={el._id} style={{ margin: "5%" }}>
                    <ListGroup.Item
                      variant="primary"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <ReactStars
                        classNames="stars"
                        count={5}
                        disable
                        value={el.rate}
                        size={24}
                      />

                      {/* edit stars */}
                      {show == el._id ? (
                        <>
                          <ReactStars
                            id={el._id}
                            name="rate"
                            count={5}
                            value="0"
                            size={24}
                            style={{ margin: "auto" }}
                            onChange={ratingChanged}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          id={el._id}
                          variant="primary"
                          onClick={handleSumbitRev}
                        >
                          {show == el._id ? "Save" : "Edit"}
                        </Button>
                        <Button
                          id={el._id}
                          variant="danger"
                          onClick={handleClick}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant="secondary"
                      style={{ display: "flex" }}
                    >
                      <p style={{ textAlign: "left" }}>{el.comment}</p>
                      {/* edit comment */}
                      {show == el._id ? (
                        <input
                          style={{ margin: "auto" }}
                          type="text"
                          name="comment"
                          placeholder={el.comment}
                          id={el._id}
                          onChange={handleChangeRevDate}
                        />
                      ) : (
                        ""
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </>
              ))}
        </div>
      </div>
    </>
  );
};

export default ProductDeatils;
