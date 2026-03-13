# astro-stylex

Astro integration for [StyleX](https://stylexjs.com/) — **zero PostCSS / Babel
configuration required**.

Internally delegates to
[`@stylexjs/unplugin`](https://www.npmjs.com/package/@stylexjs/unplugin) (Vite
flavour), so `.astro`, `.tsx`, `.ts`, `.jsx`, and `.svelte` files that import
`@stylexjs/stylex` are compiled at build time with no extra tooling.

## Install

```bash
# peer dependencies
npm install @stylexjs/stylex @stylexjs/unplugin

# the integration itself
npm install astro-stylex
```

## Quick start

### 1. Register the integration

```js
// astro.config.mjs
import stylex from "astro-stylex";

export default defineConfig({
  integrations: [stylex()],
});
```

### 2. Add the dev-mode CSS link

Astro doesn't call Vite's `transformIndexHtml` hook, so the virtual CSS
file must be loaded explicitly during development:

```astro
---
// src/layouts/Layout.astro
import StyleXHead from "astro-stylex/StyleXHead.astro";
---

<html>
  <head>
    <StyleXHead />
  </head>
  <body>
    <slot />
  </body>
</html>
```

> In production the generated CSS is automatically bundled — the
> `<StyleXHead />` component renders nothing.

### 3. Use StyleX in your components

```astro
---
// src/components/Button.astro
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    color: "white",
    backgroundColor: {
      default: "blue",
      ":hover": "darkblue",
    },
  },
});

const rootProps = stylex.props(styles.root);
---

<button class:list={[rootProps.className]}>
  <slot />
</button>
```

> **Tip:** In `.astro` files use `class:list={[props.className]}` instead
> of spreading `{...stylex.props()}` to avoid duplicate `class` attributes
> with Astro scoped styles.

## Options

All options are forwarded to `@stylexjs/unplugin`. Common ones:

| Option                       | Type      | Default                                       | Description                        |
| ---------------------------- | --------- | --------------------------------------------- | ---------------------------------- |
| `useCSSLayers`               | `boolean` | `false`                                        | Wrap output CSS in `@layer` blocks |
| `unstable_moduleResolution`  | `object`  | `{ type: "commonJS", rootDir: process.cwd() }` | Module resolution strategy         |
| `importSources`              | `string[]`| `["stylex", "@stylexjs/stylex"]`               | Modules treated as StyleX          |
| `devMode`                    | `string`  | `"full"`                                       | `"full"`, `"css-only"`, or `"off"` |

See the [StyleX configuration docs](https://stylexjs.com/docs/api/configuration/)
for the full list.

## How it works

1. The integration registers a Vite plugin via `@stylexjs/unplugin`.
2. During transform, every JS/TS module that imports `@stylexjs/stylex` is
   compiled by the StyleX Babel plugin — styles are extracted as atomic CSS
   rules.
3. **Dev:** the collected CSS is served from `/virtual:stylex.css`
   (loaded by `<StyleXHead />`).
4. **Build:** the plugin's `generateBundle` hook injects the CSS into the
   final bundle automatically.

No PostCSS plugin. No standalone Babel config. Just Vite + unplugin. 🚀

## License

MIT
