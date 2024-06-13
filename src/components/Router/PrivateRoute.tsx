import {  Navigate, Outlet } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import Footer from "../Footer/Footer";
export const PrivateRoute = () => {
  let auth = { token: true };
  return (
    <div>
      {!auth.token ? (
        <Navigate to="/login" />
      ) : (
        <div className="justify-between flex flex-col ">
          <NavBar />
          <Outlet/>
          <Footer />
        </div>
      )}
    </div>
  );
};
