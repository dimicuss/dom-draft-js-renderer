function handleRange(typesSet, range) {
	const { offset, length, key, style, decorator } = range;

	for (let i = offset; i < offset + length; i++) {
		const types = typesSet[i];
		
		if (types !== undefined) {
			key !== undefined && types.push(['entities', key].join(':'));
			style !== undefined && types.push(['styles', style].join(':'));
			decorator !== undefined && types.push(['decorators', decorator].join(':'));
		}
	}
	
	return typesSet;
}


export default function createTypesSet({ entityRanges = [], inlineStyleRanges = [], text = '' }, decoratorRanges = []) {
  let typesSet = [];

  for (let i = 0; i < text.length; i += 1) { typesSet[i] = [] }
  
	entityRanges.reduce(handleRange, typesSet);
	decoratorRanges.reduce(handleRange, typesSet);
	inlineStyleRanges.reduce(handleRange, typesSet);
	
	for (let i = 0; i < text.length; i += 1) { typesSet[i].push('simple') }
	
  return typesSet;
}
