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
import { parseStoryTemplate } from 'storybook-vue-template';

import html from './index.html';


let stories = storiesOf('Molecule', module);

parseStoryTemplate(html, (key, template) => {
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
`parseStoryTemplate(html, callback)`  


### setup storybook config
Webpack in [Full Control Mode](https://storybook.js.org/configurations/custom-webpack-config#full-control-mode) were required.
Sample.

```js
// .storybook/webpack.config.js

module.exports = (storybookBaseConfig) => {
  config.module.rules.push(
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    },
    // if you'd like to use pug
    {
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader',
          options: { pretty: true }
        }
      ]
    }
  );

  return config;
}
```

```js
// .storybook/config.js
import Vue from 'vue';
import { configure } from '@storybook/vue';

import ButtonA from './button-a.vue';
import ButtonB from './button-b.vue';

Vue.component('button-a', ButtonA);
Vue.component('button-b', ButtonB);

function loadStories() {
  require('../src/stories/buttons');
}

configure(loadStories, module);
```

```js
// src/stories/buttons/index.js
import { storiesOf } from '@storybook/vue';
import { parseStoryTemplate } from 'storybook-vue-template';

import html from './index.html';


let stories = storiesOf('Molecule', module);

parseStoryTemplate(html, (key, template) => {
  stories.add(key, () => ({
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

