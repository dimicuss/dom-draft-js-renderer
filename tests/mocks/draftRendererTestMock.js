export default {
	input: {
		blocks: [
			{
				type: 'unstyled',
				text: 'Some text',
				inlineStyleRanges: [
					{ offset: 0, length: 20, style: 'UNDERLINE' },
					{ offset: 5, length: 10, style: 'BOLD' },
				],
				entityRanges: [
					{ offset: 5, length: 10, key: 0 },
				]
			},
			{
				type: 'unstyled',
				text: 'Some text',
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
	},
	output: ['<p><u>Some </u><a href="https://playground.ru"><u><strong>text</strong></u></a></p><p><u>Some </u><a href="https://playground.ru"><u><strong>text</strong></u></a></p>'],
	renderMap: {
		blocks: {
			unstyled: (range) => range.reduce((result, { children }) => result + `<p>${children.join('')}</p>`, ''),
		},
		styles: {
			BOLD: (children) => `<strong>${children.join('')}</strong>`,
			UNDERLINE: (children) => `<u>${children.join('')}</u>`,
		},
		entities: {
			LINK: (children, entity) => `<a href="${entity.data.url}">${children.join('')}</a>`,
		}
	}
}