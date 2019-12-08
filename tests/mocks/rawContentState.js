export default {
	blocks: [
		{
			type: 'unstyled',
			text: 'Some text sdasdas asdasda sdas dasd as',
			inlineStyleRanges: [
				{ offset: 0, length: 20, style: 'UNDERLINE' },
				{ offset: 5, length: 10, style: 'BOLD' },
			],
			entityRanges: [
				{ offset: 5, length: 10, key: 0 },
			]
		},
	],
	entityMap: {
		0: { type: 'LINK', data: { url: 'https://playground.ru' } },
	},
}