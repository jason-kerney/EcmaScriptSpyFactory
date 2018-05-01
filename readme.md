# spyFacory

**What?**

A spy factory creates service fakes within node, that enforce the call contract on methods.

**Why?**

When testing complicated interactions, sometimes we are stuck testing the interactions between services. The spy factory builds these mock objects.

**Note**

_Touch Integration_ is the idea that a fake should uphold the contract the original object held. This way if the object undertest is changed such that it now violates that contract, tests will fail and not production.

Spy facory uses <a href='https://www.npmjs.com/package/stubcontractor'>stubcontractor</a> to ensure touch intigration.

**Note**

This library works really well with <a href='https://www.npmjs.com/package/approval-result-factory'>approval-result-factory</a>

---

## Initialization

Spy Factory needs to be initialized with a stubcontractor that is configured for your project.

```JavaScript
const stubcontractor = require('./stubcontractorConfig');
const spyFactory = require('spyfactory')(stubcontractor);
```

---

## Basic Usage

```JavaScript
const fakeObject = spyFactory(
                'myModule',
                [
                    'add'
                ]
            );
```

This finds a file called 'myModule'. In that file it locates a function called 'add'. It then creates an object that enforces the contract of add.

Add also has a <a href='https://www.npmjs.com/package/sinon'>sinon</a> spy to the add method.

this spy can be retrieved by:

```JavaScript
const spy = fakeObject.add.getOnCallAction();
```

Last item of note is the fake object has a property called '__name'. This is by default set to the name given in the first parameter. In this case, 'myModule'.

---

## Adding an action to be performed

```JavaScript
const fakeObject = spyFactory(
                'myModule',
                [
                    ['add', function (a, b) { return a + b; }]
                ]
            );
```

If an array is given instead of a string, the second parameter is a function which will be called each time the method is called.

It is simular to:
```JavaScript
const fakeObject = {
    add: sinon.spy(function (a, b) { return a + b; })
};
```

Except that it will also do touch intigration.

---

## Not spying on a method

```JavaScript
const fakeObject = spyFactory(
                'myModule',
                [
                    ['add', (a, b) => a + b, false]
                ]
            );
```

If you do not want to spy on a function, you can add a third item to the the array. If this item is the boolean ```false``` then the function will be faked but without a spy attached. It will however still inforce touch intigration.

---

## Call a callback

Spy factory, comes with a nice helper. If your methods conform to the convention that the callback is the last function **and** the function has the following signature:

```(error, data) => undefined```

Then spy factory has a tool that will help ensure that the callback is called.

```JavaScript
const fakeObject = spyFactory(
                'myModule',
                [
                    ['asyncAdd', spyFactory.callCallback(null, 4)],
                    ['asyncSubtract', spyFactory.callCallback()]
                ]
            );
```

This creates a function that looks something like this:

```JavaScript
function callbackCaller(...args) {
    const callback = args.pop();
    callback(givenError, givenData);
}
```

Where 'givenError' and 'givenData' are the parameters passed to 'callCallback'.