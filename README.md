# glowstone
[![npm](https://img.shields.io/npm/v/glowstone.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/glowstone.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/mpt0/node-glowstone.svg?style=flat-square)]()

Easily persist json objects!

## Installation
```bash
npm install glowstone
```

## Usage
```js
const glowstone = require('glowstone');
```

### Loading objects
```js
const obj = await glowstone('example.json', {
	// Default options:
	watch: true,
	encoding: 'utf8',
	defaultValue: {},
	parse: JSON.parse,
	stringify: JSON.stringify,
	rejectOnParseError: true
});
```
+ watch `<Boolean>` - True to write the object to disk when it has been changed.
+ encoding `<String>` - The encoding for reading &amp; writing serialized data.
+ defaultValue `<Object>` - The object to use when the file could not be read.
+ parse `<Function>` - The function to parse json data from disk.
+ stringify `<Function>` - The function to stringify the object when writing to disk.
+ rejectOnParseError `<Boolean>` - True to reject when an error occurs while loading json data from disk.

### Saving objects
If watch was set to `true` the object will write itself to disk if something changes.
```js
obj.message = 'Hello World!';
```

If watch was set to `false` or you have to wait until the object is written you can use the `write` function:
```js
await glowstone(obj).write();
```

### Error handling
For each write error, an `error` event will be emitted.
```js
glowstone(obj).on('error', err => {
	console.error(err);
});
```
