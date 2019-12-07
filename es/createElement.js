function isArray(object) {
	return object.constructor === Array;
}


function isObject(object) {
	return object.constructor === Object;
}


function appendChild(element, child) {
	child && element.appendChild(child);
	return element;
}


function setAttribute(element, [key, value]) {
	element.setAttribute(key, value);
	return element;
}


export default function createElement(name, ...rest) {
  const children = rest.find(isArray) || [];
  const attributes = Object.entries(rest.find(isObject) || {});

  const element = document.createElement(name);

  attributes.reduce(setAttribute, element);
  children.reduce(appendChild, element);

  return element;
}
