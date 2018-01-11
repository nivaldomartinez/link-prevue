## link-prevue

> A flexible component for generate a link preview

[Live Demo](https://link-prevue.herokuapp.com/).

[Demo repository](https://github.com/nivaldomartinez/link-prevue-demo).

## Intallation
```
npm install link-prevue
```

## Basic usage

> Javascript

```javascript
import LinkPrevue from 'link-prevue'

new Vue({
	el: '#app',
    components: {
    	LinkPrevue
    }
})
```
> HTML

```html
<div id="app">
	<link-prevue url="https://vuejs.org/"></link-prevue>
</div>
```

:+1:

## Custom card

To use a custom card, set your own html code between the aperture tag and the close tag of component. Using the scoped slot.

```html
<div id="app">
	<link-prevue url="https://vuejs.org/" slot-scope="props">
    <template slot-scope="props">
      <div class="card" style="width: 20rem;">
            <img class="card-img-top" :src="props.image" :alt="props.title">
            <div class="card-block">
                <h4 class="card-title">{{props.title}}</h4>
                <p class="card-text">{{props.description}}</p>
                <a v-bind:href="props.url" class="btn btn-primary">More</a>
            </div>
        </div>
    </template>
  </link-prevue>
</div>
```
## Custom button handler

For custom button handler use the onButtonClick property, like.

> HTML

```html
<div id="app">
	<link-prevue url="https://vuejs.org/" :onButtonClick="onClick"></link-prevue>
</div>

```

> Javascript

```javascript
import LinkPrevue from '../src/index.js'

export default {
  components:{
    LinkPrevue
  },
  methods: {
    onClick(prevue) {
      console.log('click', prevue.images, prevue.title, prevue.url, prevue.description)
    }
  }
}
```

## Props API

link-prevue have the following props for customize the component

 Prop                 | Type       | Required | Default Value  | Description
--------------------- | ---------- | -------- | -------------  | -----------
**url**               | _String_   | yes      | _undefined_    | Site url for generate link preview
**onButtonClick**     | _Function_ | no       | _undefined_    | Function for a custom button handler, params => `prevue`
**cardWidth**         | _String_   | no       | _'400px'_      | Card width
**showButton**        | _String_   | no       | _true_         | Render card button


## API REST

link-prevue use an API REST for retrieve link data if you want to use your own API REST check [this](https://github.com/nivaldomartinez/link-preview-api).
## License

This code is distributed under the terms and conditions of the [MIT license](https://opensource.org/licenses/MIT).
