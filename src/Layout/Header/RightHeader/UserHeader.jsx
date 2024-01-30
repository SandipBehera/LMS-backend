import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
import man from "../../../assets/images/dashboard/profile.png";

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../../Constant";
import { WebApi } from "../../../api";

const styles = {
  initialsContainer: {
    width: "40px", // Adjust the width as needed
    height: "40px", // Adjust the height as needed
    background:
      "linear-gradient(103.75deg, #33b1ee -13.9%, var(--theme-default) 79.68%)", // Set the background color as needed
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "34%",
    color: "#fff", // Set the text color as needed
  },

  initials: {
    fontSize: "16px", // Adjust the font size as needed
    fontWeight: "bold",
    color: "#fff", // Set the text color as needed
  },
};
const UserHeader = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState(localStorage.getItem("Name"));
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const userId = localStorage.getItem("userId");
  const campusName = localStorage.getItem("campusName");
  // const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    setName(localStorage.getItem("Name") ? localStorage.getItem("Name") : name);
  }, []);

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

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };
  const getInitials = (name) => {
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        {/* <Image
          attrImage={{
            className: "b-r-10 m-0",
            // src: `${authenticated ? auth0_profile.picture : profile}`,
            src: `${profile}`,
            alt: "",
          }}
        /> */}
        <div style={styles.initialsContainer}>
          <span style={styles.initials}>{getInitials(name)}</span>
        </div>
        {/* <div className="media-body">
          <span>{authenticated ? name : ""}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {name} <i className="middle fa fa-angle-down"></i>
          </P>
        </div> */}
      </div>
      <UL
        attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}
      >
        <LI
          attrLI={{
            onClick: () =>
              UserMenuRedirect(`/${userType}/${userId}/my-profile`),
          }}
        >
          <User />
          <span>{Account} </span>
        </LI>

        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>GO TO MAIN DAHSBOARD</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
