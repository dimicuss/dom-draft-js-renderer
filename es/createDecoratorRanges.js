function createAddRange(ranges, decorator) {
	return function addRange(offset, length) {
		ranges.push({ offset, length, decorator });
	}
}


export default function createDecoratorRanges(text, decorators = {}) {
	const ranges = [];
	
	for (let decorator in decorators) {
		const { strategy } = decorators[decorator];
		strategy(text, createAddRange(ranges, decorator));
	}
	
	return ranges;
}