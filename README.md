<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/editify">
    <img src="https://img.shields.io/npm/v/editify.svg?style=for-the-badge&labelColor=000000" alt="NPM version">
  </a>
  <a aria-label="NPM downloads" href="https://www.npmjs.com/package/editify">
    <img src="https://img.shields.io/npm/dt/editify.svg?style=for-the-badge&labelColor=000000" alt="NPM downloads">
  </a>
  <img src="https://img.shields.io/github/license/saltyshiomix/editify.svg?style=for-the-badge&labelColor=000000" alt="Package License (MIT)">
</p>

# Editify

A pure implementation of WYSIWYG HTML editor all we needed.

## Install

```shell
yarn add editify
```

## Usage (commonjs)

```html
<div id="editor">
  <p>This line is editable!</p>
</div>
```

```ts
import { Editify } from 'editify';

const editor = new Editify('editor');

editify.on('change', function(html, text) {
  console.log('change event: new html: ', html);
  console.log('change event: new text: ', text);
});

editify.on('selectionchange', function(selection) {
  console.log('selectionchange event: selected text: ', selection.toString());
});
```

## Usage (umd)

```html
<head>
  <script src="./editify.js"></script>
  <script>
    window.onload = function() {
      const editify = new Editify.Editify('editor');

      editify.on('change', function(html, text) {
        console.log('change event: new html: ', html);
        console.log('change event: new text: ', text);
      });

      editify.on('selectionchange', function(selection) {
        console.log('selectionchange event: selected text: ', selection.toString());
      });
    }
  </script>
</head>
<body>
  <div id="editor">
    <p>This line is editable!</p>
  </div>
</body>
```

## Usage (next.js)

```tsx
export default function EditifyPage() {
  const onChange = (html: string, text: string) => {
    console.log('change event: new html: ', html);
    console.log('change event: new text: ', text);
  };

  const onSelectionChange = (selection: Selection) => {
    console.log('selectionchange event: selected text: ', selection.toString());
  };

  React.useEffect(() => {
    // editify can be used only in client side
    const { Editify } = require("editify");

    const editor = new Editify("editor");

    editor.on("change", onChange);
    editor.on("selectionchange", onSelectionChange);

    return () => {
      editor.off("change", onChange);
      editor.off("selectionchange", onSelectionChange);
    };
  }, []);

  return (
    <div id="editor">
      <p>This line is editable!</p>
    </div>
  );
}
```

## Roadmaps

- [x] contenteditable
- [x] on `change` event
- [x] on `selectionchange` event
- [ ] toolbar (fixed)
  - [ ] inline: bold
    - [ ] toggle
  - [ ] inline: italic
    - [ ] toggle
  - [ ] inline: color
    - [ ] toggle
  - [ ] inline: link
    - [ ] insert
    - [ ] edit
    - [ ] remove
  - [ ] list
    - [ ] toggle
    - [ ] indent: tab
    - [ ] indent: shift+tab
  - [ ] image
    - [ ] insert
    - [ ] edit
    - [ ] remove
  - [ ] PDF
    - [ ] insert
    - [ ] edit
    - [ ] remove
  - [ ] table
    - [ ] insert
      - [ ] 2 * 2 cells
    - [ ] edit
      - [ ] cell
      - [ ] add row
      - [ ] add column
      - [ ] remove row
      - [ ] remove column
    - [ ] remove
    - [ ] cmd: tab
    - [ ] cmd: shift+tab
- [ ] toolbar (hovered)
- [ ] undo / redo
