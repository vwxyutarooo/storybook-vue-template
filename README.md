Writing [@storybook/vue](https://www.npmjs.com/package/@storybook/vue) in string, template literal or JSX were actually bit miserable. This helps to write stories like a vue template as below.

### I don't want to like this. 🙁
```js
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';


storiesOf('Organisms', module).add('UserCardList', () => ({
    template: `<organisms-user-card-list>
                <molecure-user-card name="aaa"></molecure-user-card>
                <molecure-user-card name="bbb"></molecure-user-card>
                <molecure-user-card name="ccc"></molecure-user-card>
              </organisms-user-card-list>`
}));
```

### This is bit better 😐
```js
import { storiesOf } from '@storybook/vue';
import storybookVueTemplate from 'storybook-vue-template';

import html from './index.html';


let stories = storiesOf('Molecule', module);

storybookVueTemplate(html, (key, template) => {
  stories.add(key, () => ({
    template
  }));
});
```

```html
<!-- stories/buttons/index.html -->
<template name="OrganismsUserCardList">
  <organisms-user-card-list>
    <molecure-user-card name="aaa"></molecure-user-card>
    <molecure-user-card name="bbb"></molecure-user-card>
    <molecure-user-card name="ccc"></molecure-user-card>
  </organisms-user-card-list>
</template>

<template name="OrganismSomeComponent">
  <my-button>Button text</my-button>>
</template>
```



## Useage
### Method
`storybookVueTemplate(html, callback)`  


### setup storybook config
Webpack in [Full Control Mode](https://storybook.js.org/configurations/custom-webpack-config#full-control-mode) were required.
Sample.

```js
// .storybook/webpack.config.js

module.exports = (storybookBaseConfig) => {
  config.module.rules.push(
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    // if you'd like to use pug
    {
      test: /\.pug$/,
      use: [
        { loader: 'html-loader' },
        { loader: 'pug-html-loader' }
      ]
    }
  );

  return config;
}
```

```js
// src/stories/buttons/index.js
import { storiesOf } from '@storybook/vue';
import storybookVueTemplate from 'storybook-vue-template';

import html from './index.html';
import * as components from 'place/to/component';


const stories = storiesOf('Molecule', module);

storybookVueTemplate(html, (key, template) => {
  stories.add(key, () => ({
    components,
    template
  }));
});
```

### Create stories
More than one line break is needed between templates.

```html
<!-- .../stories/buttons/index.html -->
<template name="ButtonA">
  <button-a>Button text</button-a>
</template>

<template name="Badge">
  <button-b
    v-for="index in [0, 1, 2]"
  >Button text. index = {{ index }}</button-b>
</template>
```

