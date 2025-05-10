## React Interview


### What is React?

React is a JavaScript library developed by Facebook for building user interfaces, especially for single-page applications. It allows developers to create reusable UI components and manage the application state efficiently.

### What are the key features of React?

* Component-Based Architecture: UI is built using reusable components.

* Virtual DOM: Improves performance by minimizing real DOM manipulations.

* Unidirectional Data Flow: Data flows from parent to child components.

* Declarative UI: You describe what you want to see, and React handles the rendering.

  * You declare that "I want an `<h1>` element that says Hello and shows the name."
You’re not manually creating DOM elements or handling updates — React does that behind the scenes. 

    ```jsx
    function Greeting({ name }) {
      return <h1>Hello, {name}!</h1>;
    }
    ```

* JSX Syntax: Combines JavaScript and HTML/XML-like syntax.

* React Hooks (for functional components): Enable use of state and lifecycle methods.


### What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript used in React. It allows you to write HTML-like code inside JavaScript, which is then transpiled to React.createElement() calls.

### What are components in React?

Components are reusable, independent pieces of UI. They can be: Difference between functional and class components?

* Functional Components – simple functions that return JSX.
* Class Components – ES6 classes that extend React.Component and have lifecycle methods.

### Diff between ES6 and ES5 / ES6 (ECMAScript 2015) and ES5 (ECMAScript 2009)

1. Variable Declarations

```js
// ES5
var x = 10;

// ES6
let y = 20;
const z = 30;
```

2. Arrow Functions

```js
// ES5
var add = function(a, b) { return a + b; };

// ES6
const add = (a, b) => a + b;
```

3. Template Literals

```js
// ES5
var name = "John";
var greet = "Hello, " + name + "!";

// ES6
const greet = `Hello, ${name}!`;
```

4. Destructuring

```js
// ES5
var person = { name: "Alice", age: 25 };
var name = person.name;

// ES6
const { name, age } = person;
```

5. Classes

```js
// ES5
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hi, " + this.name;
};

```

6. Modules

```js
export const name = "App";
import { name } from './module.js';
```

7. Promises

```js
// ES6
fetch('/api')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Iterators

An iterator is any object that implements a .next() method which returns an object 

```js
const myIterable = {
  data: ['a', 'b', 'c'],
  index: 0,
  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      return { done: true };
    }
  }
};
```

### Generators Function

A generator is a special type of function that can pause and resume its execution using the function* syntax and the yield keyword

```js
function* generatorFunc() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const gen = generatorFunc();

console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: 'c', done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Why use Generators?
To create lazy sequences (generate data on-demand)

To pause/resume functions

Useful in asynchronous flows (especially before async/await)

Cleaner iterators without manual state tracking

## 5. Difference between Functional and Class Components

| Feature             | Functional Component                          | Class Component                      |
|---------------------|-----------------------------------------------|--------------------------------------|
| **Syntax**          | Function                                      | ES6 Class                            |
| **State**           | `useState` hook (since React 16.8)            | `this.state`                         |
| **Lifecycle Methods** | `useEffect` and other hooks                | `componentDidMount`, etc.           |
| **Simpler/Preferred** | Yes (modern React prefers hooks)            | Older approach                       |





### What is the virtual DOM and how does React use it?

The virtual DOM is an in-memory representation of the real DOM. When a component’s state or props change, React:

Updates the virtual DOM.

Compares it with the previous version (diffing).

Calculates the minimal set of changes.

Updates the real DOM efficiently.

### What are props in React?

Props (short for "properties") are read-only inputs to components. They allow data to be passed from parent to child components.

```js
<Greeting name="Alice" />
```

### What is state in React?

State is a built-in object that stores data that changes over time in a component. When the state changes, the component re-renders.

```js
const [count, setCount] = useState(0);
```

### 9. What is the difference between state and props?

| Feature     | Props                               | State                                           |
|-------------|--------------------------------------|--------------------------------------------------|
| **Mutability** | Immutable                        | Mutable (via `setState` or `useState`)         |
| **Ownership**  | Passed from parent               | Owned by the component itself                  |
| **Usage**      | Data input                       | Local data handling                            |



### How do you handle events in React?

Events in React are handled using camelCase syntax and passing functions:

```js
function handleClick() {
  alert('Button clicked');
}

<button onClick={handleClick}>Click me</button>
```

### What are hooks? Name a few commonly used hooks.

