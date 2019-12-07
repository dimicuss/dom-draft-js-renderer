import createBlock from './createBlock';



export default function createPost(rawContentState, config) {
  const { blocks, entityMap } = rawContentState;

  return blocks.reduce((fragment, block) => {
    fragment.appendChild(createBlock(block, { config, entityMap }));
    return fragment;
  }, document.createDocumentFragment());
};
