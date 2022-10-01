import { FC } from "react";
import UseCounter from "./use-counter";

const Counter: FC = () => {
  const { count, increment, decrement, reset } = UseCounter();

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </>
  );
};

export default Counter;