Hooks are functions that let you use React features (like state and lifecycle methods) in functional components.

Common hooks:

* useState – for state management

```js
const [data, setData] = useState(null);
```

* useEffect – for side effects (e.g., fetching data)

```js
useEffect(()=>{

},[dep]);
```

* useContext – to consume context

useContext is a React Hook that allows you to access context data (like global state) without having to pass props manually at every level.

When you have data (like theme, user info, or language) that needs to be accessible by many components deep in the component tree, passing props manually becomes messy. useContext solves that by letting you consume context directly.

Steps to Use useContext

* Create a context with React.createContext()

* Provide the context using a <Context.Provider>

* Consume the context using useContext(MyContext)

Real world Example

1. Create AuthContext 

```jsx
// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```
2. Consume AuthContext in a Navbar

```jsx
// Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () =>{

  const {user, logout} = useContext(AuthContext);
  return (
    <nav>
      <h1>MyApp</h1>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Please log in</span>
      )}
    </nav>
  );
}
export default Navbar;
```

3. Add Login Button in Another Component

```jsx
// LoginPage.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => login('JohnDoe')}>Login as JohnDoe</button>
    </div>
  );
};

export default LoginPage;
```

### What is the useEffect hook and how does it work?

useEffect lets you perform side effects in function components (like componentDidMount, componentDidUpdate, componentWillUnmount combined).

```js
useEffect(() => {
  // code runs on mount and/or when dependencies change
  fetchData();

  return () => {
    // cleanup code (optional, runs on unmount)
  };
}, [dependencies]);
```

## What is the difference between `useEffect` and lifecycle methods?

| Feature         | `useEffect`                              | `componentDidMount` / `componentDidUpdate`              |
|----------------|-------------------------------------------|---------------------------------------------------------|
| Component Type | Functional                                | Class                                                   |
| Execution Time | After render                              | After render                                            |
| Runs On        | Mount/update/unmount (based on deps)      | Mount or update                                         |
| Cleanup Support| Yes (return function)                     | `componentWillUnmount`                                  |


## How does React handle form inputs?

React typically uses controlled components where input values are tied to component state:

```jsx
const [name, setName] = useState('');

<input value={name} onChange={(e) => setName(e.target.value)} />
```

## What is lifting state up in React?

Lifting state up means moving shared state to the nearest common ancestor so that multiple child components can access and modify it via props.

In other word Lifting state up means putting shared data in a parent component so that multiple child components can use and change it by sending data through props.


Example: A Switch component that toggles a light on/off. A Bulb component that lights up based on the switch state.

They don’t know about each other, so we lift the isOn state up to a parent component.

   LightController (holds state)
      ├── Switch (toggles light)
      └── Bulb (displays light on/off)

```jsx
// Switch.js
function Switch({ isOn, toggle }) {
  return (
    <button onClick={toggle}>
      {isOn ? 'Turn Off' : 'Turn On'}
    </button>
  );
}

```

```jsx
// Bulb.js
function Bulb({ isOn }) {
  return (
    <div style={{
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: isOn ? 'yellow' : '#ccc',
      marginTop: '10px'
    }} />
  );
}
```

```jsx
// LightController.js
import { useState } from 'react';
import Switch from './Switch';
import Bulb from './Bulb';

export default function LightController() {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => setIsOn(prev => !prev);

  return (
    <div>
      <Switch isOn={isOn} toggle={toggleLight} />
      <Bulb isOn={isOn} />
    </div>
  );
}
```

## What are controlled and uncontrolled components?

| Feature     | Controlled                              | Uncontrolled               |
| ----------- | --------------------------------------- | -------------------------- |
| Data Source | React state                             | DOM (via refs)             |
| Updates     | Via `onChange` handlers                 | Direct DOM manipulation    |
| Example     | `<input value={name} onChange={...} />` | `<input ref={inputRef} />` |


## How do you optimize performance in a React app?

* Memoization: React.memo, useMemo, useCallback

* Code Splitting: React.lazy, Suspense

* Avoid Re-renders: Key usage, state lifting, component structure

