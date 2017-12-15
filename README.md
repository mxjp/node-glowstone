# glowstone
[![npm](https://img.shields.io/npm/v/glowstone.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/glowstone.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/mpt0/glowstone.svg?style=flat-square)]()

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
	defaultValue: {}
});
```

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
