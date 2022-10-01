import { useState } from "react";

const defaultCount: number = 0;

const UseCounter = () => {
  const [count, setCount] = useState<number>(defaultCount);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };
  const reset = () => {
    setCount(defaultCount);
  };

  return { count, increment, decrement, reset };
};

export default UseCounter;
