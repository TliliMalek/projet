import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editproduct } from "../../JS/actions/productactions";



const EditProduct = () => {
  const dispatch = useDispatch();
  const { idprod } = useParams();
  const navigate = useNavigate();

  const defaultData = useSelector((state) => state.prod.products);
  
  const res = defaultData.filter(({ _id }) => _id === idprod);
  console.log(res);
  const [editData, setEditData] = useState({
    name: res[0].name,
    price: res[0].price,
    qtes: res[0].qtes,
    description: res[0].description,
    category: res[0].category,
    size: res[0].size,
    color: res[0].color,
    disponible: res[0].disponible,
    img: res[0].img,
  });
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  //console.log(editData)
  const handleSumbit = () => {
    if(editData.name && editData.price && editData.qtes){
    dispatch(editproduct(editData, idprod));
    navigate("/product");
  }else{
    return alert('Please fill the Name, Price, Qtes fields')
  }
  };

  return (
    <div>
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
            value={editData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "78px" }}>
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "80px" }}>
          <p>Qtes:</p>
          <input
            type="number"
            name="qtes"
            value={editData.qtes}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          <p>Description:</p>
          <input
            type="text"
            name="description"
            value={editData.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "48px" }}>
          <p>Category:</p>
          <input
            type="text"
            name="category"
            value={editData.category}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "84px" }}>
          <p>Size:</p>
          <input
            type="text"
            name="size"
            value={editData.size}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "74px" }}>
          <p>Color:</p>
          <input
            type="text"
            name="color"
            value={editData.color}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "37px" }}>
          <p>Disponible:</p>
          <select
            name="disponible"
            value={editData.disponible}
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
          Save edits
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
