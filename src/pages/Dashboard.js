import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";
import TaskTodo from "../components/TaskTodo";
import CustomModal from "../components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../components/DeleteModal";
import Context from "../utils/Context";

const Dashboard = ({ data, loading, userId }) => {
  const [newItemModalIsOpen, setNewItemModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [chosenId, setChosenId] = useState(0);

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const openNewItemModal = () => {
    setNewItemModalIsOpen(true);
  };

  const closeNewItemModal = () => {
    setNewItemModalIsOpen(false);
  };

  const openDeleteModal = (id) => {
    setDeleteModalIsOpen(true);
    setChosenId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
  }, []);

  if (!user && loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboardItems">
      <div className="dashboardBlock">
        <div></div>
        <h2 className="dashboardHeading">Dashboard</h2>
        <div>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={openNewItemModal}
            className="modalOpenBtn"
          />
          <CustomModal
            isOpen={newItemModalIsOpen}
            onClose={closeNewItemModal}
            userId={userId}
          />
        </div>
      </div>
      <ul className="taskToDoList">
        {data
          .filter((item) => item?.userId === userId)
          .map((todo) => (
            <li key={todo.id} className="taskToDoItem">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => openDeleteModal(todo.id)}
                className="deleteBtn"
              />
              <Link to={`/todo/${todo.id}`} className="nameToDoItem">
                <TaskTodo name={todo.name} />
              </Link>
            </li>
          ))}
      </ul>
      <DeleteModal
        isOpen={deleteModalIsOpen}
        onClose={closeDeleteModal}
        id={chosenId}
      />
    </div>
  );
};

export default Dashboard;
