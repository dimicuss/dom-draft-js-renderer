import createRanges from './createRanges';
import createTypesSet from './createTypesSet';
import createInlineBlock from './createInlineBlock';
import createDecoratorRanges from './createDecoratorRanges';


export default function createBlock(block, common) {
	const decoratorRanges = createDecoratorRanges(block.text, common.config.decorators);
  const ranges = createRanges(createTypesSet(block, decoratorRanges));
  const { type = 'unstyled' } = block;
  const children = ranges.map(range => createInlineBlock(range, block.text, common));
  return common.config.blocks[type](children, block, common);
}
