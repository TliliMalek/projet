import {
  ADDPRODUCT,
  DELETEPRODUCT,
  EDITPRODUCT,
  FAILD,
  GETALLPRODCUTSSUCCESS,
  GETONEPRODCUTSSUCCESS,
  LOADING,
} from "../actiontypes/producttypes";

const initialState = {
  loading: true,
  products: [],
  error: null,
  proddetails: {},
  input: [],
  editData: [],
  id: "",
};

export const productreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case GETALLPRODCUTSSUCCESS:
      return { ...state, products: payload, loading: false };
    case GETONEPRODCUTSSUCCESS:
      return { ...state, proddetails: payload, loading: false };

    case ADDPRODUCT:
      return { ...state, input: payload };

    case EDITPRODUCT:
      return { ...state, editData: payload };

    case DELETEPRODUCT:
      return { ...state, id: payload };

    case FAILD:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
