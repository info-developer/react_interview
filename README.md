## React Interview

### Why do we need webpack?

The motivations behind webpack is to gather all your dependencies, which includes not just code, but other assets as well, and generate a dependency graph. Bundlers are only prepared to handle JS files, so webpack needs to preprocess all the other files and assets before they get bundled

### But why Babel?

it takes all the fancy javascript (react, newer ECMAScript features, typescript etc) and converts it to old school browser understandable javascript.

### Virtual DOM

The virtual DOM (VDOM) is a programming concept where an ideal, or **“virtual”, representation of a UI is kept in memory** and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation. ... They may also be considered a part of “virtual DOM” implementation in React.