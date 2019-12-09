const draftRenderer = require('../es').default;
const { input, output, renderMap } = require('./mocks/draftRendererTestMock').default;



describe('Draft renderer root function', () => {
	test('', () => {
		expect(draftRenderer(input, renderMap)).toStrictEqual(output);
	})
});