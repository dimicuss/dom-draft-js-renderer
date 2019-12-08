const times  = require('lodash/times');
const createTypesSet = require('../es/createTypesSet').default;


describe('createTypesSet() testing', () => {
	test('Empty text block', () => {
		const block = {};
		expect(createTypesSet(block)).toStrictEqual([]);
	});
	
	
	test('Fully decorated text', () => {
		const text = 'Test test test test';
		
		const baseRange = {
			offset: 0,
			length: text.length,
		};
		
		const block = {
			text,
			inlineStyleRanges: [{ style: 'UNDERLINE', ...baseRange }],
			entityRanges: [{ key: 0, ...baseRange }],
		};
		
		const decoratorRange = { decorator: 'BR', ...baseRange };
		
		expect(createTypesSet(block, [decoratorRange])).toStrictEqual(
			times(text.length, () => [ 'entities:0', 'decorators:BR', 'styles:UNDERLINE', 'simple' ])
		);
	})
});
