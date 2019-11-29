import get from 'lodash/get';

import createElement from './createElement';


function createSpan(children) {
  return createElement('span', children);
}


export default function createInlineBlock(range, text, common) {
  const { entityMap, config } = common;
  const { type: [rangeType, rangeKey], ranges, start, end } = range;
  const children = ranges.map(nextRange => createInlineBlock(nextRange, text, common));


  if (rangeType === undefined) {
    return document.createTextNode(text.substring(start, end + 1));
  }


  if (rangeType === 'styles') {
    return get(config, [rangeType, rangeKey], createSpan)(children, common);
  }


  if (rangeType === 'entities') {
    const entity = entityMap[rangeKey];
    const entityType = get(entity, ['type'], undefined);
    return get(config, [rangeType, entityType], createSpan)(children, entity, common);
  }


  if (rangeType === 'decorators') {
    return get(config, [rangeType, rangeKey, 'render'], createInlineBlock)(children, common, text.substring(start, end + 1));
  }
}
