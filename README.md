## React Interview

### **Why do we need webpack?**

The motivations behind webpack is to gather all your dependencies, which includes not just code, but other assets as well, and generate a dependency graph. Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled

### **But why Babel?**

it takes all the fancy javascript (react, newer ECMAScript features, typescript etc) and converts it to old school browser understandable javascript.

### **Virtual DOM**

The virtual DOM (VDOM) is a programming concept where an ideal, or **“virtual”, representation of a UI is kept in memory** and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation. ... They may also be considered a part of “virtual DOM” implementation in React.

### **Introducing JSX - React**

JSX stands for JavaScript XML. **JSX allows us to write HTML in React**. JSX allows us to write HTML elements in JavaScript and place them in the DOM

JSX is a JavaScript Extension Syntax used in React to easily write HTML and JavaScript together.

``` js
const myelement = <h1>I Love JSX!</h1>;

ReactDOM.render(myelement, document.getElementById('root'));

```

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
