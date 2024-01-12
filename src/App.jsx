import React, { useReducer, useRef } from "react";
import "./App.css";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: Date.now(), text: action.payload, isHidden: false },
      ];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isHidden: !task.isHidden }
          : task
      );
    default:
      return state;
  }
};

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const inputRef = useRef(null);

  const addTask = () => {
    const taskText = inputRef.current.value;
    if (taskText) {
      dispatch({ type: "ADD_TASK", payload: taskText });
      inputRef.current.value = "";
    }
  };

  const scrollToInput = () => {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <input type="text" ref={inputRef} placeholder="Enter task" />
      <button onClick={addTask}>Add Task</button>

      <button onClick={scrollToInput}>Scroll to Input</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isHidden ? "Task Hidden" : task.text}
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_TASK", payload: task.id })
              }
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
