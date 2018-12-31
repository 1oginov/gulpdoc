# gulpdoc

[![NpmVersion](https://img.shields.io/npm/v/gulpdoc.svg)](https://www.npmjs.com/package/gulpdoc)
[![dependencies Status](https://david-dm.org/loginov-rocks/gulpdoc/status.svg)](https://david-dm.org/loginov-rocks/gulpdoc)
[![devDependencies Status](https://david-dm.org/loginov-rocks/gulpdoc/dev-status.svg)](https://david-dm.org/loginov-rocks/gulpdoc?type=dev)

Documentation generator for Gulp tasks.

## Quick start

### Install

Locally to use in code:

```sh
npm install gulpdoc
```

Or globally to use in shell:

```sh
npm install -g gulpdoc
```

### Use

For example your javascript files containing Gulp tasks are located in the `./gulp/` directory relative to the current.

Annotate Gulp tasks with `@gulptask` (case insensitive) and place descriptions like this:

```js
/**
 * Gulp task described in block comment before the annotation.
 * @gulptask example:block
 */
gulp.task('example:block', function() {
  // Insanely useful actions.
});
```

```js
// @gulptask example:line Gulp task described in line comment on the annotation line.
gulp.task('example:line', function() {
  // Insanely useful actions.
});
```

#### Сode

```js
const gulpdoc = require('gulpdoc');
const tasks = gulpdoc.getTasks('./gulp/*.js');
console.log(tasks);
// Outputs:
// [ Task { name: 'example:block', description: 'Gulp task described in block comment before the annotation.' },
//   Task { name: 'example:line', description: 'Gulp task described in line comment on the annotation line.' } ]
```

#### Shell

```sh
gulpdoc ./gulp/*.js
```

or

```sh
gulpdoc -s ./gulp/*.js -d ./gulpdoc.md -a gulptask
```

Where `-s` is source, `-d` is destination and `-a` is annotation. 

It'll make following `gulpdoc.md`:

> * `gulp example:block` - Gulp task described in block comment before the annotation.
> * `gulp example:line` - Gulp task described in line comment on the annotation line.

## API

### `Gulpdoc`

Gulpdoc class.

**Kind**: global class

* [Gulpdoc](#gulpdoc-1)
  * [getTasks(pattern, [annotation], [options]) ⇒ Array.&lt;Task&gt;](#gettaskspattern-annotation-options--arraytask)

---

#### `getTasks(pattern, [annotation], [options])` ⇒ `Array.<Task>`

Get tasks.

**Kind**: static method of `Gulpdoc`

**Returns**: `Array.<Task>`, where `Task` object contains `name` and `description` properties

| Parameter    | Type     | Default      | Description  |
| ------------ | -------- | ------------ | ------------ |
| pattern      | `string` |              | Glob pattern |
| [annotation] | `string` | `'gulptask'` | Annotation   |
| [options]    | `Object` | `{}`         | Glob options |
