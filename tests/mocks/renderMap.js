export default {
	blocks: {
		unstyled: (children) => `<p>${children.join('')}</p>`,
	},
	styles: {
		BOLD: (children) => `<strong>${children.join('')}</strong>`,
		UNDERLINE: (children) => `<u>${children.join('')}</u>`,
	},
	entities: {
		LINK: (children, entity) => `<a href="${entity.data.url}">${children.join('')}</a>`,
	}
}