export default function createChildren(typeRange, block, config) {
	const { text } = block;
  const { entityMap, renderMap } = config;
  const { type, ranges, start, end } = typeRange;
  const children = ranges.map(nextRange => createChildren(nextRange, block, config));
  const [rangeType, rangeKey] = type.split(':');

  switch(rangeType) {
	  case 'styles':
		  return renderMap[rangeType][rangeKey](children, config);
	  case 'entities':
		  const entity = entityMap[rangeKey];
		  return renderMap[rangeType][entity.type](children, entity, config);
	  case 'decorators':
		  return renderMap[rangeType][rangeKey].render(children, config, text.substring(start, end + 1));
	  default:
		  return text.substring(start, end + 1);
  }
}
