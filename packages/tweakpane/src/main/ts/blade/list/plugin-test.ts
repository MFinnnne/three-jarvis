import {
	BladeController,
	createBladeController,
	createDefaultPluginPool,
	View,
} from '../../../../core/index';
import {PluginPool} from '../../../../core/index';
import * as assert from 'assert';
import {describe, it} from 'mocha';

import {
	createEmptyBladeController,
	createEmptyLabelableController,
	createLabelController,
	createTestWindow,
} from '../../misc/test-util';
import {ListBladeParams, ListBladePlugin} from './plugin';

function createPluginPool(): PluginPool {
	const pool = createDefaultPluginPool();
	pool.register(ListBladePlugin);
	return pool as any;
}

describe(ListBladePlugin.id, () => {
	[
		{},
		{
			view: 'list',
		},
		{
			value: 123,
			view: 'list',
		},
		{
			options: {foo: 1},
			view: 'list',
		},
		{
			value: 123,
			options: 'invalid',
			view: 'list',
		},
	].forEach((params) => {
		context(`when ${JSON.stringify(params)}`, () => {
			it('should not create API', () => {
				const doc = createTestWindow().document;
				const api = createBladeController(ListBladePlugin, {
					document: doc,
					params: params,
				});
				assert.strictEqual(api, null);
			});
		});
	});

	[
		{
			value: 0,
			options: [],
			view: 'list',
		},
	].forEach((params) => {
		context(`when ${JSON.stringify(params)}`, () => {
			it('should create API', () => {
				const doc = createTestWindow().document;
				const api = createBladeController(ListBladePlugin, {
					document: doc,
					params: params,
				});
				assert.notStrictEqual(api, null);
			});
		});
	});

	[
		(doc: Document) => createEmptyBladeController(doc),
		(doc: Document) =>
			createLabelController(doc, createEmptyLabelableController(doc)),
	].forEach((createController) => {
		it('should not create API', () => {
			const doc = createTestWindow().document;
			const c = createController(doc);
			//TODO: fix this test
			const api = ListBladePlugin.api({
				controller: c as any,
				pool: createPluginPool() as any,
			});
			assert.strictEqual(api, null);
		});
	});

	it('should apply initial params', () => {
		const doc = createTestWindow().document;
		const bc = createBladeController(ListBladePlugin, {
			document: doc,
			params: {
				label: 'hello',
				options: {
					foo: 1,
					bar: 2,
				},
				value: 123,
				view: 'list',
			} as ListBladeParams<number>,
		}) as BladeController<View>;
		const pool = createPluginPool();
		//TODO: fix this test
		const api = pool.createBladeApi(bc as any) as any;

		assert.strictEqual(api.value, 123);
		assert.deepStrictEqual(api.options[0], {text: 'foo', value: 1});
		assert.deepStrictEqual(api.options[1], {text: 'bar', value: 2});
		assert.strictEqual(
			api.controller_.view.element.querySelector('.tp-lblv_l')?.textContent,
			'hello',
		);
	});
});
