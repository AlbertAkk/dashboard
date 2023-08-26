import React from "react";
import Modal from "react-modal";
import "../assets/style.css";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onClose, id }) => {
  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "todos", "" + id);
      deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    onClose();
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#332d2d",
          color: '#f2f2f2',
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
      <div className="modalDeleteWrapper">
        <div className="deleteQuestionWrapper">
          <p className="deleteQuestion">Delete the item?</p>
        </div>
        <div className="deleteBtnsWrapper">
          <button onClick={onClose} className="cancelDelete">
            Cancel
          </button>
          <button onClick={deleteItem} className="confirmDelete">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
