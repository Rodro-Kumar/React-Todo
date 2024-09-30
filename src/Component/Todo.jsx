import React, { useEffect, useState } from "react";
import serachIcon from "../assets/search.png";
import edit from "../assets/edit.png";
import delet from "../assets/delete.png";

const Todo = () => {
  const [underline, setunderline] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [editINput, seteditINput] = useState(false);
  const [updateValue, setupdateValue] = useState("");
  const [editItemId, seteditItemId] = useState();
  const [searchValue, setsearchValue] = useState("");
  const [editInputPlaceHolder, seteditInputPlaceHolder] = useState();
  const [Task, setTask] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Task));
  }, [Task]);

  // handleAddTask
  const HandleAddtask = (event) => {
    event.preventDefault();
    if (!inputValue) {
      alert("Please enter your value");
    } else if (inputValue) {
      setTask(inputValue);
      const allData = { id: new Date().getTime().toString(), name: inputValue };
      setTask([...Task, allData]);
      setinputValue("");
    } else {
      alert("something wrong");
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
    const updateTask = Task?.filter((current) => current.name !== item);
    setTask(updateTask);
  };
  // HandleEdit

  const HandleEdit = (id) => {
    seteditItemId(id);
    seteditINput(true);
    let newEditItem = Task?.find((item, index) => {
      return index === id;
    });
    seteditInputPlaceHolder(newEditItem.name);
  };

  const HdnaleEditModla = (event) => {
    event.preventDefault();
    let id = editItemId;
    if (editINput && updateValue) {
      setTask(
        Task?.map((item, index) => {
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
    setsearchValue(event.target.value);
  };

  const filteredTodos = Task?.filter((todo) =>
    todo.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // date * time
  let date = new Date();

  return (
    <>
      <div className="min-h-[100vh]">
        <div className="container">
          <form action="#" onSubmit={HandleAddtask}>
            <div className="flex flex-col items-center justify-center h-[100vh]">
              <div className="w-[600px] bg-[#87A2FF] shadow-2xl shadow-[#87a1ffe3] p-11 rounded-lg flex flex-col items-center">
                <h1 className="font-poppins font-medium text-3xl text-white">
                  Todo Application
                </h1>
                {/* date & time */}
                <div className="flex items-center gap-x-3 py-4">
                  <h5 className="bg-yellow-400 text-black rounded-l-lg font-poppins py-1 px-3">
                    {date?.toLocaleDateString()}
                  </h5>
                  <h4 className="bg-green-600 rounded-r-lg text-white py-1 px-3 font-poppins">{`${date?.toLocaleTimeString()}
                `}</h4>
                </div>
                {/* Add task */}
                <div className="flex w-full items-center justify-center mt-2">
                  <input
                    type="text"
                    placeholder="Add task"
                    onChange={handleInput}
                    value={inputValue}
                    className="py-2 px-4 bg-white w-full text-black rounded-l-md font-poppins text-sm placeholder:text-sm placeholder:font-poppins"
                  />
                  <button
                    type="submit"
                    className="h-full bg-yellow-400 text-black font-poppins font-medium text-base px-3 rounded-r-lg"
                  >
                    Add
                  </button>
                </div>
                {/* search filter */}
                <div className="flex items-center w-full justify-center mt-2">
                  <input
                    onChange={handleSerach}
                    type="text"
                    placeholder="search here"
                    className="py-2 px-4 bg-white w-full text-black rounded-l-md font-poppins text-sm placeholder:text-sm placeholder:font-poppins"
                  />
                  <button className="h-full bg-sky-500 text-black font-poppins font-medium text-base px-4 rounded-r-lg hover:bg-sky-600 transition-all">
                    <img
                      src={serachIcon}
                      alt={serachIcon}
                      title="search here"
                      className="w-7"
                    />
                  </button>
                </div>

                <div className="listbox relative h-[350px] flex flex-col items-center gap-y-3 w-full mt-6">
                  {/* List */}
                  {filteredTodos.length > 0 ? (
                    filteredTodos?.map((item, index) => (
                      <div
                        key={index}
                        className={`relative w-full py-2 px-3 font-poppins font-normal text-base text-sky-500 bg-white ${
                          underline === index ? "opacity-70" : "opacity-100"
                        }`}
                      >
                        <input
                          onClick={() => setunderline(index)}
                          type="checkbox"
                          className="absolute top-[50%] -translate-y-[50%] left-2"
                        />
                        <div className="ml-5 w-[300px]">
                          <h4
                            className={`text-ellipsis whitespace-nowrap overflow-hidden ${
                              underline === index && "line-through"
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
                    ))
                  ) : (
                    <div className=" text-white font-poppins text-2xl mt-11">
                      <h1>No data here!</h1>
                    </div>
                  )}
                </div>
                {/* clear all */}
                {Task.length > 0 && (
                  <div className="pt-3">
                    <button
                      onClick={handleclearALl}
                      className="bg-red-600 text-white font-poppins font-normal text-base py-2 px-4 hover:bg-red-700 transition-all active:scale-95"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
          {editINput && (
            <form action="#" onSubmit={HdnaleEditModla}>
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
                    type="submit"
                    className="bg-green-600 w-full text-white py-3 px-4 font-poppins text-base mt-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
