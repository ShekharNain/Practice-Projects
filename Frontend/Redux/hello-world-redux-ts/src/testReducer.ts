import { Action, Reducer } from "redux";

interface ITestObj {
  obj: {
    value: string;
  }
}

const DEFAULT_STATE: ITestObj= {
  obj: {
    value: "Initial"
  }
};

export const TestReducer: Reducer<ITestObj, Action<String>> = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case "GET_VAL": 
    case "SET_VAL": return {
      ...state
    }
    default: return state;
  }
}