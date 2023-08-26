import React, { useState, useRef, useEffect } from "react";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import NotFound from "./NotFound";

const Todo = ({ data, loading }) => {
  const { id } = useParams();
  const selectedToDo = data.find((todo) => todo.id === Number(id));

  const [listToDo, setListToDo] = useState(selectedToDo?.data);
  const [inputText, setInputText] = useState("");

  const buttonRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (data.length > 0 && !loading) {
      setListToDo(selectedToDo?.data);
    }
  }, [data, loading, selectedToDo?.data]);

  const handleCheckboxChange = async (e, id) => {
    try {
      const documentRef = doc(db, "todos", "" + selectedToDo.id);
      const documentSnapshot = await getDoc(documentRef);
      const documentData = documentSnapshot.data();

      const updatedArray = documentData.data.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      );

      await updateDoc(documentRef, { data: updatedArray });
    } catch (error) {
      console.error("Error updating field inside object:", error);
    }
  };

  const handleClickAdd = async (e) => {
    if (inputText !== "") {
      try {
        setInputText("");

        const newItem = { id: Date.now(), content: inputText, done: false };

        const documentRef = doc(db, "todos", "" + selectedToDo.id);
        const documentSnapshot = await getDoc(documentRef);
        const currentArray = documentSnapshot.data().data || [];
        const updatedArray = [...currentArray, newItem];

        await updateDoc(documentRef, { data: updatedArray });
      } catch (error) {
        console.error("Error adding new object to array:", error);
        setInputText("");
      }
    }
  };

  const handleClickRemove = async (e, id) => {
    try {
      const changedList = listToDo.filter((item) => item.id !== id);

      const documentRef = doc(db, "todos", "" + selectedToDo.id);

      await updateDoc(documentRef, { data: changedList });
    } catch (error) {
      console.error("Error removing object:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (selectedToDo?.userId !== localStorage.getItem("userId")) {
    return <NotFound />;
  }

  return (
    <div className="todoData">
      <h2 className="todoName">{selectedToDo?.name}</h2>
      <div className="todoBlock">
        <div className="todoWrapper">
          <div>
            <ul className="listToDos">
              {listToDo?.map((item) => (
                <div className="itemToDoWrapper" key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                  />
                  <li className="itemTodo">
                    <p
                      className={
                        item.done === false ? "notDoneItem" : "doneItem"
                      }
                    >
                      {item.content}
                    </p>
                  </li>
                  <button
                    className="removeToDo"
                    onClick={(e) => handleClickRemove(e, item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="addItemWrapper">
          <input
            type="text"
            id="todo-input"
            value={inputText}
            className="todoInput"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button ref={buttonRef} className="addBtn" onClick={handleClickAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
