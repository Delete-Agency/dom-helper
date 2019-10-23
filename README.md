# DOM Helper

Helps with common DOM tasks

[Live Demo](https://delete-agency.github.io/dom-helper/)

## Installation

Use the package manager [npm](https://docs.npmjs.com/about-npm/) for installation.

```
$ npm install @deleteagency/dom-helper
```

## Usage

```js
import {createFragment, createElement} from  '@deleteagency/dom-helper';

const fragment = createFragment('<li>option 1</li><li>option 2</li>');
const newElement = createElement('<a href="google.com">Go to Google</a>');
```

## API

### createFragment(htmlString)

Creates a new DocumentFragment based on the provided markup

#### htmlString

*Required*<br>
Type: `String`

### DOMHelper.createElement(htmlString)

 Creates a new Element based on the provided markup. <br>
 If markup contains more then 1 sibling elements, only first will be returned.<br>
 Returns `null` if markup contains zero valid elements.

#### htmlString

*Required*<br>
Type: `String`

### querySelectorParent(target, selector, includeSelf = false)

Searches element up the DOM tree that matches provided selector

#### target

*Required*<br>
Type: `Element`

#### selector

*Required*<br>
Type: `string`

#### includeSelf

*Optional*<br>
Type: `boolean`

### isElement(element)

Checks whether the passed value is an Element

#### element

*Required*<br>
Type: `Object`

### createEvent(name)

Creates new Event ready for dispatching

#### name

*Required*<br>
Type: `String`

## License
[MIT](https://choosealicense.com/licenses/mit/)