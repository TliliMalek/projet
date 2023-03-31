import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addproduct } from "../../JS/actions/productactions";



const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const input = useSelector((state) => state.prod.input);
  const [prodDetails, setprodDetails] = useState({
    name: "",
    price: 0,
    qtes: 0,
    description: "",
    category: [],
    size: [],
    color: [],
    disponible: true,
    img: "",
  });
  const handleChange = (e) => {
    setprodDetails({ ...prodDetails, [e.target.name]: e.target.value });
  };

  const handleSumbit = () => {
    if (prodDetails.name && prodDetails.price && prodDetails.qtes) {
      dispatch(addproduct(prodDetails));
      setprodDetails({
        name: "",
        price: 0,
        qtes: 0,
        description: "",
        category: [],
        size: [],
        color: [],
        disponible: true,
        img: "",
      });
      navigate("/product");
    } else {
      return alert("Please fill the Name, Price, Qtes fields");
    }
  };
  console.log(input);
  return (
    <div
      style={{
        margin: "auto",
        marginTop: "2%",
        width: "fit-content",
        border: "3px solid black",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "70px" }}>
        <p>Name:</p>
        <input
          type="text"
          name="name"
          value={prodDetails.name}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "78px" }}>
        <p>Price:</p>
        <input
          type="number"
          name="price"
          value={prodDetails.price}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "80px" }}>
        <p>Qtes:</p>
        <input
          type="number"
          name="qtes"
          value={prodDetails.qtes}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "32px" }}>
        <p>Description:</p>
        <input
          type="text"
          name="description"
          value={prodDetails.description}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "48px" }}>
        <p>Category:</p>
        <input
          type="text"
          name="category"
          value={prodDetails.category}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "84px" }}>
        <p>Size:</p>
        <input
          type="text"
          name="size"
          value={prodDetails.size}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "74px" }}>
        <p>Color:</p>
        <input
          type="text"
          name="color"
          value={prodDetails.color}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: "37px" }}>
        <p>Disponible:</p>
        <select
          name="disponible"
          value={prodDetails.disponible}
          onChange={handleChange}
        >
          <option>Select your option</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: "68px" }}>
        <p>Image:</p>
        <input type="text" name="img" id="" onChange={handleChange} />
      </div>
      <button className="add" onClick={handleSumbit}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
