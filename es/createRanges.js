export default function createRanges(typesSet = [], depth = 0, start = 0, end = typesSet.length - 1) {
	let ranges = [];
  let previousType = undefined;
	
  for (let i = start; i <= end; i++) {
  	const type = typesSet[i][depth];
  	
	  if (type !== undefined) {
		  if (previousType !== type) {
			  ranges.push({ type, start: i, end: i });
		  } else {
			  ranges[ranges.length - 1].end = i;
		  }
	  }
	  
	  previousType = type;
	}
  
  return ranges.map(({ type, start, end  }) => ({
	  type,
	  start,
	  end,
	  ranges: createRanges(typesSet, depth + 1, start, end),
  }));
}
