# graphql-web-component-demo

This directory contains code that shows how to build components in TypeScript using [Lit](https://lit.dev/) and how to use those components with [GraphQL](https://graphql.org/).
Specifically, the code implements two Web Components: one that renders a given list of genes and one that implements a pagination widget.
The components are used in tandem in a demo to drive a GraphQL query and display its results.

The code in this directory started as a copy of the [LitElement TypeScript starter repository](https://github.com/lit/lit-element-starter-ts).
The original instructions for how to use the code are intact below.
Follow them to install the dependencies, build the code, and run the development server.

Once the development server is running, go to [http://localhost:8000/](http://localhost:8000/) in your Web browser.
Here you will find links to two demos.
Both demos require that the GraphQL server in the [`/server/apollo-server/`](https://github.com/legumeinfo/graphql-prototypes/tree/main/server/apollo-server) directory of this repository is running at [http://localhost:4000/](http://localhost:4000/).
Be sure to get that running before proceeding.

The first demo shows hows to make GraphQL queries using the native JavaScript [`fetch` function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
This demo doesn't draw anything to the screen, but the result of the query can be seen in the console of your Web browser.
To change the GraphQL query code, edit the `dev/graphql.html` file in this directory.
A new query can be built using the Apollo Explorer tool available via the Apollo server running at [http://localhost:4000/](http://localhost:4000/).
Simply copy the query you build using Apollo Explorer into the query variable in the `dev/graphql.html` file.
The development server should automatically refresh the demo and the new result will be displayed in your Web browser's console.

The second demo shows how the same GraphQL JavaScript `fetch` technique can be used with the Web Component code in this directory.
The components are defined in the `src/` directory inside this directory, and how to use the components with the previously described GraphQL technique is shown in the `dev/gene-list.html` file in this directory. 

# LitElement TypeScript starter

This project includes a sample component using LitElement with TypeScript.

This template is generated from the `lit-starter-ts` package in [the main Lit
repo](https://github.com/lit/lit). Issues and PRs for this template should be
filed in that repo.

## Setup

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Testing

This sample uses modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors) as well as against Lit's production mode:

```bash
npm test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
npm test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run your tests in Lit's production mode.

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Static Site

This project includes a simple website generated with the [eleventy](11ty.dev) static site generator and the templates and pages in `/docs-src`. The site is generated to `/docs` and intended to be checked in so that GitHub pages can serve the site [from `/docs` on the master branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To enable the site go to the GitHub settings and change the GitHub Pages &quot;Source&quot; setting to &quot;master branch /docs folder&quot;.</p>

To build the site, run:

```bash
npm run docs
```

To serve the site locally, run:

```bash
npm run docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
npm run docs:watch
```

The site will usually be served at http://localhost:8000.

## Bundling and minification

This starter project doesn't include any build-time optimizations like bundling or minification. We recommend publishing components as unoptimized JavaScript modules, and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

For information on building application projects that include LitElement components, see [Build for production](https://lit.dev/docs/tools/production/) on the Lit site.

## More information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.
