function createAddRange(ranges, decorator) {
	return function addRange(offset, length) {
		ranges.push({ offset, length, decorator });
	}
}


export default function createDecoratorRanges(block, decorators = {}) {
	const ranges = [];
	
	for (let decorator in decorators) {
		decorators[decorator].strategy(block.text, createAddRange(ranges, decorator));
	}
	
	return ranges;
}