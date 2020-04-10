import { createStore, Action } from "redux";

function counter(state = 0, action: Action<string>) {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    default:
      return state;
  }
}

// redux store
const store = createStore(counter);
const element = document.getElementById("root");

const render = () => {
  element.innerText = store.getState().toString();
};

// render the initial state
render();

// dispatch the redux events on body click
document.addEventListener("click", () => {
  store.dispatch({ type: "DEC" });
});

// subscribe to the event dispatched to store
store.subscribe(render);

// const myStore = {
//   let state;
//   getState() {

//   }
// }

// const myCreateStore = (reducer: any) => {
//   let state;
//   const listeners = [];
//   const myStore = {
//     getState() {
//       return state;
//     }

//     dispatch(action) {
//       state = reducer(action, state);
//       listeners.forEach(listener => listener())
//     }

//     subscribe(listener) {
//       listeners.push(listener);
//       // To unsubscribe the listeners
//       return () => {
//         listeners = listeners.filter(i => i != listener)
//       }
//     }
//   }
//   return myStore;
// }
