## React Interview

### Why do we need webpack?

The motivations behind webpack is to gather all your dependencies, which includes not just code, but other assets as well, and generate a dependency graph. Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled

### But why Babel?

it takes all the fancy javascript (react, newer ECMAScript features, typescript etc) and converts it to old school browser understandable javascript.

### Virtual DOM

The virtual DOM (VDOM) is a programming concept where an ideal, or **“virtual”, representation of a UI is kept in memory** and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation. ... They may also be considered a part of “virtual DOM” implementation in React.

### Introducing JSX - React

JSX stands for JavaScript XML. **JSX allows us to write HTML in React**. JSX allows us to write HTML elements in JavaScript and place them in the DOM

JSX is a JavaScript Extension Syntax used in React to easily write HTML and JavaScript together.

``` js
const myelement = <h1>I Love JSX!</h1>;

ReactDOM.render(myelement, document.getElementById('root'));

```

### ReactJS - Component Life Cycle

* **componentWillMount:** componentWillMount is executed before rendering, on both the server and the client side.

* **componentDidMount:** componentDidMount is <u>executed after the first render only</u> on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. We are using it to update the state so we can trigger the other lifecycle methods.

* **componentWillReceiveProps:** componentWillReceiveProps is <u>invoked as soon as the props are updated before another render is called</u>. We triggered it from setNewNumber when we updated the state.

* **shouldComponentUpdate:** shouldComponentUpdate should return true or false value. This will determine if the component will be updated or not. This is set to true by default. If you are sure that the component doesn't need to render after state or props are updated, you can return false value.

* **componentWillUpdate:** componentWillUpdate is called just before rendering.

* **componentDidUpdate:** componentDidUpdate is called just after rendering.

* **componentWillUnmount**: componentWillUnmount is called after the component is unmounted from the dom. We are unmounting our component in main.js.

### Comparison between ES5 and ES6

ES6 is a major enhancement in the JavaScript language that allows us to write programs for complex applications.

An arrow function is a new feature introduced in ES6 by which we don't require the function keyword to define the function.
It has a higher performance than ES5.

### Arrow Function

We have a one-line function. It gets shorter! 

``` js
function sum(a,b){
    return a+b;
}
```

``` js
const sum = (a,b) => a+b;
```