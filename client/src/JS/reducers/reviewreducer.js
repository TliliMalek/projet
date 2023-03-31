import { DELETEPRODUCT } from "../actiontypes/producttypes";
import {
  EDITREVIEW,
  GETPRODUCTREVIEWSSUCCESS,
  RFAILD,
  RLOADING,
} from "../actiontypes/reviewtypes";

const initialState = {
  loading: true,
  reviews: [],
  error: null,
  editRevData: [],
  id: "",
};

export const reviewreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case RLOADING:
      return { ...state, loading: true };

    case GETPRODUCTREVIEWSSUCCESS:
      return { ...state, reviews: payload, loading: false };
    case RFAILD:
      return { ...state, error: payload, loading: false };
    case DELETEPRODUCT:
      return { ...state, id: payload };

    case EDITREVIEW:
      return { ...state, editRevData: payload };

    default:
      return state;
  }
};
