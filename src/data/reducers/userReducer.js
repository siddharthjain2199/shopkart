// userReducer.js

import userTypes from "../types/userTypes";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null // new field to track authentication errors
};

const userReducer = (state, action) => {
  switch (action.type) {
    case userTypes.SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case userTypes.SET_NAME:
      return { ...state, userDetails: { ...state.userDetails, name: action.payload } };
    case userTypes.SET_EMAIL:
      return { ...state, userDetails: { ...state.userDetails, email: action.payload } };
    case userTypes.SET_PASSWORD:
      return { ...state, userDetails: { ...state.userDetails, password: action.payload } };
    case userTypes.LOGIN:
      return { ...state, isAuthenticated: true, error: null };
    case userTypes.LOGIN_ERROR:
      return { ...state, isAuthenticated: false, error: action.payload };
    case userTypes.REGISTER:
      return { ...state, isAuthenticated: true, error: null };
    case userTypes.REGISTER_ERROR:
      return { ...state, isAuthenticated: false, error: action.payload.message };
    case userTypes.LOGOUT:
      return { ...state, isAuthenticated: false, error: null };
    default:
      return state;
  }
};

export { initialState, userReducer };
