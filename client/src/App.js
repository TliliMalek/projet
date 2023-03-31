import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import Home from "./Components/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./JS/actions/authactions";
import ProductList from "./Components/Products/ProductList";
import AddProduct from "./Components/Products/AddProduct";
import EditProduct from "./Components/Products/EditProduct";
import AdminDashboard from "./Components/Private_Routes/Admin/Dashboard";
import ClientDashboard from "./Components/Private_Routes/Client/Dashboard";
import SellerDashboard from "./Components/Private_Routes/Seller/Dashboard";
import PrivateRoute from "./Components/Private_Routes";
import ProductDeatils from "./Components/Products/ProductDetails";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <div className="App" >
      <NavigationBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductList/>}/>
        <Route path="/:idprod" element={<ProductDeatils/>}/>
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:idprod"  element={<EditProduct/>}/>
        <Route
          path="/admin_dashboard"
          element={
            <PrivateRoute>
              {currentUser?.role == "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )}
            </PrivateRoute>
          }
        />

        <Route
          path="/client_dashboard"
          element={
            <PrivateRoute>
              <ClientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller_dashboard"
          element={
            <PrivateRoute>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