* Virtualization: For large lists (react-window, react-virtualized)

  Virtualization (in React) is a performance optimization technique used when rendering large lists or tables. Instead of rendering all items at once, it only renders the items visible on the screen (plus a few extra), saving memory and improving speed.

  If you have 10,000 items, rendering all of them will slow down your app. But with virtualization, you only render maybe 30–40 at a time (what fits in the viewport), and as you scroll, new items are rendered and old ones are removed.

  Tool

  react-window: Lightweight and fast.

    ```jsx
    // App.js
    import React from 'react';
    import { FixedSizeList as List } from 'react-window';

    const Row = ({ index, style }) => (
      <div style={style}>Row {index}</div>
    );

    export default function App() {
      return (
        <List
          height={300}         // height of the container
          itemCount={1000}     // total items
          itemSize={35}        // height of each item
          width={300}          // width of the container
        >
          {Row}
        </List>
      );
    }
  ```
  What happens: Only the rows visible inside the 300px container are rendered. As you scroll, new rows appear, old ones are removed from the DOM.

  react-virtualized: More customizable and feature-rich (like tables, grids, etc.).

* Efficient State Management: Avoid deep prop drilling, use context or external libraries like Redux

## What are keys in React and why are they important in lists?

Keys are unique identifiers used in lists to help React track items between renders.

```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

Why important:

Helps React identify which items changed, were added, or removed.

Without keys, React may re-render unnecessarily or incorrectly.

## What is reconciliation in React?

Reconciliation is the process React uses to update the DOM efficiently when a component’s state or props change. React:

Builds a new virtual DOM.

Diffs it with the previous one.

Updates only the parts of the real DOM that actually changed.

## Explain React's diffing algorithm.

React’s diffing algorithm (used during reconciliation) works on these principles:

DOM elements of different types are replaced entirely (e.g., <div> vs <span>).

Elements of the same type are updated in-place.

Keys help identify elements in lists so React can track movement or updates.

It uses a heuristic O(n) algorithm (not O(n²)) for performance.

## What are React portals?

Portals allow rendering a component outside its parent DOM hierarchy.

React Portals allow you to render a component outside the main DOM hierarchy — like rendering a modal outside the root app element while keeping it connected to React’s state and events.

Render a modal, tooltip, or dropdown above all content

Avoid overflow: hidden or z-index issues

Keep component logic inside React, but render outside #root

## What is code splitting and how is it implemented in React?

Code splitting allows you to load only the code needed at a given time, improving performance and load speed.

```jsx
const MyComponent = React.lazy(() => import('./MyComponent'));

<React.Suspense fallback={<div>Loading...</div>}>
  <MyComponent />
</React.Suspense>
```

## What is memoization in React (React.memo, useMemo, useCallback)?

Memoization caches results to avoid unnecessary recalculations or re-renders:

React.memo(Component) – memoizes a whole component to prevent re-render unless props change.

useMemo(() => value, [deps]) – memoizes a calculated value.

useCallback(() => fn, [deps]) – memoizes a function reference.


## useCallback in React — When and Why to Use It

useCallback is a React Hook that memoizes a function, so it doesn't get re-created on every render — unless its dependencies change.

```jsx
const memoizedCallback = useCallback(() => {
  // your logic here
}, [dependencies]);
```

When to Use useCallback
Use useCallback when:

You pass functions as props to child components that are React.memo-ized.

Function recreations are causing unnecessary re-renders.

You're optimizing performance in large components or frequent renders.

⚠️ When NOT to Use
Don’t use it everywhere — unnecessary useCallback can make code slower and harder to read.

Use it only when function identity matters (e.g., dependency array or component memoization).

🧪 Example (Without useCallback causing re-renders)
jsx
Copy
Edit
const Parent = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <>
      <button onClick={increment}>Increment</button>
      <Child onClick={increment} />
    </>
  );
};

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});
Problem: Every render of Parent creates a new increment function → causes Child to re-render.

✅ Fix with useCallback
jsx
Copy
Edit
const increment = useCallback(() => setCount(c => c + 1), []);
Now increment keeps the same reference across renders (unless dependencies change), and Child doesn’t re-render unnecessarily.

| Feature         | `useEffect`                           | `useCallback`                             |
| --------------- | ------------------------------------- | ----------------------------------------- |
| Type            | Side-effect hook                      | Memoization hook                          |
| Runs on render? | Yes (after render)                    | No (only creates memoized function)       |
| Common Use      | Data fetching, subscriptions, DOM ops | Optimizing callbacks, avoiding re-renders |
| Output          | Nothing or cleanup function           | A memoized function                       |


## What is React Fiber?
React Fiber is the reimplementation of React’s core engine, enabling:

Incremental rendering (splitting work into units)

Prioritization of updates (e.g., input over animations)

Better error handling, suspense, and concurrent mode

## What are render props?

A render prop is a technique where a component accepts a function as a prop, which returns a React element.

Render Props is a pattern where a component accepts a function as a prop, and calls it to render UI, giving it access to internal state or logic.












### Create React App

```bash
npx create-react-app myapp

