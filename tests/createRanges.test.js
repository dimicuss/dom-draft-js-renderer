const createTypesSet = require('../es/createTypesSet').default;
const createRanges = require('../es/createRanges').default;


describe('createRanges testing', () => {
	test('Empty typesSet', ()  => {
		expect(createRanges([])).toEqual([]);
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
		const expectation = [
			{
				type: 'entities:0',
				start: 0,
				end: 18,
				ranges: [
					{
						type: 'decorators:BR',
						start: 0,
						end: 18,
						ranges: [
							{
								type: 'styles:UNDERLINE',
								start: 0,
								end: 18,
								ranges: [
									{
										type: 'simple',
										start: 0,
										end: 18,
										ranges: []
									}
								]
							}
						]
					}
				]
			}
		];
		
		expect(createRanges(createTypesSet(block, [decoratorRange]))).toStrictEqual(expectation);
	});
});