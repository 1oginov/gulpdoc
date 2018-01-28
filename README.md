# gulpdoc

[![dependencies Status](https://david-dm.org/1oginov/gulpdoc/status.svg)](https://david-dm.org/1oginov/gulpdoc)
[![devDependencies Status](https://david-dm.org/1oginov/gulpdoc/dev-status.svg)](https://david-dm.org/1oginov/gulpdoc?type=dev)

Documentation generator for Gulp tasks.

## Quick Start

Install package:

```sh
npm install gulpdoc
```

Use in code:

```js
const gulpdoc = require('gulpdoc');
const tasks = gulpdoc.getTasks('./gulp/*.js');
// `tasks` is an array of Task objects containing `name` and `description` properties.
```
