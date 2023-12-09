## JAVASCRIPT

### TypeScript - Interfaces (set of rules)

An interface ***defines the syntax that any entity must adhere to***. Interfaces define properties, methods, and events, which are the members of the interface. Interfaces contain only the declaration of the members. It is the responsibility of the deriving class to define the members. It often helps in providing a standard structure that the deriving classes would follow

```js

interface User { 
   firstName:string, 
   lastName:string, 
}

const saveData((user:User)=>{
  ///
})

```

---------
---------

### Var, Let, and Const – What's the Difference?

One of the features that came ***with ES6 is the addition of let and const***, which can be used for variable declaration

Scope of var

var declarations are ***globally scoped or function/locally scoped***

The scope is global when a var variable is ***declared outside a function***. This means that any variable that is declared with var outside a function block is ***available for use in the whole window***.

var is function scoped when it is declared within a function. This means that it is available and can be accessed only within that function



```js

var greeter = "hey hi";
    
function newFunction() {
      var hello = "hello";
}
console.log(hello); // error: hello is not defined

```

***var variables can be re-declared and updated***

```js
  var greeter = "hey hi";
  var greeter = "say Hello instead";

  ----------------------------------

  var greeter = "hey hi";
  greeter = "say Hello instead";

```

***Hoisting of var***

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution

```js
  console.log (greeter);
  var greeter = "say hello"
```
it is interpreted as this

```js
  var greeter;
  console.log(greeter); // greeter is undefined
  greeter = "say hello"
```

***let is block scoped***

A block is a chunk of code bounded by {}. A block lives in curly braces. Anything within curly braces is a block.

So a variable declared in a block with let  is only available for use within that block

```js

  let times = 4;
  if (times > 3) {
        let hello = "say Hello instead";
        console.log(hello);// "say Hello instead"
    }
  console.log(hello) // hello is not defined

```

while it will work with var

```js
  let times = 4;
  if (times > 3) {
      var hello = "say Hello instead";
      console.log(hello);// "say Hello instead"
  }
  console.log(hello) // say Hello instead
  
```
***let can be updated but not re-declared***

``` js
  let greeting = "say Hi";
  greeting = "say Hello instead";

  let greeting = "say Hi";
  let greeting = "say Hello instead"; // error: Identifier 'greeting' has already
```

However, if the same variable is defined in different scopes, there will be no error:

```js
  let greeting = "say Hi";
  if (true) {
      let greeting = "say Hello instead";
      console.log(greeting); // "say Hello instead"
  }
  console.log(greeting); // "say Hi"
```

***Const***

const declarations are block scoped

const cannot be updated or re-declared

This behavior is somehow ***different when it comes to objects declared with const***. While a const object cannot be updated, the properties of this objects can be updated. Therefore, if we declare a const object as this:

```js
  const greeting = {
    message: "say Hi",
    times: 4
  }

  greeting = {
    words: "Hello",
    number: "five"
  } // error:  Assignment to constant variable.

```

we can do this

```js
  reeting.message = "say Hello instead";
```

* var declarations are globally scoped or function scoped while let and const are block scoped.
* var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared.
* They are all hoisted to the top of their scope. But while var variables are initialized with undefined, let and const variables are not initialized.
* While var and let can be declared without being initialized, const must be initialized during declaration.

### TypeScript Type

