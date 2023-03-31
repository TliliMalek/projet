import {
  AUTHFAILED,
  CURRENTUSERAUTH,
  LOADING,
  LOGINSUCCSESS,
  LOGOUT,
  REGISTERSUCCSESS,
} from "../actiontypes/authtypes";

const initialState = {
  authloading: true,
  error: null,
  Alert: "",
  currentUser: {},
  isAuth:false,
};

export const authreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, authloading: true };

    case REGISTERSUCCSESS:
      return { ...state, Alert: payload, authloading: false };

    case LOGINSUCCSESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        Alert: payload.msg,
        currentUser: payload.user,
        authloading: false,
        isAuth:true

      };

    case CURRENTUSERAUTH:
      return {
        ...state,
isAuth:true,
        currentUser: payload,
        authloading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: true,
        error: null,
        Alert: null,
        currentUser: {},isAuth:false,
      };
    case AUTHFAILED:
      return { ...state, error: payload, authloading: false };

    default:
      return state;
  }
};
