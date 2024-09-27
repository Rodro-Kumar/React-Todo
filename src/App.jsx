import Login from "./Component/Login";
import { Route, Routes } from "react-router-dom";
import Todo from "./Component/Todo";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="todo" element={<Todo />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
