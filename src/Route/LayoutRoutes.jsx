import React from "react";
import { Route, Routes } from "react-router-dom";
import { Wardenroutes, routes, studentRoutes } from "./Routes";
import AppLayout from "../Layout/Layout";
import { Fragment } from "react";

const LayoutRoutes = () => {
  const [userType, setUserType] = React.useState();
  const [userRoles, setUserRoles] = React.useState();

  React.useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    setUserRoles(localStorage.getItem("roles"));
  }, []);

  return (
    <>
      <Routes>
        {userType === "admin"
          ? routes.map(({ path, Component }, i) => (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route exact path={path} element={Component} />
                </Route>
              </Fragment>
            ))
          : ""}
        {/* // : userType === "employee"
          // ? Wardenroutes.map(({ path, Component }, i) => (
          //     <Fragment key={i}>
          //       <Route element={<AppLayout />} key={i}>
          //         <Route exact path={path} element={Component} />
          //       </Route>
          //     </Fragment>
          //   ))
          // : studentRoutes.map(({ path, Component }, i) => (
          //     <Fragment key={i}>
          //       <Route element={<AppLayout />} key={i}>
          //         <Route exact path={path} element={Component} />
          //       </Route>
          //     </Fragment>
          //   ))} */}
      </Routes>
    </>
  );
};

export default LayoutRoutes;
