function setChild(fragment, child) {
  fragment.appendChild(child);
  return fragment;
}


export default function craeteDocumentFragment(children = []) {
  return children.reduce(setChild, document.createDocumentFragment());
}