const createTypesSet = require('../es/createTypesSet').default;
const createTypeRanges = require('../es/createTypeRanges').default;


describe('createTypeRanges testing', () => {
	test('Empty typesSet', ()  => {
		expect(createTypeRanges([])).toEqual([]);
	});
	
	test('Fully decorated text', () => {
		const text = 'Test test test test';
		
		const baseRange = {
			offset: 0,
			length: text.length,
		};
		
		const baseRenderedRange = {
			start: 0,
			end: text.length - 1,
		};
		
		const block = {
			text,
			inlineStyleRanges: [{ style: 'UNDERLINE', ...baseRange }],
			entityRanges: [{ key: 0, ...baseRange }],
		};
		
		const decoratorRange = { decorator: 'BR', ...baseRange };
		const expectation = [
			{
				...baseRenderedRange,
				type: 'entities:0',
				ranges: [
					{
						...baseRenderedRange,
						type: 'decorators:BR',
						ranges: [
							{
								...baseRenderedRange,
								type: 'styles:UNDERLINE',
								ranges: [
									{
										...baseRenderedRange,
										type: 'simple',
										ranges: []
									}
								]
							}
						]
					}
				]
			}
		];
		
		expect(createTypeRanges(createTypesSet(block, [decoratorRange]))).toStrictEqual(expectation);
	});
});