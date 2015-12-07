# inject-tag-style [![Build Status](https://travis-ci.org/radiovisual/inject-tag-style.svg)](https://travis-ci.org/radiovisual/inject-tag-style)

> Inject inline styles into the tags of an HTML string.

## Installation

```
$ npm install --save inject-tag-style
```

## Usage

```js
var StyleInjector = require('inject-tag-style');

var styles = { table:'width:100%', td:'width:50%'};
var HTMLString = '<table><tr><td>ONE</td><td>TWO</td></tr></table>';

var injectedString = StyleInjector().inject(styles).into(HTMLString);
console.log(injectedString);
```

**Output:** *(formatting added for readability)*:
```html 
 <table style="width:100%">
   <tr>
     <td style="width:50%">ONE</td>
     <td style="width:50%">TWO</td>
   </tr>
 </table>
```


## License

MIT @ [Michael Wuergler](http://numetriclabs.com)

