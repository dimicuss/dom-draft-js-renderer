import partial from 'lodash/partial';


function handleRanges(typesSet, ranges) {
  for (let i = 0; i < ranges.length; i += 1) {
    const { offset, length, style, key, decorator } = ranges[i];

    for (let j = offset; j < offset + length; j += 1) {
    	const types = typesSet[j];

	    if (types !== undefined) {
		    key !== undefined && types.push(['entities', key]);
	      style !== undefined && types.push(['styles', style]);
	      decorator !== undefined && types.push(['decorators', decorator]);
      }
    }
  }
}


function addRange (ranges, name, offset, length) {
  ranges.push({ offset, length, decorator: name });
}


function createDecoratorRanges(text, symbols) {
  const ranges = [];

  for (let name in symbols) {
    const { strategy } = symbols[name];
    strategy(text, partial(addRange, ranges, name));
  }

  return ranges;
}


export default function createTypesSet({ entityRanges = [], inlineStyleRanges = [], text = '' }, { config }) {
  let typesSet = [];

  for (let i = 0; i < text.length; i += 1) { typesSet[i] = [] }

  handleRanges(typesSet, entityRanges);
  handleRanges(typesSet, createDecoratorRanges(text, config.decorators));
  handleRanges(typesSet, inlineStyleRanges);

  return typesSet;
}
