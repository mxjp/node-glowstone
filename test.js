'use strict';

const path = require('path');
const test = require('ava');
const tmp = require('tmp');
const fs = require('fs-extra');
const glowstone = require('.');

async function tmpdir(callback) {
	const dirname = await new Promise((resolve, reject) => {
		tmp.dir((err, dirname) => {
			if (err) {
				reject(err);
			} else {
				resolve(dirname);
			}
		});
	});
	try {
		await callback(dirname);
	} finally {
		await fs.remove(dirname);
	}
}

test('Write manually', t => tmpdir(async dirname => {
	const filename = path.join(dirname, 'test.json');

	const obj = await glowstone(filename, {watch: false});
	obj.name = 'Glowstone dust!';
	await glowstone(obj).write();

	t.is((await glowstone(filename)).name, 'Glowstone dust!');
}));

test('Watch', t => tmpdir(async dirname => {
	const filename = path.join(dirname, 'test.json');

	const obj = await glowstone(filename);
	obj.name = 'Glowstone dust!';
	obj.nested = {};
	await new Promise(resolve => setTimeout(resolve, 100));
	t.is((await glowstone(filename)).name, 'Glowstone dust!');

	obj.nested.value = 42;
	await new Promise(resolve => setTimeout(resolve, 100));
	t.is((await glowstone(filename)).nested.value, 42);

	delete obj.nested;
	await new Promise(resolve => setTimeout(resolve, 100));
	t.false('nested' in (await glowstone(filename)));
}));

test('Custom serialization', t => tmpdir(async dirname => {
	const filename = path.join(dirname, 'test.json');
	const options = {
		stringify: obj => obj.value,
		parse: value => ({value})
	};

	const obj = await glowstone(filename, options);
	obj.value = 'text';
	await glowstone(obj).write();
	t.is(await fs.readFile(filename, 'utf8'), 'text');
	t.is((await glowstone(filename, options)).value, 'text');
}));
