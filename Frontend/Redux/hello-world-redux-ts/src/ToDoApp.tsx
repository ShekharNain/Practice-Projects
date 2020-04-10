import { createStore } from "redux";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ToDoReducer } from "./todoReducer";

const store = createStore(ToDoReducer);
store.dispatch({ type: "" });

// const addHandler = (event: Event) => {

// }
const App = () => {
  const todoList = store.getState();
  const [todoVal, setTodoVal] = React.useState("");
  return (
    <div>
      <input
        type="text"
        onChange={event => {
          setTodoVal(event.target.value);
        }}
        value={todoVal}
      />
      <button
        onClick={() => {
          store.dispatch({
            type: "TODO_ADD",
            id: todoList.length,
            value: todoVal
          });
          setTodoVal("");
        }}
      >
        Add
      </button>
      <ul>
        {todoList.map(item => (
          <li
            key={item.id}
            onClick={() => store.dispatch({ type: "TODO_TOGGLE", id: item.id })}
          >
            {item.completed ? `RM:${item.value}` : item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

function render(): void {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
store.subscribe(render);
