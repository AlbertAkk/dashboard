import "./App.css";
import Todo from "./pages/Todo";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import { useEffect, useState } from "react";

import { auth, db } from "./firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { ContextProvider } from "./utils/Context";
import NotFound from "./pages/NotFound";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [localStorageData, setLocalStorageData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
          const todosData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(todosData);
        });

        setLoading(false);
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUserId(user?.uid);
          setUser(user?.email.split("@")[0]);
        });
        setLocalStorageData(localStorage.getItem("userId"));
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <ContextProvider value={{ user, setUser }}>
        <Wrapper>
          <Routes>
            <Route
              path="/"
              element={
                localStorageData || !loading ? (
                  <Dashboard data={data} loading={loading} userId={userId} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/todo/:id"
              element={
                localStorageData || !loading ? (
                  <Todo data={data} loading={loading} />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      </ContextProvider>
    </Router>
  );
};

export default App;
