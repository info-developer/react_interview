# JAVASCRIPT

## ✅ What is Hoisting in JavaScript?

Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (either function or global scope) before code execution.

In simple terms: You can use variables and functions before they’re declared in the code — but with some rules.

Hoisting in JavaScript is a behavior where variable and function declarations are moved to the top of their scope before code execution. It allows variables and functions to be used before they are declared in the code. However, only declarations are hoisted, not initializations or assignments. 


♻️ For var declarations, the variable is <u>hoisted and initialized with undefined</u>. If the variable is used before it is assigned a value, it will return undefined.

    ```js
    console.log(x); // Output: undefined
    var x = 5;
    ```


♻️ For let and const declarations, <u>the variables are hoisted but not initialized.</u> If the variable is used before it is assigned a value, it will result in a ReferenceError.

  ```js
  console.log(y); // Output: ReferenceError: Cannot access 'y' before initialization
  let y = 10;
  ```

♻️ Function declarations are fully hoisted, meaning both the declaration and the definition are moved to the top. This allows functions to be called before they are defined in the code. 

  ```js
  myFunction(); // Output: "Hello"
  function myFunction() {
    console.log("Hello");
  }
  ```

♻️ Function expressions (especially with const or let) are not hoisted like declarations.

  ```js
  sayHello(); // TypeError: sayHello is not a function
  const sayHello = function () {
    console.log("Hello!");
  };
  ```


## ✅ Primitive vs Non-Primitive Data Types in JavaScript

### ♻️ Primitive Data Types
These are immutable (cannot be changed) and hold single values. They are stored by value, meaning a copy of the value is assigned.

Characteristics:

