import createDecoratorRanges from './createDecoratorRanges';
import createTypesSet from './createTypesSet';
import createInlineFragments from './createInlineFragments';
import createRanges from './createRanges';



export default function draftRenderer(rawContentState, renderMap) {
  const { blocks, entityMap } = rawContentState;
  const config = { renderMap, entityMap };
  
  return blocks.reduce((fragment, block) => {
	  const decoratorRanges = createDecoratorRanges(block, renderMap.decorators);
	  const typesSet = createTypesSet(block, decoratorRanges);
	  const ranges = createRanges(typesSet);
	  return ranges.map((range => createInlineFragments(range, block, config)));
  }, []);
};
