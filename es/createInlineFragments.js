export default function createInlineFragments(range, block, config) {
	const { text } = block;
  const { entityMap, renderMap } = config;
  const { type, ranges, start, end } = range;
  const children = ranges.map(nextRange => createInlineFragments(nextRange, block, config));
  const [rangeType, rangeKey] = type.split(':');

  
  if (rangeType === 'styles') {
    return renderMap[rangeType][rangeKey](children, config);
  }


  if (rangeType === 'entities') {
    const entity = entityMap[rangeKey];
    return renderMap[rangeType][entity.type](children, entity, config);
  }


  if (rangeType === 'decorators') {
    return renderMap[rangeType][rangeKey].render(children, config, text.substring(start, end + 1));
  }
  
  return text.substring(start, end + 1);
}
