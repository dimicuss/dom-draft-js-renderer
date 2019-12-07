import partial from 'lodash/partial';


function handleRange(typesSet, range) {
	const { offset, length, style, key, decorator } = range;

	for (let j = offset; j < offset + length; j += 1) {
		const types = typesSet[j];
		
		if (types !== undefined) {
			key !== undefined && types.push(['entities', key].join(':'));
			style !== undefined && types.push(['styles', style].join(':'));
			decorator !== undefined && types.push(['decorators', decorator].join(':'));
		}
	}
	
	return typesSet;
}


function addRange (ranges, decorator, offset, length) {
  ranges.push({ offset, length, decorator });
}


function createDecoratorRanges(text, decorators = {}) {
  const ranges = [];

  for (let decorator in decorators) {
    const { strategy } = decorators[decorator];
    strategy(text, partial(addRange, ranges, decorator));
  }

  return ranges;
}


export default function createTypesSet({ entityRanges = [], inlineStyleRanges = [], text = '' }, { config }) {
  let typesSet = [];
  const decoratorRanges = createDecoratorRanges(text, config.decorators);

  for (let i = 0; i < text.length; i += 1) { typesSet[i] = [] }
  
	entityRanges.reduce(handleRange, typesSet);
	decoratorRanges.reduce(handleRange, typesSet);
	inlineStyleRanges.reduce(handleRange, typesSet);
	
	for (let i = 0; i < text.length; i += 1) { typesSet[i].push('simple') }
	
  return typesSet;
}
