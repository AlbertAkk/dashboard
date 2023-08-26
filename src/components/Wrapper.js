import React, { useContext } from "react";
import Header from "./Header";
import "../App.css";
import Context from "../utils/Context";

const Wrapper = ({ children }) => {
  const { user } = useContext(Context);

  return (
    <div>
      {user ? <Header user={user} /> : <></>}
      <main className="App">{children}</main>
    </div>
  );
};

export default Wrapper;
