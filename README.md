## React Interview

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
