import { React, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import { classes } from "../Data/Layouts";
import RedirectionPage from "../Auth/redirecting";

// setup fake backend

const Routers = () => {
  const login = useState(JSON.parse(localStorage.getItem("login")))[0];
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState();
  const [userId, setUserId] = useState();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    let abortController = new AbortController();
    let i = 0;
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    setUserType(localStorage.getItem("userType"));
    setUserId(localStorage.getItem("userId"));

    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter basename={"/lms"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={`/${userType}/${userId}/`} element={<PrivateRoute />}>
            {login || authenticated ? (
              <>
                <Route
                  exact
                  path={``}
                  element={<Navigate to={`/${userType}/${userId}/dashboard`} />}
                />
                <Route
                  exact
                  path={`/${userType}/${userId}/`}
                  element={<Navigate to={`${userType}/${userId}/dashboard`} />}
                />
              </>
            ) : (
              ""
            )}
            <Route
              path={`/${userType}/${userId}/*`}
              element={<LayoutRoutes />}
            />
          </Route>
          <Route
            exact
            path={`/users/:userId/campus/:campus_name/branchId/:branchId`}
            element={<RedirectionPage />}
          />
          <Route exact path="/login/student" element={<Signin />} />
          {/* <Route exact path={`/login`} element={<Signin />} /> */}
          {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i++} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
