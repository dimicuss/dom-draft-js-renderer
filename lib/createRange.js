import isEqual from 'lodash/isEqual';


export default function createRange(typesSet = [], type = [], depth = 0, start = 0, end = typesSet.length - 1) {
  let ranges = [];
  let rangeStart = start;

  if (type.length === 0) {
    return { start, end, type, ranges }
  }

  for (let i = start + 1; i <= end; i += 1) {
    const currentType = typesSet[i][depth];
    const previousType = typesSet[i - 1][depth];

    if (!isEqual(previousType, currentType)) {
      ranges.push(createRange(typesSet, previousType , depth + 1, rangeStart, i - 1));
      rangeStart = i;
    }
  }

  if (rangeStart <= end) {
    ranges.push(createRange(typesSet, typesSet[rangeStart][depth], depth + 1, rangeStart, end));
  }

  return { start, end, type, ranges };
}
