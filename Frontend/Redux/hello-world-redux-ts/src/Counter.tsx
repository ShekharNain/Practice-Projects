import * as React from "react";
import { render } from "react-dom";

const App = () => {
  const [count, setCount] = React.useState(0);
  // setCount(count + 1);
  // setCount(count + 1);
  // setCount(count + 1);

  // alert(count);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <br />
      {count}
    </div>
  );
};

render(<App />, document.getElementById("root"));
