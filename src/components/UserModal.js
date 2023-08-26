import React, { useContext } from "react";
import Modal from "react-modal";
import "../assets/style.css";

import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Context from "../utils/Context";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const UserModal = ({ isOpen, onClose }) => {
  const {setUser} = useContext(Context);
  const navigate = useNavigate();
  const handleClickSignOut = async () => {
    try {
      await signOut(auth);
      setUser("");
      localStorage.removeItem('userId');
      onClose();
      navigate('/login')
    } catch (error) {
      onClose();
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0)",
        },
        content: {
          position: "absolute",
          top: "50px",
          right: "10px",
          left: "auto",
          border: "none",
          background: "#281c1c",
          overflow: "auto",
          borderRadius: "4px",
          outline: "none",
          maxWidth: "100px",
          width: "100%",
          height: "30px",
          padding: "10px",
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <div className="userMenu">
        <button onClick={handleClickSignOut} className="signout">
          Sign Out
        </button>
      </div>
    </Modal>
  );
};

export default UserModal;
