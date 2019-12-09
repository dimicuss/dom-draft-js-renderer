import createTypesSet from './createTypesSet';
import createChildren from './createChildren';
import createTypeRanges from './createTypeRanges';
import createDecoratorRanges from './createDecoratorRanges';


export default function draftRenderer(rawContentState, renderMap) {
  const { blocks, entityMap } = rawContentState;
  const config = { renderMap, entityMap };
  
	
	let previousType = undefined;
	const blockRanges = [];
	
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const decoratorRanges = createDecoratorRanges(block, renderMap.decorators);
		const typesSet = createTypesSet(block, decoratorRanges);
		const typesRanges = createTypeRanges(typesSet);
		const children = typesRanges.map((typesRange => createChildren(typesRange, block, config)));
		
		const { type } = block;
		if (previousType !== type) {
			blockRanges.push({ type, range: [{ block, children }] });
		} else {
			blockRanges[blockRanges.length - 1].range.push({ block, children });
		}
		
		previousType = type;
	}
	
	return blockRanges.map(({ type, range }, i) => renderMap.blocks[type](range, i));
};
