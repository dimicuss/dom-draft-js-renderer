import createRange from './createRange';
import createTypesSet from './createTypesSet';
import createInlineBlock from './createInlineBlock';


export default function createBlock(block, common) {
  const { ranges } = createRange(createTypesSet(block, common), ['passer']);
  const { type = 'unstyled' } = block;
  const children = ranges.map(range => createInlineBlock(range, block.text, common));
  return common.config.blocks[type](children, block, common);
}
