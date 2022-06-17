---
layout: page.11ty.cjs
title: <gene-list-element> ⌲ Home
---

# &lt;gene-list-element>

`<gene-list-element>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<gene-list-element>` is just an HTML element. You can it anywhere you can use HTML!

```html
<gene-list-element></gene-list-element>
```

  </div>
  <div>

<gene-list-element></gene-list-element>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<gene-list-element>` can be configured with attributed in plain HTML.

```html
<gene-list-element name="HTML"></gene-list-element>
```

  </div>
  <div>

<gene-list-element name="HTML"></gene-list-element>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<gene-list-element>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;gene-list-element&gt;</h2>
    <gene-list-element .name=${name}></gene-list-element>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;gene-list-element&gt;</h2>
<gene-list-element name="lit-html"></gene-list-element>

  </div>
</section>