* Immutable (can't change the actual value).

* Compared by value.

* Stored directly in the variable.

  ```js
  let a = 5;
  let b = a;
  b = 10;
  console.log(a); // 5 (not affected)
  ```

### ♻️ Non-Primitive (Reference) Data Types
These are mutable and hold collections or complex data. They are stored by reference, meaning variables store the memory address, not the actual value.

Characteristics:

* Mutable (can change the value).

* Compared by reference.

* Copied by reference.

  ```js
  let obj1 = { name: 'Alice' };
  let obj2 = obj1;
  obj2.name = 'Bob';
  console.log(obj1.name); // 'Bob' (same reference)
  ```

## What is a Closure in JavaScript?
A closure is a function that:
* Remembers variables from the scope in which it was created,
* Even after that outer scope has finished execution.

A closure is created every time a function is defined — it captures variables from the surrounding scope so it can use them later, even after the outer function exits.

  ```js
  function outer() {
    let count = 0;

    return function inner() {
      count++;
      console.log(count);
    };
  }

  const counter = outer();

  counter(); // 1
  counter(); // 2

  ```

  ```js
  function secretNumber() {
  let secret = 42;

    return {
      getSecret: () => secret,
      setSecret: (newSecret) => { secret = newSecret; }
    };
  }

  const mySecret = secretNumber();
  console.log(mySecret.getSecret()); // 42
  mySecret.setSecret(100);
  console.log(mySecret.getSecret()); // 100
```







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

---------
---------

### TypeScript Type

![Alt text](assets/typescript-types.png?raw=true "Title")

* ***Static Types***

  static types mean ***"at compile time" or "without running a program."*** In a statically typed language, variables, parameters, and objects have types that the compiler knows at compile time. ***The compiler used this information to perform the type checking***

  * ***Built-in or Primitive Type***

    * Number

      ```js
        let first: number = 12.0;             // number   
        let second: number = 0x37CF;          // hexadecimal  
        let third: number = 0o377 ;           // octal  
        let fourth: number = 0b111001;        // binary   
      ```

    * String

      ```js
        let identifier: string = " ";  
                Or   
        let identifier: string = ' '; 

        let empName: string = "Rohan"; 
      ```

    * Boolean

      ```js
        let isDone: boolean = false;  
      ```

    * Void

      A void is a return type of the functions which do not return any type of value. ***It is used where no data type is available.*** A variable of type void is not useful because we can only assign undefined or null to them. An undefined data type denotes uninitialized variable, whereas null represents a variable whose value is undefined.

      ```js
      let unusable: void = undefined; 
      ```

    * Null

      Null represents a variable whose value is undefined. Much like the void, it is not extremely useful on its own. The Null accepts the only one value, which is null. The Null keyword is used to define the Null type in TypeScript, but it is not useful because we can only assign a null value to it.

      ```js
      let num: number = null;  
      let bool: boolean = null;   
      let str: string = null; 
      ```

    * Any Type

      It is the "super type" of all data type in TypeScript. It is used to represents any JavaScript value.

      ```js
      let num: number:any = null;  
      let bool: any = true;   
      let str: any = "Hii"; 
      ```

  * User-Defined DataType

  ![Alt text](assets/user-defined.png?raw=true "Title")

    * Array

      ```js
      var list : number[] = [1, 3, 5];

      var list : string[] = ['1', '3', '5'];  
      ```

    * Touple

      The Tuple is a data type which ***includes two sets of values of different data types.*** It allows us to express an array where the type of a fixed number of elements is known, but they are not the same.

      ```js
        // Declare a tuple  
        let a: [string, number]; 

        // Initialize it  
        a = ["hi", 8, "how", 5]; // OK 
      ```

    * Interface

      An Interface is a structure which acts as a contract in our application

      ```js
        interface User { 
          firstName:string, 
          lastName:string, 
        }

        const saveData = ((user:User):any=>{
          console.log(user)
        })

        saveData({firstName: 'hello',lastName: 'hello'})
      ```



    * Class

      Classes are used to create reusable components and ***acts as a template*** for creating objects. It is a logical entity which ***store variables and functions to perform operations.*** TypeScript gets support for classes from ES6. It is different from the interface which has an implementation inside it, whereas an interface does not have any implementation inside it.

      ```js
        class User {

          name: string;
          age: string;
          gender:string;

          constructor(name:string, age:string, gender:string){
            this.name = name;
            this.age = age;
            this.gender = gender;
          }

          getInfo(){
            console.log(this.name)
          }

        }

        var user = new User('Abc', '18', 'Male');

        user.getInfo();
      ```

    * Enums

      Enums define a set of named constant. TypeScript provides both string-based and numeric-based enums

      ```js
      enum PrintMedia {
        Newspaper = 1,
        Newsletter,
        Magazine,
        Book
      };

      function getMedia(mediaName: string): PrintMedia {
          if (  mediaName === 'Forbes' || mediaName === 'Outlook') {
              return PrintMedia.Magazine;
          }
          return PrintMedia.Newspaper
      }

      let mediaType: PrintMedia = getMedia('Forbes1'); // returns Magazine

      console.log(mediaType)


      ```

* Generic

  Generic is used to create a component which can work with a variety of data type rather than a single one. TypeScript uses generics with the type variable <T> that denotes types.

    ```js
    function identity<T>(arg:T){
      return arg
    }

    var str = identity<string>("hii");

    var num = identity<number>(1);
    ```

* Decorators

  Types of decorators

  * Class decorator

    When you attach a function to a class as a decorator, you’ll receive the class constructor as the first parameter.

    ```js
    const classDecorator = (target: Function) => {
	    // do something with your class
    }

    @classDecorator
    class Rocket {}
    
    ```

    If you want to override the properties within the class, you can return a new class that extends its constructor and set the properties.

    ```js
    const addFuelToRocket = (target: Function) => {
	    return class extends target {
		    fuel = 100
	    }
    }

    @addFuelToRocket
    class Rocket {}

    ```

    Now your Rocket class will have a fuel property with a default value of 100.

    ```js
    const rocket = new Rocket()
    console.log(rocket.fuel) // 100
    ```

    https://rahmanfadhil.com/typescript-decorators/

----------
----------

### Arrow Functions vs Regular Functions

Arrow functions was ***introduced in ES6.*** And it introduced a simple and shorter way to create functions

```js

// REGULAR FUNCTION

function multiply(num1, num2) {
  const result = num1 * num2
  return result
}

//ARROW FUNCTION

const multiply = ((num1, num2) => {
  return num1 * num2;
})
//OR

const multiply = ((num1, num2)=>num1*num2);
```

* No arguments object in arrow functions
  A normal function has an arguments object which you can access in the function
  ```js
    //
    function print() {
      console.log(arguments)
    }
    print(1); // OUTPUT: [Arguments] { '0': 1 }

    -----------------------------------------------

    const print = () => {
      console.log(arguments)
    }

    print("hello", 400, false)
    // Uncaught ReferenceError: arguments is not defined

  ```

* Arrow functions do not create their own this binding

  In normal functions, a this variable is created which references the objects that call them

  ```js
  const obj  = {
    name:"abc",
    age:12,
    print:function(){
      console.log(this)
    }
  }

   obj.print(); // { name: 'abc', age: 12, print: [Function: print] }

   // IN ARROW FUNCTION

    const obj  = {
      name:"abc",
      age:12,
      print: ()=>{
        console.log(this)
      }
    }
  
    obj.print(); // {}

  ```

* Arrow functions cannot be used as constructors

* Arrow functions cannot be accessed before initialization








