<p align="center">
  <img src="https://raw.githubusercontent.com/nivaldomartinez/link-prevue/master/link-prevue.png" alt="Link Prevue" width="100">
</p>

## link-prevue

> A flexible component for generating a link preview

<p align="center">
  <img src="https://media.giphy.com/media/dZ5jwDmXARwBkFlRbV/giphy.gif" alt="Link Prevue">
</p>

## Intallation
```
npm install link-prevue
```

## Basic usage

> Javascript

```javascript
import LinkPrevue from 'link-prevue'
```
> HTML

```html
<div id="app">
  <LinkPrevue url="https://vuejs.org/"></LinkPrevue>
</div>
```

:+1:

## Custom card

To use a custom card, set your own html code between the aperture tag and the close tag of component. Using the scoped slot.

```html
<div id="app">
  <LinkPrevue url="https://vuejs.org/">
    <template v-slot="props">
      <div class="card" style="width: 20rem;">
        <img class="card-img-top" :src="props.img" :alt="props.title" />
        <div class="card-block">
          <h4 class="card-title">{{props.title}}</h4>
          <p class="card-text">{{props.description}}</p>
          <a v-bind:href="props.url" class="btn btn-primary">More</a>
        </div>
      </div>
    </template>
  </LinkPrevue>
</div>
```

## Custom loading indicator

To use a custom loading indicator, use the loading slot.

```html
<div id="app">
  <LinkPrevue url="https://vuejs.org/">
    <template v-slot:loading>
      <!-- set your custom loading -->
      <h1>Loading...</h1>
    </template>
  </LinkPrevue>
</div>
```

## Show button while loading

When loading data for multiple links takes time, you can show a button during the loading state that allows users to visit the link immediately. The button only requires the URL which is already provided as a component property.

```html
<div id="app">
  <LinkPrevue url="https://vuejs.org/" :showButtonWhileLoading="true"></LinkPrevue>
</div>
```

This is particularly useful when:
- Loading multiple link previews simultaneously
- Network requests are slow
- You want to provide users with immediate access to the link while preview data loads

## Custom button handler

For custom button handler use the onButtonClick property, like.

> HTML

```html
<div id="app">
  <LinkPrevue url="https://vuejs.org/" :onButtonClick="onClick"></LinkPrevue>
</div>

```

> Javascript

```javascript
import LinkPrevue from 'link-prevue'

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

 Prop                     | Type       | Required | Default Value                            | Description
------------------------- | ---------- | -------- | ---------------------------------------- | -----------
**url**                   | _String_   | yes      | _undefined_                              | Site url for generate link preview
**onButtonClick**         | _Function_ | no       | _undefined_                              | Function for a custom button handler, params => `prevue`
**cardWidth**             | _String_   | no       | _'400px'_                                | Card width, accept `px` and `%`
**showButton**            | _Boolean_  | no       | _true_                                   | Render card button
**showButtonWhileLoading** | _Boolean_  | no       | _false_                                  | Show a button during loading state that opens the URL. Useful when loading multiple links takes time.
**landscape**             | _Boolean_  | no       | _false_                                  | Enable landscape card layout (less height, more width). Automatically reverts to vertical on mobile screens (≤640px)
**apiUrl**                | _String_   | no       | _https://link-preview-api.nivaldo.workers.dev/preview_ | Custom API url, link-preview add a query param called ?url= [check this](https://github.com/nivaldomartinez/link-prevue-api-node)
**hideWhenEmpty**     | _Boolean_  | no       | _false_                                   | Hide card when image, title, and description are all null in the API response


## API REST

link-prevue uses an API REST for retrieve link data if you want to use your own API REST check [this](https://github.com/nivaldomartinez/link-prevue-api-node).
## License

This code is distributed under the terms and conditions of the [MIT license](https://opensource.org/licenses/MIT).

## compatibility
| version | vue |
|-|-|
| v2.x | v3.x |
| v1.x | v2.x |
