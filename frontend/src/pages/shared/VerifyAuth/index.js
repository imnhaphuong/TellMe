import { Navigate } from "react-router-dom";


export const RequireAuth = ({ children }) => {
  return localStorage.getItem('0_glb') ? children : <Navigate to="/signin" replace={true} /> ;
};

export const NotRequireAuth = ({ children }) => {
  return !localStorage.getItem('0_glb') ? children : <Navigate to="/" replace={true} /> ;
};
