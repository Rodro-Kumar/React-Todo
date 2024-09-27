import React, { useEffect, useState } from "react";
import serachIcon from "../assets/search.png";
import edit from "../assets/edit.png";
import delet from "../assets/delete.png";

const Todo = () => {
  const [underline, setunderline] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [editINput, seteditINput] = useState(false);
  const [updateValue, setupdateValue] = useState("");
  const [editItemId, seteditItemId] = useState();
  const [serachValue, setserachValue] = useState("");
  const [searchResult, setsearchResult] = useState();
  const [editInputPlaceHolder, seteditInputPlaceHolder] = useState();

  const [Task, setTask] = useState([]);

  // handleAddTask
  const HandleAddtask = () => {
    setTask(inputValue);
    if (!inputValue) {
      Task !== "" ? Task : setTask([]);
      alert("please enter your value");
    } else {
      const allData = { id: new Date().getTime().toString(), name: inputValue };

      // let store = [...Task, allData];
      setTask([...Task, allData]);
      setinputValue("");
    }
  };

  // handleInput
  const handleInput = (event) => {
    setinputValue(event.target.value);
  };

  // handleclearALl

  const handleclearALl = () => {
    setTask([]);
  };

  // HandleDelete
  const HandleDelete = (item) => {
    console.log(item);
    const updateTask = Task.filter((current) => current.name !== item);
    setTask(updateTask);
  };
  // HandleEdit

  const HandleEdit = (id) => {
    seteditItemId(id);
    seteditINput(true);
    let newEditItem = Task.find((item, index) => {
      return index === id;
    });
    seteditInputPlaceHolder(newEditItem.name);
  };

  const HdnaleEditModla = () => {
    let id = editItemId;
    if (editINput && updateValue) {
      setTask(
        Task.map((item, index) => {
          if (index === id) {
            return { ...item, name: updateValue };
          }
          return item;
        })
      );
      seteditINput(false);
    }
  };

  // handleSerach
  const handleSerach = (event) => {
    const { value } = event.target;

    if (Task && value) {
      setTask(
        Task.filter((item) => {
          item.name == value;
        })
      );
    }
  };

  // date * time
  let date = new Date();
  let [second, setsecond] = useState();
  let hour12 = date
    .toLocaleString("en-US", { hour: "numeric", hour12: true })
    .slice(3, 5);
  let hour = date.toLocaleTimeString().slice(0, 2);
  let minit = date.getMinutes();

  useEffect(() => {
    setInterval(() => {
      setsecond(new Date().getSeconds());
    }, [1000]);
  }, []);

  return (
    <>
      <div className="min-h-[100vh]">
        <div className="container">
          <div className="flex flex-col items-center justify-center h-[100vh]">
            <div className="w-[500px] bg-purple-600 shadow-2xl shadow-purple-800 p-11 rounded-lg flex flex-col items-center">
              <h1 className="font-poppins font-medium text-3xl text-white">
                Todo
              </h1>
              {/* date & time */}
              <div className="flex items-center gap-x-3 py-4">
                <h5 className="bg-yellow-400 text-black rounded-l-lg font-poppins py-1 px-3">
                  {date?.toLocaleDateString()}
                </h5>
                <h4 className="bg-green-600 rounded-r-lg text-white py-1 px-3 font-poppins">{`${
                  hour ? hour : "12"
                }:${minit ? minit : "00"}:${second ? second : "00"}:${
                  hour12 ? hour12 : "AM"
                }`}</h4>
              </div>
              {/* Add task */}
              <div className="flex items-center justify-center mt-2">
                <input
                  type="text"
                  placeholder="Add task"
                  onChange={handleInput}
                  value={inputValue}
                  className="py-2 px-4 bg-white text-black rounded-l-md font-poppins text-sm placeholder:text-sm placeholder:font-poppins"
                />
                <button
                  onClick={HandleAddtask}
                  className="h-full bg-yellow-400 text-black font-poppins font-medium text-base px-3 rounded-r-lg"
                >
                  Add
                </button>
              </div>
              {/* search filter */}
              <div className="flex items-center justify-center mt-2">
                <input
                  onChange={handleSerach}
                  type="text"
                  placeholder="search here"
                  className="py-2 px-4 bg-white text-black rounded-l-md font-poppins text-sm placeholder:text-sm placeholder:font-poppins"
                />
                <button className="h-full bg-sky-500 text-black font-poppins font-medium text-base px-3 rounded-r-lg hover:bg-sky-600 transition-all">
                  <img
                    src={serachIcon}
                    alt={serachIcon}
                    title="search here"
                    className="w-7"
                  />
                </button>
              </div>

              <div className="relative flex flex-col items-center gap-y-3 w-full mt-6">
                {/* List */}
                {Task.length > 0 &&
                  Task?.map((item, index) => (
                    <div
                      key={index}
                      className={`relative w-full py-2 px-3 font-poppins font-normal text-base text-sky-500 bg-white ${
                        underline ? "opacity-70" : "opacity-100"
                      }`}
                    >
                      <input
                        onClick={() => setunderline(!underline)}
                        type="checkbox"
                        className="absolute top-[50%] -translate-y-[50%] left-2"
                      />
                      <div className="ml-5 w-[300px]">
                        <h4
                          className={`text-ellipsis whitespace-nowrap overflow-hidden ${
                            underline ? "line-through" : "no-underline"
                          }`}
                        >
                          {item.name ? item.name : "no data"}
                        </h4>
                      </div>
                      <div className="flex items-center gap-x-2 absolute top-[50%] -translate-y-[50%] right-3 z-50">
                        <div
                          onClick={() => HandleEdit(index)}
                          className="w-6 cursor-pointer"
                        >
                          <img src={edit} alt={edit} title="Edit" />
                        </div>
                        <div
                          onClick={() => HandleDelete(item.name)}
                          className="w-6 cursor-pointer"
                        >
                          <img src={delet} alt={delet} title="Delete" />
                        </div>
                      </div>
                    </div>
                  ))}

                {editINput && (
                  <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
                    <div className="bg-yellow-400 flex flex-col items-center justify-center rounded-xl w-[200px] p-7 relative">
                      <div className="absolute top-0 right-5">
                        <span
                          onClick={() => seteditINput(false)}
                          className="cursor-pointer font-poppins font-bold text-red-900"
                        >
                          X
                        </span>
                      </div>
                      <input
                        onChange={(item) => setupdateValue(item.target.value)}
                        type="text"
                        placeholder={`${editInputPlaceHolder}`}
                        className="w-full py-3 px-4 bg-white"
                      />
                      <button
                        onClick={HdnaleEditModla}
                        className="bg-green-600 w-full text-white py-3 px-4 font-poppins text-base mt-2"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}

                {/* clear all */}

                <div>
                  <button
                    onClick={handleclearALl}
                    className="bg-red-600 text-white font-poppins font-normal text-base py-2 px-4 hover:bg-red-700 transition-all active:scale-95"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
