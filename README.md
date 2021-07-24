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
    }
  </script>
</head>
<body>
  <div id="editor">
    <p>This line is editable!</p>
  </div>
</body>
```
