import { Action, Reducer } from "redux";

interface IToDoItem {
  id: number;
  value: string;
  completed: boolean;
}

interface IToDoAction extends Action<String> {
  id: number;
  value: string;
}

// interface IAppState {
//   todoList: IToDoItem[];
// }

const DAFAULT_STATE: IToDoItem[] = [];

export const ToDoReducer: Reducer<IToDoItem[], Action<String>> = (
  state = DAFAULT_STATE,
  action: IToDoAction
) => {
  switch (action.type) {
    case "TODO_ADD":
      return [
        ...state,
        {
          id: action.id,
          value: action.value,
          completed: false
        }
      ];
    case "TODO_TOGGLE":
      return [
        ...state.slice(0, action.id),
        {
          id: action.id,
          value: state[action.id].value,
          completed: !state[action.id].completed
        },
        ...state.slice(action.id + 1)
      ];
    default:
      return state;
  }
};
