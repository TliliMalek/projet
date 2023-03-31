
  import axios from "axios";
  import { FAILD, LOADING } from "../actiontypes/producttypes";
import { ADDREVIEWSSUCCESS, DELETEREVIEW, EDITREVIEW, GETPRODUCTREVIEWSSUCCESS, RFAILD, RLOADING } from "../actiontypes/reviewtypes";

const baseUrl="http://localhost:9000/review/"
  /**
   * @route get /review/:idprod
   * @description get product reviews
   * @access public
   */
  export const getproductreviews = (idprod) => async (dispatch) => {
    dispatch({ type: RLOADING });
    try {
      const { data } = await axios.get(`${baseUrl}/${idprod}`);
      dispatch({ type: GETPRODUCTREVIEWSSUCCESS, payload: data.reviews });
    } catch (error) {
      console.log(error);
      dispatch({ type: RFAILD, payload: error });
    }
  };
  /**
  /**
   * @route POST /review/add/:idprod
   * @description add new review
   * @access public
   */
  
  export const addreview = (idprod, newreview) => async (dispatch) => {
    dispatch({ type: RLOADING });
    try {
      const { data } = await axios.post(`${baseUrl}add/${idprod}`, newreview);
      dispatch({ type: ADDREVIEWSSUCCESS });
      dispatch(getproductreviews(idprod));
    } catch (error) {
      console.log(error);
      dispatch({ type: RFAILD, payload: error });
    }
  };
  
  /**
   * @route delete /review/:idreview
   * @description delete product review
   * @access public
   */
  
  export const deleteReview = (idreview) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      dispatch({ type: DELETEREVIEW, payload: idreview });
      const deleteReview = await axios.delete(`${baseUrl}${idreview}`);
    } catch (error) {
      dispatch({ type: FAILD, payload: error });
    }
  };
  
  /**
   * @route patch /review/:idreview
   * @description edit product review
   * @access public
   */
  export const editreview = (editRevData, idprod) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
      dispatch({ type: EDITREVIEW, payload: editRevData });
      const patchProduct = await axios.patch(`${baseUrl}${idprod}`, {
        ...editRevData,
      });
    } catch (error) {
      dispatch({ type: FAILD, payload: error });
    }
  };
  