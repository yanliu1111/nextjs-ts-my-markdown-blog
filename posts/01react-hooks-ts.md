---
title: Learning notes about React Hooks with TypeScript"
subtitle: "useState, useEffect, useCallback, useMemo, useRef"
date: "2023-03-16"
---

# Notes would cover

- **useState**: Declare a new state variable, which we'll call "count"

  ```javascript
  const [count, setCount] = useState(0);
  ```

- **useEffect**:

  ```javascript
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  ```

- **useCallback**: Returns a memoized callback.<br>
  Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

  ```js
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);
  ```

- **useMemo**: Returns a memoized value.<br>
  Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.<br>
  Remember that the function passed to useMemo runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in useEffect, not useMemo.<br >
  If no array is provided, a new value will be computed on every render.

  ```js
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

- **useRef**: Returns a mutable ref object whose `.current` property is initialized to the passed argument `(initialValue)`. The returned object will persist for the full lifetime of the component.<br>
  Note that useRef() does not notify you when its content changes. Mutating the .current property does not cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a callback ref instead.

  ```js
  const refContainer = useRef(initialValue);
  ```

  A common use case is to access a child imperatively:

  ```js
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```

## 🧪 Code examples

```typescript
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from "react";
interface User {
  id: number;
  username: string;
}
type fibonacciFunc = (n: number) => number;
const fibonacci: fibonacciFunc = (n) => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); //recursive function
};
const myNumber: number = 10; //type annotation, not type inference

const App = () => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  //useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
  //we definitly want to say it's an HTML input element becasue that what we are going to reference, but we could use a non-null assertion operator to say that we know it's not null 'null!'
  // but I use other way
  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  useEffect(() => {
    console.log("mounting");
    console.log("Users: ", users);
    return () => console.log("unmounting");
  }, [users]);
  //it would call this use effect into action when the users state changes, run once when the component mounts and run once when the component unmounts
  const addTwo = useCallback(
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => setCount((prev) => prev + 2),
    []
  );

  const result = useMemo<number>(() => fibonacci(myNumber), [myNumber]);
  //void means it doesn't return anything
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}>Increment</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" />
    </div>
  );
};

export default App;
```

## 📚 References

Learn from [here](https://www.youtube.com/watch?v=gieEQFIfgYc&list=PL_xv9JamRVA1d7xCkcS5fg8k3fZ1wAImK)

[⬆️ Back to top](#notes-would-cover)

<!-- [⬆️ Notes Would Cover](#notes-would-cover)

[⬆️ Code Examples](#-code-examples)

[⬆️ References](#-references)

[⬆️ Back to top](#react-hooks-with-typescript) -->
