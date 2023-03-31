import {
  AUTHFAILED,
  CURRENTUSERAUTH,
  LOADING,
  LOGINSUCCSESS,
  LOGOUT,
  REGISTERSUCCSESS,
} from "../actiontypes/authtypes";
import axios from "axios";
/**
 *@method POST /auth/signup
 *@description register new user
 *@access public
 */
const baseURl = "http://localhost:9000/auth"; 
export const register = (newUser, navigate) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await axios.post(`${baseURl}/signup`, newUser);
    dispatch({ type: REGISTERSUCCSESS, payload: data.msg });
    if (data.msg) {
      alert(data.msg);
    }
    navigate("/signin");
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((el) => alert(el.msg));
    }
    if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
  }
};
/**
 *@method POST /auth/signin
 *@description login user
 *@access public
 */
export const login = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await axios.post(`${baseURl}/signin`, user);
    dispatch({ type: LOGINSUCCSESS, payload: data });
    if (data.msg) {
      alert(data.msg);
    }
    data.user.role == "admin"
      ? navigate("/admin_dashboard")
      : data.user.role == "seller"
      ? navigate("/seller_dashboard")
      : navigate("/client_dashboard");
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((el) => alert(el.msg));
    }
    if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
  }
};
/**
 *@method GET /auth/
 *@description  utilisateur authentifié
 *@access private
 */
export const getUser = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const opts = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  console.log(`Bearer ${localStorage.getItem("token")}`);
  try {
    const { data } = await axios.get(`${baseURl}/`, opts);
    dispatch({ type: CURRENTUSERAUTH, payload: data.user });
    if (data.msg) {
      alert(data.msg);
    }
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);

    if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
  }
};

export const logout = () => ({
  type: LOGOUT,
});
