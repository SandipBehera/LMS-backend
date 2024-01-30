import React, { useContext, useState } from "react";
import SvgIcon from "../../../Components/Common/Component/SvgIcon";
import CustomizerContext from "../../../_helper/Customizer";
import { Button } from "reactstrap";
import { WebApi } from "../../../api";

const MoonLight = () => {
  const { addMixBackgroundLayout } = useContext(CustomizerContext);
  const [moonlight, setMoonlight] = useState(false);
  const userId = localStorage.getItem("userId");
  const MoonlightToggle = (light) => {
    if (light) {
      addMixBackgroundLayout("light-only");
      document.body.className = "light-only";
      setMoonlight(!light);
    } else {
      addMixBackgroundLayout("dark-only");
      document.body.className = "dark-only";
      setMoonlight(!light);
    }
  };
  const Logout = async () => {
    const loggedOut = await fetch(`${WebApi}/logout/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
      },
    });
    const data = await loggedOut.json();
    if (data) {
      localStorage.removeItem("profileURL");
      localStorage.removeItem("token");
      localStorage.removeItem("auth0_profile");
      localStorage.removeItem("Name");
      localStorage.setItem("authenticated", false);
      localStorage.setItem("login", false);
      localStorage.removeItem("roles");
      window.location.href = "http://13.58.144.48/admin/dashboard";
    }
  };

  return (
    <li>
      <div className={`mode ${moonlight && "active"}`} onClick={() => Logout()}>
        <Button color="primary">
          <SvgIcon icon="moon" />
          GO TO MAIN DASHBOARD
        </Button>
      </div>
    </li>
  );
};

export default MoonLight;
