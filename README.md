# inject-tag-style [![Build Status](https://travis-ci.org/radiovisual/inject-tag-style.svg?branch=master)](https://travis-ci.org/radiovisual/inject-tag-style)

> Inject styles into the tags of an HTML string.

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

## API

### StyleInjector().inject(styles, [options]).into(string)

### .inject(styles, options);

- Sets the inject targets and styles

#### styles
- Type: `object`
- Object keys are the HTML tags you want to target, and the values are the styles you want to inject.
- Example: `{ span: 'color:#fff;' }`
- required
    
#### options
- Type: `object`
- Sets the inject options:

    - **overwrite**
    - Type: `Boolean`
    - A setting of `true` will overwrite any existing styles on the target
    - Example: `.inject({li:'color:red'}, {overwrite:true}).into('<ul><li></li></ul>')`
    - Default: `false`

### .into(string)

- Sets the HTML string you want to inject styles into.
    - Parameter Type: `string`
    - Example: `.into('<span></span>')`
    - required


## API Notes

- Simply supply the `inject()` method with an object where the object keys are the tags you want to target, and the values are the styles you want to inject into those targets. 

For example, to inject the style `background-color:#000` into all of the `<li>` tags in your string:

```js
var StyleInjector = require('inject-tag-style');

var styles = {li:'background-color:#000'};
var ulString = '<ul><li>FOO</li<li>BAR</li></ul>';

var injectedString = StyleInjector().inject(styles).into(ulString);
//=> <ul><li style='background-color:#000'>FOO</li<li style='background-color:#000'>BAR</li></ul>
```

- You will want to write your styles out exactly how you want them to appear in the style tag. 

## General Notes

- This module does not validate or modify your CSS styles for you.
- If your HTML string has an existing style attribute, then the styles you supply will be appended to the existing styles, unless you supply `overwrite:true` to the [inject options](https://github.com/radiovisual/inject-tag-style#options).  



## License

MIT @ [Michael Wuergler](http://numetriclabs.com)

