import times from 'lodash/times';

import createBlock from './lib/createBlock';
import createElement from './lib/createElement';
import createDocumentFragment from './lib/createDocumentFragment'


const brRegEx = /\n/g;



function handleHideClick({ target }) {
  target.classList.toggle('active');
  target.nextElementSibling.classList.toggle('hidden');
}


function renderBr() {
  return createElement('br');
}


function renderTr(rows, common) {
  return rows.map((row) => createElement('tr', row.map(block => createBlock(block, common))));
}


const config = {
  styles: {
    BOLD: children => createElement('strong', children),
    ITALIC: children => createElement('em', children),
    STRIKE: children => createElement('strike', children),
    UNDERLINE: children => createElement('u', children),
  },
  entities: {
    LINK: (children, entity) => {
      const a = createElement('a', { href: entity.data.url }, children);
      if (a.hostname.indexOf('playground.ru') === -1) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'nofollow');
      }
      return a;
    },
  },
  blocks: {
    image: (children, { data, text: alt }, { additionalData }) => {
      const { width, image } = data;
      const { contentWidth, imageDomain } = additionalData;
      return createElement('figure', [
        width > contentWidth
          ? createElement('a', { href: `https://${imageDomain}${image}` }, [
            createElement('img', { src: `https://${imageDomain}${image}?${contentWidth}-auto`, loading: 'lazy', alt })
          ])
          : createElement('img', { src: `https://${imageDomain}${image}`, loading: 'lazy', alt }),
        alt
          ? createElement('figcaption', [
            document.createTextNode(alt)
          ])
          : undefined
      ]);
    },
    hide: (children, { text = '' }) => {
      const head = createElement('div', { class: 'pg-hide-head' }, [
        document.createTextNode(text || 'Спойлер'),
      ]);

      head.addEventListener('click', handleHideClick);

      return createElement('pg-hide', [
        head,
        createElement('div', { class: 'pg-hide-body hidden' }),
      ]);
    },
    unstyled: children => createElement('p', children),
    blockquote: children => createElement('blockquote', children),
    'table-cell': (children, block) => createElement('td', children, block.data),
    'code-block': children => createElement('pre', children),
    'header-two': children => createElement('h2', children),
    'header-four': children => createElement('h4', children),
    'header-three': children => createElement('h3', children),
    'ordered-list-item': (children, { depth = 0 }) => createElement('ol', [
      createElement('li', children, { class: `list-depth-${depth}` }),
    ]),
    'unordered-list-item': (children, { depth = 0 }) => createElement('ul', [
      createElement('li', children, { class: `list-depth-${depth}` }),
    ]),
    embed: (children, { data: { id, ...otherProps } }) => createElement('pg-embed', { src: id, ...otherProps }),
    separator: () => createElement('hr'),
    table: (children, block, common) => {
      const { head = [], body = [], options = [] } = block.data;
      return createElement('table', { class: `table table-bordered table-striped ${options.join(' ')}` }, [
        createElement('thead', renderTr(head, common)),
        createElement('tbody', renderTr(body, common)),
      ]);
    },
  },
  decorators: {
    BR: {
      render: (children, common, text) => {
        return createDocumentFragment(times(text.length, renderBr))
      },
      strategy: (text, addRange) => {
        let match, offset;
        while ((match = brRegEx.exec(text)) !== null) {
          offset = match.index;
          addRange(offset, match[0].length);
        }
      },
    },
  },
  setBlocks: (children) => {
    const fragment = createDocumentFragment();

    for(let i = 0; i < children.length; i += 1) {
      const lastChild = fragment.lastChild;
      const child = children[i];
      const nextChild = children[i + 1];

      if (lastChild === null) {
        fragment.appendChild(child);
        continue;
      }

      if (lastChild.nodeName === 'UL' && child.nodeName === 'UL') {
        lastChild.appendChild(child.firstChild);
        continue;
      }

      if (lastChild.nodeName === 'OL' && child.nodeName === 'OL') {
        lastChild.appendChild(child.firstChild);
        continue;
      }

      fragment.appendChild(child);
    }

    const nextFragment = document.createDocumentFragment();
    const nextChildren = Array.from(fragment.childNodes);

    for(let i = 0; i < nextChildren.length; i += 1) {
      const lastChild = nextFragment.lastChild;
      const child = nextChildren[i];
      const nextChild = nextChildren[i + 1];

      if (lastChild === null) {
        nextFragment.appendChild(child);
        continue;
      }

      if (lastChild.nodeName === 'PG-HIDE' && child.nodeName !== 'PG-HIDE') {
        lastChild.querySelector('.pg-hide-body').appendChild(child);
        continue;
      }

      if (lastChild.nodeName === 'PG-HIDE' && child.nodeName === 'PG-HIDE') {
        nextChild && nextFragment.appendChild(nextChild);
        i += 1;
        continue;
      }

      nextFragment.appendChild(child);
    }

    return nextFragment;
  },
};


export default function createPost({ container, rawContentState }) {
  const { blocks, entityMap } = rawContentState;
  const { setBlocks } = config;

  const common = {
    config,
    entityMap,
  };

  const children = blocks.map(block => createBlock(block, common));

  container.appendChild(setBlocks(children));
};
