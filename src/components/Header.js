import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/style.css";
import UserModal from "./UserModal";
import Context from "../utils/Context";

const Header = () => {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const {user} = useContext(Context);

  const openUserModal = () => {
    setUserModalIsOpen(true);
  };

  const closeUserModal = () => {
    setUserModalIsOpen(false);
  };

  return (
    <div className="header">
      <div>
        <Link to={"/"} className="dashboard">
          Dashboard
        </Link>
      </div>
      <div>
        <span className="dashboradUsername">{user}</span>
        <FontAwesomeIcon
          icon={faUser}
          onClick={openUserModal}
          className="userBtn"
        />
        <UserModal isOpen={userModalIsOpen} onClose={closeUserModal} />
      </div>
    </div>
  );
};

export default Header;