cd myapp

npm install
```
Adding TypeScript

```bash
npx create-react-app myapp --template typescript
```
----------
----------

### Npm vs npx

NPM is a package manager used to install, delete, and update Javascript packages on your machine. NPX is a package executer, and ***it is used to execute javascript packages directly, without installing them***

----------
----------

### How React Works

React basically maintains a tree. HTML code as a tree. In fact, that is exactly how the browser treats your DOM (your rendered HTML on the browser). ***React allows you to effectively re-construct your DOM in JavaScript** and push only those changes to the DOM which have actually occurred.

First load ```public/index.html```

```html
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
```

```src/index.js``` re-construct inside root div

```js 
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
Inside `App.js` all child component load based on routing urls

----------
----------



### How react load index.html file from public directory

All required files and folder already defined in file `node_modules/react-scripts/config/paths.js`

```js
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
```

----------
----------

### **Why do we need webpack?**

The motivations behind webpack is ***to gather all your dependencies**, which includes not just code, but other assets as well, and generate a dependency graph. Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled

----------
----------

### **But why Babel?**

it takes all the fancy javascript (react, newer ECMAScript features, typescript etc) and converts it to old school browser understandable javascript.

----------
----------

### **Virtual DOM**

The virtual DOM (VDOM) is a programming concept where an ideal, or **“virtual”, representation of a UI is kept in memory** and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation. ... They may also be considered a part of “virtual DOM” implementation in React.

The Virtual DOM's Reconciliation Algorithm compares the virtual DOM to the actual DOM and determines the minimal set of changes needed to bring them into alignment.

React uses a process called "reconciliation" to update the virtual DOM and actual DOM. When a component's state changes, React will compare the new virtual DOM with the previous virtual DOM, and it will determine the minimal set of changes needed to update the actual DOM

----------
----------


### **Introducing JSX - React**

JSX stands for JavaScript XML. **JSX allows us to write HTML in React**. JSX allows us to write HTML elements in JavaScript and place them in the DOM

JSX is a JavaScript Extension Syntax used in React to easily write HTML and JavaScript together.

``` js
const myelement = <h1>I Love JSX!</h1>;

ReactDOM.render(myelement, document.getElementById('root'));

```

### Why Keys Matter in React



### ESLint – Pluggable JavaScript linter

Before getting into ESlint first you should be aware of linting. It is the process of checking the code for any errors. A Linter is an automated tool that runs on a static piece of code to find any kind of discrepancy arising due to formatting or due to bad coding practices. Running a Linting tool over the source code helps to improve the quality and readability of the code.

ESLint: It is a JavaScript linting tool which is used for automatically detecting incorrect patterns found in ECMAScript/JavaScript code. It is used with the purpose of improving code quality, making code more consistent, and avoiding bugs. ESLint is written using Node.js to provide a fast runtime environment and easy installation via npm.
The “ES” in ESLint stands for “EcmaScript”, which was created to standardize Javascript.

### Introduction to Tailwind CSS




### NPM is a package manager used to install, delete, and update Javascript packages on your machine. NPX is a package executer, and it is used to execute javascript packages directly, without installing them


https://react.dev/reference/react/cloneElement

### **What is component-driven development and why to use it**

Making reusable components and useing it multiple places

### **React Hooks**

Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.

* The React <b>useState</b> Hook allows us to track state in a function component.State generally refers to data or properties that need to be tracking in an application.

```js
import { useState } from "react";
const [color, setColor] = useState("");
```

* The <b>useEffect</b> Hook allows you to perform side effects in your components.Some examples of side effects are: fetching data, directly updating the DOM, and timers.

```js
  useEffect(<function>, <dependency>)
```
```js
  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);
```
Effect Cleanup: Some effects require cleanup to reduce memory leaks.

```js
  useEffect(() => {
    let timer = setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);

  return () => clearTimeout(timer)
  }, []);
  ```


* React <b>Context</b> is a way to manage state globally.It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.State should be held by the highest parent component in the stack that requires access to the state.To illustrate, we have many nested components. The component at the top and bottom of the stack need access to the state.To do this without Context, we will need to pass the state as "props" through each nested component. This is called <b>prop drilling</b>.

