import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./counter/counter";
import reportWebVitals from "./reportWebVitals";
import RxjsPokemon from "./rxjs-pokemon/rxjs-pokemon";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RxjsPokemon /> */}
    <Counter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
