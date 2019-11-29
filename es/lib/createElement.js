import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';


export default function createElement(name, ...rest) {
  const children = rest.find(isArray) || [];
  const attributes = rest.find(isPlainObject) || {}

  const element = document.createElement(name);

  for(let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  for(let i = 0; i < children.length; i += 1) {
    const child = children[i];
    child && element.appendChild(children[i]);
  }

  return element;
}
