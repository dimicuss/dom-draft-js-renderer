function setToRange(ranges, { type, block }) {
	if (ranges[ranges.length - 1] === undefined) {
		ranges.push({ type, blocks: [] });
	}
	
	const previousRange = ranges[ranges.length - 1];
	
	if (previousRange.type === type) {
		previousRange.blocks.push(block);
	} else {
		previousRange.push({ type, blocks: [block] });
	}
	
	return ranges;
}


export default function wrapBlocks(blocks, { wrappers }) {
	return blocks.reduce(setToRange, []).map(() => {
	
	});
}
