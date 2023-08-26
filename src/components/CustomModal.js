import React, { useRef, useState } from "react";
import Modal from "react-modal";
import "../assets/style.css";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, userId }) => {
  const buttonRef = useRef();

  const dataObj = {
    id: 0,
    data: [],
    name: "",
    userId: "",
  };

  const [data, setData] = useState(dataObj);

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      id: Date.now(),
      name: e.target.value,
      userId: userId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.name !== "") {
      onClose();
      try {
        const { id } = data;
        const docRef = await setDoc(doc(db, "todos", "" + id), data);
        setData(dataObj);
        onClose();
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClose();
      buttonRef.current.click();
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
          top: "80px",
          right: "50px",
          left: "auto",
          border: "none",
          color: '#f2f2f2',
          background: "#332d2d",
          overflow: "auto",
          borderRadius: "4px",
          outline: "none",
          maxWidth: "300px",
          width: "100%",
          height: "150px",
          padding: "10px",
        },
      }}
    >
      <div className="modalWrapper">
        <form onSubmit={handleSubmit} className="modalContent">
          <div className="modalClose">
            <div></div>
            <p className="modalHeadline">Add an Item</p>
            <button onClick={onClose} className="modalClBtn">
              X
            </button>
          </div>
          <div className="modalInputWrapper">
            <input
              type="text"
              className="modalInput"
              name="content"
              value={data.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="moadlAddWrapper">
            <button ref={buttonRef} type="submit" className="modalAdd">
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomModal;
