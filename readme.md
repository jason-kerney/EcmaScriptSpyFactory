# spyFacory

**What?**

A spy factory creates service fakes within node, that enforce the call contract on methods.

**Why?**

When testing complicated interactions, sometimes we are stuck testing the interactions between services. The spy factory builds these mock objects.

**Note**
_Touch Integration_ is the idea that a fake should uphold the contract the original object held. This way if the object undertest is changed such that it now violates that contract, tests will fail and not production.

Spy facory uses <a href='https://www.npmjs.com/package/stubcontractor'>stubcontractor</a> to ensure touch intigration.

---

## Initialization

Spy Factory needs to be initialized with a stubcontractor that is configured for your project.

```JavaScript
const stubcontractor = require('./stubcontractorConfig');
const spyFactory = require('spyfactory')(stubcontractor);
```