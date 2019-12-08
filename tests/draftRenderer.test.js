const draftRenderer = require('../es').default;
const renderMap  = require('./mocks/renderMap').default;
const rawContentState  = require('./mocks/rawContentState').default;



describe('Draft renderer root function', () => {
	test('Empty block', () => {
		console.log(draftRenderer(rawContentState, renderMap))
	})
});