```js
import { useState, createContext } from "react";
const UserContext = createContext()

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}

import { useState, createContext, useContext } from "react";
function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```


* The <b>useRef</b> Hook allows you to persist values between renders.
<b>Does Not Cause Re-renders</b>

```js
import { useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

It can be used to store a mutable value that does not cause a re-render when updated.
It can be used to access a DOM element directly.

* The <b>useReducer</b> Hook returns the current state and a dispatch method.useReducer is a React Hook that lets you add a reducer to your component.The dispatch function returned by useReducer lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the dispatch function:

```js
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```



* The <b>useCallback</b> Hook only runs when one of its dependencies update.The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.One reason to use useCallback is to prevent a component from re-rendering unless its props have changed.
https://www.w3schools.com/react/react_usecallback.asp


*The React <b>useMemo</b> Hook returns a memoized value.Think of memoization as caching a value so that it does not need to be recalculated.The useMemo Hook only runs when one of its dependencies update.



### **React Custom Hooks**
Hooks are reusable functions.

When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook

### **What are the differences between call() and put() in redux-saga?**

`call()` is a blocking effect, which means that the saga will wait for promise resolving before moving on to the next step.

`put()`, on the other hand, is a non-blocking effect, which means that the saga can continue to the next step and action will be dispatched within internal scheduler.

### **Redux - Store**

A store is a state container which holds the application’s state. Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer.

### **What Is Redux-Saga**

Redux-Saga basically is a middleware for your Redux

### **Asynchronous in computer programming**

In computer programming, asynchronous operation means that a process operates independently of other processes, whereas synchronous operation means that the process runs only as a result of some other process being completed or handed off



### **ReactJS - Component Life Cycle**

* **componentWillMount:** componentWillMount is executed before rendering, on both the server and the client side.

* **componentDidMount:** componentDidMount is <u>executed after the first render only</u> on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. We are using it to update the state so we can trigger the other lifecycle methods.

* **componentWillReceiveProps:** componentWillReceiveProps is <u>invoked as soon as the props are updated before another render is called</u>. We triggered it from setNewNumber when we updated the state.

* **shouldComponentUpdate:** shouldComponentUpdate should return true or false value. This will determine if the component will be updated or not. This is set to true by default. If you are sure that the component doesn't need to render after state or props are updated, you can return false value.

* **componentWillUpdate:** componentWillUpdate is called just before rendering.

* **componentDidUpdate:** componentDidUpdate is called just after rendering.

* **componentWillUnmount**: componentWillUnmount is called after the component is unmounted from the dom. We are unmounting our component in main.js.

### **Unsafe legacy lifecycle methods**

In React v16.3, <u>componentWillMount()</u>, <u>componentWillReceiveProps()</u>, and <u>componentWillUpdate()</u> are marked as unsafe legacy lifecycle methods for deprecation process.

They have often been misused and may cause more problems with the upcoming async rendering. As safer alternatives for those methods, <u>getSnapshotBeforeUpdate()</u> and <u>getDerivedStateFromProps()</u> were newly added.

The full list of the unsafe legacy lifecycle methods is as follows:

* componentWillMount()
* UNSAFE_componentWillMount()
* componentWillReceiveProps()
* UNSAFE_componentWillReceiveProps()
* componentWillUpdate()
* UNSAFE_componentWillUpdate()


### **Comparison between ES5 and ES6**

ES6 is a major enhancement in the JavaScript language that allows us to write programs for complex applications.

An arrow function is a new feature introduced in ES6 by which we don't require the function keyword to define the function.
It has a higher performance than ES5.

### **Arrow Function**

We have a one-line function. It gets shorter! 

``` js
function sum(a,b){
    return a+b;
}
```

``` js
const sum = (a,b) => a+b;
```

### **Setup React without create-react-app**

```
mkdir my-app
cd my-app
npm init
mkdir src
cd src
touch index.html

```

Add this content in index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```
```
touch index.js
```

```js

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World</h1>,
  document.getElementById('root')
);

```

``` 
npm install react react-dom 

```

Install webpack
```
npm install webpack webpack-cli webpack-dev-server --save-dev

```

```
touch webpack.config.js

```

```js

const path = require('path');
module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
}

```

### **Error Boundaries**

A JavaScript error in a part of the UI shouldn’t break the whole app. To solve this problem for React users, React 16 introduces a new concept of an “error boundary”.

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed

```js

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

```

```js

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

```
