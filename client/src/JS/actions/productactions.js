import { ADDPRODUCT, DELETEPRODUCT, EDITPRODUCT, FAILD, GETALLPRODCUTSSUCCESS, GETONEPRODCUTSSUCCESS, LOADING } from "../actiontypes/producttypes";
import axios from "axios";

const baseUrl="http://localhost:9000/product/"
/**
 * @route get /product/
 * @description get all products
 * @access public
 */
export const getallproducts = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await axios.get(baseUrl);
    dispatch({ type: GETALLPRODCUTSSUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: FAILD, payload: error });
  }
};
/**
 * @route get /product/:idprod
 * @description get one product
 * @access public
 */
export const getoneproduct = (idprod) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await axios.get(`${baseUrl}${idprod}`);
    dispatch({ type: GETONEPRODCUTSSUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: FAILD, payload: error });
  }
};

/**
 * @route POST /product/add
 * @description add new product
 * @access public
 */
export const addproduct = (input) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    dispatch({ type: ADDPRODUCT, payload: input });
    const postProduct = await axios.post(baseUrl+"add", { ...input });
  } catch (error) {
    dispatch({ type: FAILD, payload: error });
  }
};
/**
 * @route patch /product/:idprod
 * @description update  product
 * @access public
 */
export const editproduct = (editData, idprod) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    dispatch({ type: EDITPRODUCT, payload: editData });
    const patchProduct = await axios.patch(`${baseUrl}${idprod}`, {
      ...editData,
    });
  } catch (error) {
    dispatch({ type: FAILD, payload: error });
  }
};

/**
 * @route delete /product/:idprod
 * @description delete  product
 * @access public
 */
export const deleteproduct = (idprod) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    dispatch({ type: DELETEPRODUCT, payload: idprod });
    const deleteProduct = await axios.delete(`${baseUrl}${idprod}`);
  } catch (error) {
    dispatch({ type: FAILD, payload: error });
  }
};
