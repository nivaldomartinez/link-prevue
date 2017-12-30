## link-prevue

A flexible component for generate a link preview
[DEMO](https://link-prevue.herokuapp.com/).
[Demo repository](https://github.com/nivaldomartinez/link-prevue-demo).

## Intallation
```
npm install link-prevue
```

## Basic usage

 ### Javascript

 ```javascript
 import LinkPrevue from 'link-prevue'

new Vue({
	el: '#app',
    components: {
    	LinkPrevue
    }
})
```
 ### HTML
```html
<div id="app">
	<link-prevue url="https://vuejs.org/"></link-prevue>
</div>

```

:+1:

## Props API

link-prevue have two props for customize the component

 Prop                 | Type      | Required | Default Value  | description
--------------------- | --------- | -------- | -------------  | -----------
**url**               | _String_  | yes      | _undefined_    | site url for generate link preview


## License

This code is distributed under the terms and conditions of the [MIT license](https://opensource.org/licenses/MIT).
