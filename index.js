'use strict';
var HTML5Tokenizer = require('simple-html-tokenizer');
var objectAssign = require('object-assign');

/**
 * Init a new StyleInjector
 *
 * @returns {StyleInjector}
 * @constructor
 */

function StyleInjector(){

    if (!(this instanceof StyleInjector)){
        return new StyleInjector();
    }

    this.targetTags = [];
    this.targetStyles = {};
}

module.exports = StyleInjector;

/**
 * Inject the style object
 *
 * @param {Object} options
 * @returns {StyleInjector}
 * @api public
 */

StyleInjector.prototype.inject = function(options){

    this.targetStyles = objectAssign({}, options);
    this.targetTags = Object.keys(options);
    return this;
};

/**
 * Set the HTML string to inject into.
 *
 * @param string - the HTML string to inject styles into.
 * @returns {String}
 * @api public
 */

StyleInjector.prototype.into = function(string){

    if (typeof string !== 'string'){
        throw new TypeError('An HTML string must be supplied');
    }

    // return string if there aren't any options
    if (this.targetTags.length === 0){
        return string;
    }

    this.tokens = HTML5Tokenizer.tokenize(string);

    return this.rebuildHTMLFromTokens(this.tokens);

};

/**
 * rebuild the HTML string from an array of tokens.
 *
 * @param {Array} tokens
 * @returns {string}
 * @api private
 */

StyleInjector.prototype.rebuildHTMLFromTokens = function(tokens){

    var self = this;

    var s = '';

    tokens.map(function(item){

        var type = item.type;
        var selfClosing = item.selfClosing;
        var tagName = item.tagName;

        if (type === 'StartTag'){
            s += self.openTag(tagName, item.attributes, selfClosing);
        }

        if (type === 'Chars'){
            s += item.chars;
        }

        if (type === 'EndTag'){
            s += closeTag(tagName);
        }

    });

    return s;
};

/**
 * Generate the opening HTML tag (with attributes)
 *
 * @param tagName
 * @param {Array} attributes - the attributes associated with the opening tag
 * @param {Boolean} selfClosing - is this tag self closing?
 * @returns {string}
 * @api private
 */

StyleInjector.prototype.openTag = function(tagName, attributes, selfClosing){

    // Do we want to inject styles into this tag?
    var shouldInject = this.targetTags.indexOf(tagName) !== -1;

    var stylesToInject;

    if (shouldInject){
        stylesToInject = this.targetStyles[tagName];
    }

    var closing = selfClosing ? '/>' : '>';

    var attrString = buildAttributesString(attributes, stylesToInject);

    var spacer = attrString.length > 0 ? ' ' : '';

    return '<'+tagName+spacer+attrString+closing;

};

/**
 * Generate the attribute string from an array of attributes.
 *
 * @param {Array} attributes
 * @param {String} stylesToInject - the string of styles to inject into the attributes string
 * @returns {string}
 * @api private
 */

function buildAttributesString(attributes, stylesToInject){

    var s = '';

    var styleString = 'style="';

    var length = attributes.length - 1;

    attributes.map(function(item, index){

        // Check for an existing style attribute
        if (item[0] === 'style'){

            var style = item[1];
            var sep = style.charAt(style.length - 1) === ";" ? '' : ';';
            styleString += (style + sep);

            if (stylesToInject){
                styleString += stylesToInject;
            }

            styleString += '"';

        // Otherwise process all other tags normally
        } else {
            s += item[0];
            s += '="';
            s += item[1];
            s += '"';
            s += length !== index ? ' ' : '';
        }

    });

    // Do we still need to add styles?
    if (stylesToInject && styleString.length === 7){
        styleString += stylesToInject + '"';
    }

    // Collapse the style string if no styles
    if (styleString.length === 7){
        styleString = '';
    }

    // Formatting: check to see if we need to add a space before the style tag
    if (s.length > 0 && styleString.length > 7){
        s += ' ';
    }

    return s += styleString;
}

/**
 * Get the closing tag string.
 *
 * @param name
 * @returns {string}
 * @api private
 */

function closeTag(name){
    return '</'+name+'>';
}






